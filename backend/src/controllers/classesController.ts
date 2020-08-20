import { Request, Response } from 'express'
import database from '../database/connection'

import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}
const classesController = {
  Store: async(request: Request, response: Response) => {

    const { 
      name, 
      avatar,
      whatsapp,
      bio,
      subject, 
      cost,
      schedule, 
      } = request.body

    const insertedUsersIds = await database('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    }).returning('id')

    const user_id = insertedUsersIds[0]
    
    const insertedClassesIds = await database('classes').insert({
      subject, 
      cost,
      user_id,
    }).returning('id')

    const class_id = insertedClassesIds[0]
      
    const class_schedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to)
      }
    })

    await database('class_schedule').insert(class_schedule)

    return response.json({
      name, 
      avatar,
      whatsapp,
      bio,
      subject, 
      cost,
      schedule,
    })
  },

  Index: async(request: Request, response: Response) => {
    const index = await database('classes').select('*')

    return response.json(index)
  },
}

export default classesController