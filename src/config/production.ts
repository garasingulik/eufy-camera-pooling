import { Config } from './index'

const config: Config = {
  port: 80,
  secret: process.env.API_SECRET || '',
  cameraStream: process.env.CAMERA_STREAM || '',
  streamHost: process.env.STREAM_HOST || '',
  ffprobe: process.env.FFPROBE_PATH || '/usr/bin/ffprobe'
}

export default config
