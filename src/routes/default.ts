import * as express from 'express'
import * as iotsReporters from 'io-ts-reporters'

import * as T from '../lib/types'
import { authenticationMiddleware } from './authorization'

import * as pool from '../lib/pool'

export const DefaultRoutes = {
  register: (app: express.Application) => {

    app.get('/ping', (req, res) => {
      res.sendStatus(200)
    })

    app.post('/hello', authenticationMiddleware, (req, res) => {
      const data = T.parseData<T.HelloRequestType>(req.body, T.HelloRequest)

      if (T.isParseError(data)) {
        return res.status(400).json({
          errors: iotsReporters.default.report(data)
        })
      }
      return res.json({ message: `Hello, ${data.name}!` })
    })

    app.get('/status', authenticationMiddleware, (req, res) => {
      return res.json({ active: pool.isStreamDetected() })
    })

    app.get('/reset', authenticationMiddleware, (req, res) => {
      pool.reset()
      return res.json({ message: 'OK' })
    })
  }
}
