import express from 'express'

const app = express()


app.get('/users', (request, response) => {
  return response.json({message: 'Ta funfando'})
})
app.listen(3333)