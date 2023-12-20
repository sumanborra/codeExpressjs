const express = require('express')
const app = express()
const path = require('path')
const dbPath = path.join(__dirname, 'goodreads.db')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

let DB = null
const initilizationDatabase = async () => {
  try {
    DB = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(`Server Running at http://localhost:3000/bools/`)
    })
  } catch (e) {
    console.log(`server error${e.message}`)
    process.exit(1)
  }
}
initilizationDatabase()
app.get('/books/', async (request, response) => {
  const dbQuerry = `SELECT * FROM book ORDER BY book_id`
  const data = await DB.all(dbQuerry)
  response.send(data)
})
