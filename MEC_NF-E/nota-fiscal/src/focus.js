const onlyDigits = (v) => String(v || '').replace(/\D/g, '')
const clean = (o) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== '' && v !== undefined && v !== null))

function dataEmissao() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const off = -d.getTimezoneOffset()
  const sinal = off >= 0 ? '+' : '-'
  const o = `${sinal}${p(Math.floor(Math.abs(off) / 60))}${p(Math.abs(off) % 60)}`
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${o}`
}

const num = (v) => (v === '' ? undefined : Number(String(v).replace(',', '.')))

export function montarPayload(f) {
  const doc = onlyDigits(f.tomadorDoc)
  const veiculo = [
    f.placa && `Placa: ${f.placa.toUpperCase()}`,
    f.modelo && `Veículo: ${f.modelo}`,
    f.km && `KM: ${f.km}`,
  ].filter(Boolean).join(' | ')

  return {
    data_emissao: dataEmissao(),
    natureza_operacao: Number(f.naturezaOperacao),
    optante_simples_nacional: f.optanteSimples,
    ...(f.regimeEspecial ? { regime_especial_tributacao: Number(f.regimeEspecial) } : {}),
    prestador: {
      cnpj: onlyDigits(f.prestadorCnpj),
      inscricao_municipal: f.prestadorIM,
      codigo_municipio: Number(f.prestadorMunicipio),
    },
    tomador: clean({
      [f.tomadorTipo === 'cpf' ? 'cpf' : 'cnpj']: doc,
      razao_social: f.tomadorNome,
      email: f.tomadorEmail,
      telefone: onlyDigits(f.tomadorTel),
      endereco: clean({
        logradouro: f.logradouro,
        numero: f.numero,
        complemento: f.complemento,
        bairro: f.bairro,
        codigo_municipio: num(f.tomadorMunicipio),
        uf: f.uf.toUpperCase(),
        cep: onlyDigits(f.cep),
      }),
    }),
    servico: clean({
      discriminacao: [f.discriminacao, veiculo].filter(Boolean).join('\n'),
      valor_servicos: num(f.valor),
      aliquota: num(f.aliquota),
      item_lista_servico: f.itemLista,
      codigo_tributario_municipio: f.codigoTributario,
      codigo_cnae: onlyDigits(f.cnae),
      codigo_tributacao_nacional_iss: f.codigoNacional,
      iss_retido: f.issRetido,
    }),
  }
}

const mensagemErro = (j, status) => {
  if (j?.erros?.length) return j.erros.map((e) => e.mensagem || e.codigo).join('\n')
  return j?.mensagem || `Erro ${status} ao falar com a Focus NFe.`
}

export async function emitirNfse(payload) {
  const ref = `nf-${Date.now()}`
  const r = await fetch(`/focus/v2/nfse?ref=${ref}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(mensagemErro(j, r.status))
  return ref
}

// A prefeitura responde de forma assíncrona: consulta até a nota sair do status "processando".
export async function aguardarNfse(ref, tentativas = 40) {
  for (let i = 0; i < tentativas; i++) {
    await new Promise((res) => setTimeout(res, 3000))
    const r = await fetch(`/focus/v2/nfse/${ref}`)
    const j = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(mensagemErro(j, r.status))
    if (j.status !== 'processando_autorizacao') {
      if (j.status !== 'autorizado') throw new Error(mensagemErro(j, r.status))
      return j
    }
  }
  throw new Error('A prefeitura ainda está processando. Tente consultar de novo em instantes.')
}
