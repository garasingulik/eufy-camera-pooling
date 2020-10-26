import { Config } from './index'

const config: Config = {
  port: 80,
  secret: process.env.API_SECRET || '',
  stream: process.env.CAMERA_STREAM || '',
  ffprobe:  process.env.FFPROBE_PATH || '/usr/bin/ffprobe'
}

export default config
