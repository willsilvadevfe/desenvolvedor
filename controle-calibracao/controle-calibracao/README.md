# Controle de Calibração

Aplicação web para lançamento de dados de calibração de instrumentos em
estoque. Os lançamentos ficam em memória durante a sessão; ao clicar em
**"Finalizar relatório"**, o sistema gera um CSV e envia por e-mail via
EmailJS. Nada é salvo em banco de dados ou LocalStorage.

## 1. Rodando localmente

```bash
npm install
cp .env.example .env
# edite o .env com suas credenciais do EmailJS (passo 2)
npm run dev
```

Abra o endereço que o terminal mostrar (normalmente `http://localhost:5173`).

## 2. Configurando o EmailJS

1. Crie uma conta em https://www.emailjs.com/.
2. Em **Email Services**, conecte seu provedor de e-mail (Gmail, Outlook
   etc). Anote o **Service ID**.
3. Em **Email Templates**, crie um novo template com os campos abaixo
   (podem ser usados livremente no assunto e no corpo do e-mail):
   - `{{data_relatorio}}`
   - `{{horario_relatorio}}`
   - `{{total_instrumentos}}`
   - `{{total_validos}}`
   - `{{total_alerta}}`
   - `{{total_vencidos}}`
   - `{{nome_arquivo}}`

   Sugestão de assunto: `Relatório de Calibração - {{data_relatorio}}`

   Sugestão de corpo:
   ```
   Relatório de calibração

   Data: {{data_relatorio}}
   Horário: {{horario_relatorio}}

   Total de instrumentos: {{total_instrumentos}}
   Válidos: {{total_validos}}
   Próximos do vencimento: {{total_alerta}}
   Vencidos: {{total_vencidos}}

   O arquivo CSV contendo os lançamentos está anexado.
   ```
4. **Anexo do CSV**: na aba de configuração do template, adicione um
   campo do tipo **Attachment** com o nome `anexo_csv`. É esse nome que
   o código usa para enviar o arquivo (veja `src/services/emailService.js`).
   > Anexos dinâmicos por código têm limite de tamanho conforme o plano
   > da sua conta EmailJS (no plano gratuito, arquivos pequenos como um
   > CSV de lançamentos do dia normalmente cabem sem problema). Se sua
   > conta não tiver esse recurso disponível, o relatório ainda pode ser
   > enviado sem o anexo — bastando remover o campo `anexo_csv` do
   > template — já que o download manual do CSV continua funcionando
   > normalmente pelo botão "Baixar CSV".
5. Anote o **Template ID**.
6. Em **Account > General**, copie sua **Public Key**.
7. O destinatário do e-mail é configurado dentro do próprio template
   (campo "To Email"), não no código — assim ele pode ser trocado sem
   precisar mexer na aplicação.

Preencha o `.env`:

```
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

## 3. Testando o fluxo completo localmente

1. Rode `npm run dev` com o `.env` preenchido.
2. Preencha o formulário e clique em **Lançar instrumento** algumas
   vezes (teste também deixar um campo vazio, para ver a validação).
3. Cadastre um item com vencimento no passado (para ver o selo
   🔴 Vencido) e outro com vencimento nos próximos 30 dias (🟡).
4. Clique em **Finalizar relatório**, confira o resumo e confirme.
5. Verifique se o e-mail chegou com o CSV anexado, e se o CSV abre
   corretamente no Excel (acentos legíveis).
6. Teste também o botão **Baixar CSV** para conferir o download local.
7. Para testar o tratamento de erro, coloque um Template ID errado no
   `.env` temporariamente e confirme que aparece a tela de erro com as
   opções de baixar o CSV ou tentar novamente.

## 4. Deploy na Vercel

1. Suba o projeto para o GitHub (veja seção 6 abaixo).
2. Em https://vercel.com, clique em **Add New > Project** e importe o
   repositório.
3. A Vercel detecta automaticamente que é um projeto Vite — não é
   necessário mudar build command (`npm run build`) nem output
   directory (`dist`).
4. Em **Settings > Environment Variables**, adicione as três variáveis:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Clique em **Deploy**. A cada novo push no repositório, a Vercel gera
   um novo deploy automaticamente.

(O processo na Netlify é equivalente: build command `npm run build`,
publish directory `dist`, e as mesmas variáveis em **Site settings >
Environment variables**.)

## 5. Estrutura do projeto

```
src/
├── components/       Telas e pedaços de interface (React)
├── services/         Geração de CSV e envio de e-mail
├── utils/            Validação, formatação de datas e status
├── data/             Opções dos selects, centralizadas
├── App.jsx           Componente principal — guarda os lançamentos
├── main.jsx          Ponto de entrada da aplicação
└── index.css         Estilos globais (cores, botões, alertas)
```

## 6. Git

```bash
git init
git add .
git commit -m "Sistema de controle de calibração"
git branch -M main
git remote add origin <url-do-seu-repositorio>
git push -u origin main
```

O `.env` nunca é enviado ao GitHub (está no `.gitignore`). Apenas o
`.env.example`, sem valores reais, fica versionado.

## 7. Regra importante do sistema

O e-mail **não** é enviado a cada lançamento. Os registros ficam
acumulados em memória (no estado do React) enquanto o usuário lança
quantos instrumentos quiser. O CSV só é gerado e enviado uma única vez,
quando o usuário clica em "Finalizar relatório".
