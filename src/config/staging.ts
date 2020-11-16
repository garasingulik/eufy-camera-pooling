import { Config } from './index'

const config: Config = {
  port: 80,
  secret: process.env.API_SECRET || '',
  camera: {
    id:  process.env.CAMERA_ID || '',
    streamUrl: process.env.CAMERA_STREAM || '',
  },
  apiHost: process.env.API_HOST || '',
  apiSecret: process.env.API_SECRET || '',
  streamHost: process.env.STREAM_HOST || '',
  ffprobe: process.env.FFPROBE_PATH || '/usr/bin/ffprobe'
}

export default config
