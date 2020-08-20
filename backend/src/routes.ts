import express from 'express'
import classesController from './controllers/classesController'

const routes = express.Router()

routes.post('/classes', classesController.Store)
routes.get('/classes', classesController.Index)

export default routes
