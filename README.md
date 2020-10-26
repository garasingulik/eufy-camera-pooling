# Eufy Camera Pooling

This service will do long pooling and check if the RTSP stream from Eufy Security camera is ready. It was design to be use with [RTxP to HLS Realtime Stream Converter](https://github.com/garasingulik/rtxp-to-hls) so the stream will be triggered to convert when the stream from camera is up.

# Running in Development

Clone this repository and run:

```
npm install
```

Before we run the project, create one `.env` file in the root of the project and configure this value:

```
CAMERA_STREAM=<camera rtsp stream>
STREAM_HOST=<rtxp-to-hls stream converter url>
FFPROBE_PATH=<ffprobe path default = /usr/bin/ffprobe>
```

To run this project in the development:

```
npm run dev
```

The development server will run at http://localhost:3007

