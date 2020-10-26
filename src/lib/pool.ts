import config from '../config'
import * as T from './types'

import { getStreamInfo } from './ffprobe'

let streamDetected = true

export const waitAndNotify = async () => {
  const streamInfo = await T.wrapPromise(getStreamInfo(config.stream))

  if (T.isError(streamInfo) && streamDetected) {
    streamDetected = false
    console.log(`Camera stream is down ...`)
  }

  if (!T.isError(streamInfo) && !streamDetected) {
    streamDetected = true
    console.log(`Camera stream is up ...`)
    console.log(streamInfo)
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
