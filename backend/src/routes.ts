import express from 'express'
import classesController from './controllers/classesController'
import connetionsController from './controllers/connectionsController'

const routes = express.Router()


routes.post('/classes', classesController.Store)
routes.get('/classes', classesController.Index)

routes.post('/connections', connetionsController.Store)
routes.get('/connections', connetionsController.Index)



export default routes
