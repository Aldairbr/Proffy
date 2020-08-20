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
    
    const trx = await database.transaction()
      
   try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    }).returning('id')

    const user_id = insertedUsersIds[0]
    
    const insertedClassesIds = await trx('classes').insert({
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

    await trx('class_schedule').insert(class_schedule)

    await trx.commit()
    return response.status(201).send()

   } catch (error) {
     await trx.rollback()

     return response.status(401).json({
       message: "Unspected error while creating new class!"
    })
   }
  },

  Index: async(request: Request, response: Response) => {
   
    const filters = request.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!week_day || !subject || !time){
      return response.status(400).json({
        message: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time)
    
    const classes = await database('classes')
      .whereExists(function(){
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
          .whereRaw('class_schedule.from <= ??', [timeInMinutes])
          .whereRaw('class_schedule.to > ??', [timeInMinutes])
      })
      .where({ subject })
      .join('users', 'classes.user_id', '=', 'users.id')
      .select('classes.*', 'users.*')
    return response.json(await classes)
  },
}

export default classesController