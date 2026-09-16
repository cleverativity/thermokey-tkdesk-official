export default {
  comp: {
    field: {
      fiscalCode: {
        errors: {
          invalid_size:
            'Invalid length, actual length {current}, expected length 16',
          invalid_format: 'Invalid format',
          invalid_checksum: 'Invalid checksum',
        },
      },
      numberRange: { min: 'Min', max: 'Max' },
      phoneNumber: { errors: { invalid_size: 'Invalid length' } },
      dropZone: {
        upload_description:
          'Select or drop files here in the following formats:',
        errors: {
          invalidFileType: 'Only CSV or Excel files are allowed',
        },
      },
    },
  },
}
