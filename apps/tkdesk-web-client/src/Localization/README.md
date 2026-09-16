# Localizations

La cartella `Localization` raccoglie tutte le stringhe di testo che tipicamente vengono mostrate nell'interfaccia utente e dovrebbero cambiare al cambio di lingua.

Nella cartella `Lang` vi e' un file per ogni lingua e servono unicamente per unire tutti i messaggi dalle varie sorgenti e raccoglierli per lingua.

## Gerarchia Identificatori

Gli identificatori seguono una gerarchia che serve a specificare dove quella particolare stringa e' stata usata.

Questo perche' ogni stringa non e' unica solo per il suo significato letterale ma anche e sopratutto per il contesto in cui viene usata, gli identificatori dovrebbero infatti consentire facilmente di intuire dove questa stringa viene usata semplicemente leggendo la chiave.

Questo viene utile anche quando si va a tradurre le stringhe in altre lingue, dato che il contesto viene specificato nella chiave, la traduzione e' molto piu' semplice.

La gerarchia inizia con i seguenti livelli base

- `comp`

  Identifica le stringhe che vengono usate nei singoli componenti e sono a loro specifici, si ha sempre quindi dopo il tipo di componente e poi il nome.

- `ui`

  Identifica le stringhe che fanno parte di componenti fissi dell'interfaccia (bottoni, intestazioni generali, ecc), un esempio calzante e' la sidebar, o in genere ognuno dei moduli nella cartella `Modules`

- `data`

  Identifica il nome di un dato, nel senso dei dati fanno parte del model. Sono tipicamente le label che usiamo sopra i campi di input o sopra i campi in sola lettura

- `select`

  Identificano le traduzioni dei valori di un determianto campo, in genere accade per i valori di tipo enumeratore, quelli che compaiono nelle select di solito, quindi i campi che hanno un valore in un determinato insieme di stringhe.

Accanto alle piu' tipiche categorie ve ne sono altre due che servono a localizzare i messaggi di errore provenienti dai vari microservizi del sistema e dai servizi aws

- `specifici della piattaforma`
- `aws`

## Raggruppamento dei messaggi

Esistono due modi per raggruppare i messaggi, per lingua o per gruppo, in questo progetto vengono utilizzati entrabe le modalita' in base alle esigenze.

Nella cartella `Constants` ogni file raccoglie in messaggi in tutte le lingue di una determinata costante.

Nella cartella `Messages` ogni file raccoglie i messaggi in una specifica lingua.
La singola lingua viene spezzata in piu' file, e come si capisce dal nome, ogni file raccoglie una parte della gerarchia che viene spiegata nei capitoli precedenti.
