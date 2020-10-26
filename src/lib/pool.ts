import axios from 'axios'

import config from '../config'
import * as T from './types'

import { getStreamInfo } from './ffprobe'

let streamDetected = true

interface StreamUrl {
  url: string
}

export const waitAndNotify = async () => {
  const streamInfo = await T.wrapPromise(getStreamInfo(config.cameraStream))

  if (T.isError(streamInfo) && streamDetected) {
    streamDetected = false
    console.log('Camera stream is down ...')
  }

  if (!T.isError(streamInfo) && !streamDetected) {
    streamDetected = true
    console.log('Camera stream is up ...')

    const streamHost = `${config.streamHost}/stream/convert`
    console.log(`Reaching stream converter: ${streamHost} ...`)

    const data = { url: config.cameraStream }
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const streamUrl = await T.wrapAxios<StreamUrl>(axios.post(streamHost, data, options))

    if (T.isAxiosError(streamUrl)) {
      console.error('Stream host is not reachable ...', streamUrl)
    } else {
      console.log(`Converted Stream URL: ${streamUrl.data.url}`)
    }
  }

  setTimeout(async () => {
    await waitAndNotify()
  }, 1000)
}

export const isStreamDetected = () => {
  return streamDetected
}

export const reset = () => {
  streamDetected = false
}
