import { Request, Response } from 'express'
import database from '../database/connection'

const connectionsController = {
  Store: async(request: Request, response: Response) => {
    const { user_id } = request.body
  
    try {
      await database('connections').insert({
        user_id,
      })

      return response.status(201).send()
    }catch(err) {

      return response.status(400).json({
        err
      })
    }
  },

  Index: async(request: Request, response: Response) => {
    const totalConnections = await database('connections').count('* as total')

    const { total } = totalConnections[0]

    try{

      return response.json({ total })
    }catch(err) {

      return response.status(400).json({ err })
    }
  }
}

export default connectionsController
