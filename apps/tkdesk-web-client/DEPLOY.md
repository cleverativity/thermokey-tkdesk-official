# Come fare un deploy del frontend

Il progetto è gestito con Amplify Console ([qui gli ambienti](https://eu-west-1.console.aws.amazon.com/amplify/home?region=eu-west-1#/d3vgcc8td2qxwl)).

Ci sono 3 env:

- dev
- staging
- production

Per rilasciare:

- con GitFlow, aprire una nuova release
- fare un bump della versione in `package.json`
- lanciare `npm install` per aggiornare la versione nel `package-lock.json`
- lanciare in locale i test e vedere che vadano tutti a buon fine
  - `npm run cy:ci`
- senza chiudere la release, fare il merge nel branch git che si vuole rilasciare e pusharlo:
  - `dev`: per test interni
  - `staging`: per test del cliente
  - `production`: per rilasciare in produzione

Le pipeline sono su Amplify Console, dove la cache è già invalidata, e vengono dettate dal file `amplify.yml`

Per `dev` e `staging` i test non sono previsti in pipeline.
