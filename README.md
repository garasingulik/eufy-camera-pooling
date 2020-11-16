# Eufy Camera Pooling

This service will do long pooling and check if the RTSP stream from Eufy Security camera is ready. The service accept `STREAM_HOST` environment variable and will push the payload `{ "url": "active-stream-url" }` to the endpoint sets on that variable. For example, if we want to notify [rtxp-to-hls](https://github.com/garasingulik/rtxp-to-hls) service, set the variable value to:

```
 STREAM_HOST=http(s)://rxtp-to-hls/stream/convert
```

Additional callback API also supported to notify camera up/down event with this payload:

```
const data = {
      cameraId: process.env.CAMERA_ID,
      streamUrl: process.env.CAMERA_STREAM,
      isStreamUp: boolean
    }
```

The API url can be set using environment variable:

```
 API_HOST=http(s)://api-url.com/callback
```

# Running in Development

Clone this repository and run:

```
npm install
```

Before we run the project, create one `.env` file in the root of the project and configure this value:

```
CAMERA_ID=<camera serial no or id>
CAMERA_STREAM=<camera rtsp stream>
API_HOST=<callback url (optional)>
API_SECRET=<api secret if applicable>
STREAM_HOST=<callback url (optional)>
FFPROBE_PATH=</usr/bin/ffprobe (optional)>
```

To run this project in the development:

```
npm run dev
```

The development server will run at http://localhost:3007

