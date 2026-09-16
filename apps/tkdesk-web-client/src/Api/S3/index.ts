import _ from 'lodash'
import { message } from 'antd'
import { call } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'

import * as Storage from 'aws-amplify/storage'

const log = new ConsoleLogger('Api/S3')

export async function put(file: File, filePath: string, fileName?: string) {
  log.info('put.start', {
    file,
    fileName,
    filePath,
  })

  const normalizedPath = filePath.replace(/^\/+|\/+$/g, '')
  const finalFileName = fileName ?? file.name

  const fullPath = normalizedPath
    ? `public/${normalizedPath}/${finalFileName}`
    : `public/${finalFileName}`

  const result = await Storage.uploadData({
    path: fullPath,
    data: file,
    options: {
      // accessLevel: 'guest',
      contentType: file.type || 'application/octet-stream',
    },
  }).result

  log.info('put.success', {
    originalName: file.name,
    storedPath: result.path,
  })

  return {
    ...result,
    path: result.path,
  }
}

export function* get(storage_url: string) {
  const file: { url: any; [key: string]: any } = yield call(Storage.getUrl, {
    key: storage_url,
    options: {
      accessLevel: 'guest',
      expiresIn: 60 * 30, // set expiretion of url to 30 minutes
    },
  })

  return file
}

export function* download(storage_url: string, language: string) {
  let fileUrlResult: { url: any; [key: string]: any } = yield call(
    get,
    storage_url,
  )

  log.info('fileUrl', fileUrlResult)

  try {
    if (_.isNil(fileUrlResult)) {
      if (language === 'it') {
        message.error('Impossibile effettuare il download. File non trovato')
      } else {
        message.error('Unable to download. File not found')
      }
    } else {
      if (Date.now() > fileUrlResult.expiresAt - 5000) {
        fileUrlResult = yield call(get, storage_url)
      }

      const link = document.createElement('a')
      link.href = fileUrlResult.url
      link.download = ''
      link.target = '_blank'
      link.click()
      if (language === 'it') {
        message.success('Download del Documento in corso...')
      } else {
        message.success('Document is being downloaded...')
      }
    }
  } catch {
    if (language === 'it') {
      message.error('Errore nel download del documento')
      throw new Error('Error in download')
    } else {
      message.error('Error while downloading the document')
      throw new Error('Error in download')
    }
  }
}
