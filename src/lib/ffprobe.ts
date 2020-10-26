import * as childProcess from 'child_process'

import config from '../config'
import * as T from './types'

const TEN_MEGA_BYTE = 1024 * 1024 * 10

export const getStreamInfo = (url: string): T.R<string> => {
  return new Promise((resolve, reject) => {
    const cmd = `${config.ffprobe} -v quiet -print_format json -show_format -show_streams "${url}"`
    childProcess.exec(cmd, { maxBuffer: TEN_MEGA_BYTE }, (error, stdout, stderr) => {
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
