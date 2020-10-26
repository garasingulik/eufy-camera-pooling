import * as childProcess from 'child_process'

import config from '../config'
import * as T from './types'

export const getStreamInfo = (url: string): T.R<string> => {
  return new Promise((resolve, reject) => {
    const cmd = `${config.ffprobe} -v quiet -print_format json -show_format -show_streams -rtsp_flags prefer_tcp "${url}"`
    childProcess.exec(cmd, {
      timeout: 5000
    }, (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }
      if (stderr) {
        console.log('STDERR: ', stderr)
      }
      return resolve(stdout)
    })
  })
}
