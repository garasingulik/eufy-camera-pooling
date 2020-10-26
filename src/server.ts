import * as bodyParser from 'body-parser'
import * as express from 'express'

import config from './config'
import * as Routes from './routes'

import * as pool from './lib/pool'

const app = express()

// tslint:disable-next-line: deprecation
app.use(bodyParser.json())

const start = async () => {
  // Register all the routes here
  Routes.DefaultRoutes.register(app)

  console.log('Pooling the camera stream started ...')
  pool.waitAndNotify()

  app.listen(config.port, () => {
    console.debug(`Listening on port: http://localhost:${config.port}`)
  })
}

// tslint:disable-next-line
start()
