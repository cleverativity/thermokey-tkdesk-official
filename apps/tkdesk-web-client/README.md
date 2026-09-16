# README

## Development

Frontend dell'applicazione **TKCC**, sviluppato con **React** tramite [Vite](https://vite.dev/).

### Requisiti

Assicurati di avere installato [nvm](https://github.com/nvm-sh/nvm).

Con `nvm` installato installa la versione di node corretta (scritta nel file `.nvmrc`)

```bash
nvm install
```

o se già installata

```bash
nvm use
```

Installa l'[Amplify CLI](https://docs.amplify.aws/cli/)

```bash
npm install -g @aws-amplify/cli
```

Configurare l'utente `amplify-tkcc`

```bash
amplify configure
```

Esegui un pull del backend di `Amplify`

```bash
amplify pull --appId dvs84db70770z --envName dev
```

Installa le dipendenze del progetto

```bash
npm install --legacy-peer-deps
```

### Configura le variabli d'ambiente

Copia il file `.env.local` contenente le variabili d'ambiente

```bash
cp "~.env.local" ".env.local"
```

### Avvio del progetto

Per avviare l'app in modalità sviluppo:

```bash
npm run dev
```

L'applicazione sarà disponibile all'indirizzo: `http://localhost:3000`

## Test

### Unit test

Il progetto utilizza [Vitest](https://vitest.dev/) per gli unit test, per eseguirlli:

```bash
npm run test
```

### Test E2E

Il progetto utilizza [Cypress](https://www.cypress.io/) per i test end-to-end

Per eseguire i test in CI:

```bash
npm run cy:ci
```

Per aprire Cypress in ambiente development:

```bash
npm run cy:opendev
```
