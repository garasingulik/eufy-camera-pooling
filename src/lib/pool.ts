import axios from 'axios'

import config from '../config'
import * as T from './types'

import { getStreamInfo } from './ffprobe'

let streamDetected = true

interface StreamUrl {
  url: string
}

const notifyStream = async () => {
  if (config.streamHost && config.streamHost !== '') {
    console.log(`Pushing stream url: ${config.streamHost} ...`)

    const data = { url: config.camera.streamUrl }
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const streamUrl = await T.wrapAxios<StreamUrl>(axios.post(config.streamHost, data, options))
    if (T.isAxiosError(streamUrl)) {
      console.error('Stream host is not reachable ...', streamUrl)
    }
  }
}

const notifyApi = async (isStreamUp: boolean) => {
  if (config.apiHost && config.apiHost !== '') {
    console.log(`Contacting API: ${config.apiHost} ...`)

    const data = {
      cameraId: config.camera.id,
      streamUrl: config.camera.streamUrl,
      isStreamUp
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiSecret}`
      }
    }

    const status = await T.wrapAxios(axios.post(config.apiHost, data, options))
    if (T.isAxiosError(status)) {
      console.error('API host is not reachable ...', status)
    }
  }
}

export const waitAndNotify = async () => {
  const streamInfo = await T.wrapPromise(getStreamInfo(config.camera.streamUrl))

  if (T.isError(streamInfo) && streamDetected) {
    streamDetected = false
    console.log('Camera stream is down ...')
    await notifyApi(streamDetected)
  }

  if (!T.isError(streamInfo) && !streamDetected) {
    streamDetected = true
    console.log('Camera stream is up ...')

    await notifyApi(streamDetected)
    await notifyStream()
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
