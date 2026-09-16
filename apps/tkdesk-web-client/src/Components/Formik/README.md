# Formik

I vari componenti sono ri-esportati tutti nel file `index.ts`, così da avere un posto comune da dove importarli.

## FormikDependent.tsx

Renderizza componenti basandosi su ciò che è già presente nel form.

## FormikErrorAlert.tsx

Renderizza un banner con un errore quando è presente un componente nel form che presenta un errore.

## FormikForm.tsx

Wrapper per un form generico con collegamento tra `Antd` e `Formik`

## FormikInspect.tsx

// TODO

## FormikReset.tsx

// TODO

## FormikState.tsx

// TODO

## FormikField.tsx

Menzione speciale per FormikField. Serve al legare la libreria `Formik` e la libreria `Antd` automatizzanto tutti gli aspetti comuni tra i componenti di `Antd` che hanno bisogno di accedere al contesto di `>Formik`.

La libreria `Formik` rende disponibile il componente `Field`, che e'
incaricato di collegare un componente di input (come il componente `input` standard HTML o un componente piu' sofisticato come l'`Input` di Ant al Formik, o un'altro qualsiasi) al contesto di Formik in modo da poter gestire tutti gli eventi del componente di input in automatico.

La Libreria Antd invece fornisce un suo framework grafico di componenti, e uno per la gestione delle form. Essendo i componenti pensati per l'uso con il loro framework e' necessario un layer di integrazione tra Formik e i componenti di input di Antd.

Questo componente racchiude tutte le logiche comuni a tutti i possibili componenti di Antd usati dentro ad un formik, e fornisce una API di basso livello per personalizzare l'integrazione dei componenti di input di Antd con la libreria Formik.

In genere viene utilizzato per definire tutti i nuovi componenti `Field*` che poi verranno usati nelle interfacce, e' sconsigliato l'uso diretto di FormikField all'interno delle interfacce.
