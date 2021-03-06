const mongoose = require('mongoose') 
const supertest = require('supertest')
const app = require('../server/app')
const Activity = require("../server/models/activities")
const User = require("../server/models/users")

const api = supertest(app)

/*
Before running, comment out app.listen in server.js...
need to refactor server so we can better test backend
*/

const initialActivities = [
    {
        "activity": "Learn Express.js",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 0,
        "completed": false
    },
    {
        "activity": "Bake something you've never tried before",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 1,
        "completed": false
    },
    {
        "activity": "Learn how to play a new sport",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 2,
        "completed": false
    },
    {
        "activity": "Text a friend you haven't talked to in a long time",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 3,
        "completed": false
    },
    {
        "activity": "Meditate for five minutes",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test1",
        "id": 4,
        "completed": false
    },
    {
        "activity": "Learn to play a new instrument",
        "accessibility": 0.1,
        "type": "social",
        "participants": 1,
        "price": 0.0,
        "username": "test2",
        "id": 5,
        "completed": false
    }
  ]

  const initialUsers = [
      {
          "username": "test1",
          "password": "$2b$10$RI3bb8TpIrc0DuUFNiVPd.zxY./GMBPDL83IcZQ62v9dEYkWMvB0S",
          "score": 0
      },
      {
        "username": "test2",
        "password": "$2b$10$1177nPzSQSL2FyCco4U0tedQYdLcAp0HKnFx0gZgE8p.3P/TEsZyG",
        "score": 0
    }
  ]
  beforeEach(async () => {
    await Activity.deleteMany({})
    let activityObject = new Activity(initialActivities[0])
    await activityObject.save()
    activityObject = new Activity(initialActivities[5])
    await activityObject.save()

    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
  })

test('activities are returned as json', async () => {
    const resp = await api
      .get('/api/myactivities/test1')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const act = resp.body

      expect(act[0].activity).toBe("Learn Express.js")

  }, 100000)

test('leaderboard info returned', async () => {
    const lb = await api
      .get('/api/leaderboard')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const len = lb.body.length

    expect(len).toBe(2)
})

test('registering a new user works', async () => {
    const regiUser = { "username": "test3", "password": "0002", "score": 0 }
    const regi = await api
      .post('/api/register')
      .send(regiUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const uname = regi.body
      console.log("uname?",uname)

      expect(uname.username).toBe("test3")

    const lb = await api
      .get('/api/leaderboard')

    const len = lb.body.length

    expect(len).toBe(3)
})

//afterAll(() => {
//    mongoose.connection.close()
//})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
