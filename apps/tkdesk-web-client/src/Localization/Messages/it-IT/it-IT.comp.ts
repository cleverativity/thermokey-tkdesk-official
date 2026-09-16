export default {
  comp: {
    field: {
      fiscalCode: {
        errors: {
          invalid_size:
            'Lunghezza non valida, lunghezza attuale {current}, lunghezza attesa 16',
          invalid_format: 'Formato non valido',
          invalid_checksum: 'Codice di controllo non valido',
        },
      },
      numberRange: { min: 'Min', max: 'Max' },
      phoneNumber: { errors: { invalid_size: 'Lunghezza non valida' } },
      dropZone: {
        upload_description:
          'Seleziona o trascina qui i file nei seguenti formati:',
        errors: {
          invalidFileType: 'Sono consentiti solo file CSV o Excel',
        },
      },
    },
  },
}
