# Emissor de Nota Fiscal (mecânica)

Formulário em React que envia a NFS-e pela API da Focus NFe e baixa o PDF. Sem banco de dados.

## Como usar
1. `npm install`
2. Copie `.env.example` para `.env` e preencha o token e os dados da mecânica.
3. `npm start` (abre no navegador). Para desenvolvimento: `npm run dev`.

## Antes de emitir de verdade
- Crie conta na Focus NFe, cadastre a empresa (CNPJ, certificado, dados da prefeitura) e gere o token.
- Teste primeiro com `FOCUS_AMBIENTE=homologacao`. Troque para `producao` só depois.
- Alguns campos mudam por município (veja o guia da sua cidade em focusnfe.com.br/guides/nfse).
- Reinicie o `npm start` sempre que mudar o `.env`.
