# Configuração de Notificações por Email e WhatsApp

## Contexto

Quando o administrador marca uma pré-inscrição como "Apto", isso significa que os documentos do estudante foram aprovados e ele está apto para fazer o teste de admissão na escola.

Neste momento, o sistema envia automaticamente notificações por email e WhatsApp ao estudante.

## Email - EmailJS

1. Crie uma conta gratuita em: https://www.emailjs.com/
2. Configure um serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email
4. Obtenha as credenciais:
   - Service ID
   - Template ID
   - User ID (Public Key)

5. No arquivo `admin-dashboard-app.js`, substitua:
   - `YOUR_SERVICE_ID` pelo seu Service ID
   - `YOUR_TEMPLATE_ID` pelo seu Template ID
   - `YOUR_USER_ID` pelo seu User ID

## WhatsApp - Twilio

1. Crie uma conta em: https://www.twilio.com/
2. Configure o WhatsApp Business API
3. Obtenha as credenciais:
   - Account SID
   - Auth Token
   - WhatsApp número (ex: +14155238886)

4. No arquivo `admin-dashboard-app.js`, substitua:
   - `YOUR_ACCOUNT_SID` pelo seu Account SID
   - `YOUR_AUTH_TOKEN` pelo seu Auth Token
   - Ajuste o número do WhatsApp conforme necessário

## Alternativas

### Email
- SendGrid (https://sendgrid.com/)
- Mailgun (https://www.mailgun.com/)
- Amazon SES

### WhatsApp
- WhatsApp Business API oficial
- Vonage (Nexmo)
- MessageBird

## Teste

Depois de configurar, teste com seus próprios dados:
1. Preencha o formulário de matrícula
2. Entre no painel administrativo
3. Marque o estudante como "Apto"
4. Verifique se recebeu email e mensagem WhatsApp