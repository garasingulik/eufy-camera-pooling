# Eufy Camera Pooling

This service will do long pooling and check if the RTSP stream from Eufy Security camera is ready. The service accept `STREAM_HOST` environment variable and will push the payload `{ "url": "active-stream-url" }` to the endpoint sets on that variable. For example, if we want to notify [rtxp-to-hls](https://github.com/garasingulik/rtxp-to-hls) service, set the variable value to:

```
 STREAM_HOST=http(s)://rxtp-to-hls/stream/convert
```

# Running in Development

Clone this repository and run:

```
npm install
```

Before we run the project, create one `.env` file in the root of the project and configure this value:

```
CAMERA_STREAM=<camera rtsp stream>
STREAM_HOST=<callback url (optional)>
FFPROBE_PATH=</usr/bin/ffprobe (optional)>
```

To run this project in the development:

```
npm run dev
```

The development server will run at http://localhost:3007

