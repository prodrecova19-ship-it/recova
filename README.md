# RECOVA — Site Pro v2

Site de catálogo de beats com visual minimalista/industrial.

## Você precisa instalar

Obrigatórios para o fluxo recomendado:
1. **Visual Studio Code**
2. **Node.js LTS**
3. **Git** (recomendado para versionar o projeto)

O GitHub Desktop é opcional.

## Rodar

Abra esta pasta no VS Code e, no terminal, execute:

```bash
npm install
npm test
npm run dev
```

Abra:

```text
http://localhost:3000
```

## Personalizar

### 1. Contato
Edite `js/config.js`.

### 2. Beats
Edite `data.json`.

### 3. Capas
Coloque suas imagens em `assets/covers/`.

### 4. Previews
Coloque os MP3 em `assets/audio/` e indique o caminho no `data.json`.

Exemplo:
```json
"audio": "assets/audio/night-shift.mp3"
```

## Fluxo comercial deste MVP

O usuário pode:
- descobrir e filtrar beats;
- abrir a página individual;
- ouvir preview, quando cadastrado;
- escolher lease ou exclusiva;
- adicionar ao carrinho;
- conversar com o produtor pelo WhatsApp.

O pagamento automático ainda não foi acoplado. Isso deixa a primeira versão simples e permite validar o catálogo antes de integrar checkout, banco de dados e painel administrativo.

## Próxima etapa técnica

Quando o catálogo começar a vender, a arquitetura pode evoluir para:
- PostgreSQL;
- painel administrativo;
- autenticação;
- upload de beats;
- geração de licenças;
- checkout;
- webhooks de pagamento;
- área do cliente;
- métricas.
