const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://tech-hunt-project.web.app'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {
    const usersCollection = client.db('techHunt').collection('users')
    const productsCollection = client.db('techHunt').collection('products')
    const reviewsCollection = client.db('techHunt').collection('reviews')

    // Role verification middlewares
    // For admins
    const verifyAdmin = async (req, res, next) => {
      const user = req.user
      console.log('user from verify admin', user)
      const query = { email: user?.email }
      const result = await usersCollection.findOne(query)
      if (!result || result?.role !== 'admin')
        return res.status(401).send({ message: 'unauthorized access' })
      next()
    }
    // For Moderators
    const verifyModerator = async (req, res, next) => {
      const user = req.user
      const query = { email: user?.email }
      const result = await usersCollection.findOne(query)
      if (!result || result?.role !== 'moderator')
        return res.status(401).send({ message: 'unauthorized access' })
      next()
    }

    // auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      console.log('I need a new jwt', user)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })
    // Save or modify user email, status in DB
    app.put('/users/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const options = { upsert: true }
      const isExist = await usersCollection.findOne(query)
      console.log('User found?----->', isExist)
      if (isExist) {
        return res.send(isExist)
      }
      const result = await usersCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      )
      res.send(result)
    })
    // Get user role
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const result = await usersCollection.findOne({ email })
      res.send(result)
    })
    // Get all users
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })
    // Update user role
    app.put('/users/update/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      }
      const result = await usersCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })
    // Get all products
    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray()
      res.send(result)
    })
    //get products for user
    app.get('/products/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      const result = await productsCollection
        .find({ 'owner.email': email })
        .toArray()
      res.send(result)
    })

    // Get single product data
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id
      const result = await productsCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })
    // Save a product in database
    app.post('/add-product', verifyToken, async (req, res) => {
      const product = req.body
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })
    // Update A product
    app.put('/product/:id', verifyToken, async (req, res) => {
      const product = req.body
      console.log(product)

      const filter = { _id: new ObjectId(req.params.id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: product,
      }
      const result = await productsCollection.updateOne(
        filter,
        updateDoc,
        options
      )
      res.send(result)
    })
    // delete a product
    app.delete('/product/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await productsCollection.deleteOne(query)
      res.send(result)
    })

    //get all reviews of a product
    app.get('/reviews/:productId', async (req, res) => {
      const productId = req.params.productId
      console.log(productId)
      const result = await reviewsCollection.find({ productId }).toArray()
      res.send(result)
    })
    // Save a review in database
    app.post('/add-review', verifyToken, async (req, res) => {
      const review = req.body
      const result = await reviewsCollection.insertOne(review)
      res.send(result)
    })

    // Update product status
    app.patch('/product/status/:id', async (req, res) => {
      const id = req.params.id
      const status = req.body
      console.log(status)
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: status,
      }
      const result = await productsCollection.updateOne(query, updateDoc)
      res.send(result)
    })
    // Update product vote
    app.patch('/product/vote/:id', async (req, res) => {
      const id = req.params.id
      let upVote = req.body.upvote
      let voterId = req.body.voterId
      let downVote = req.body.downvote
      let status = req.body.status
      if (status) {
        upVote.push(voterId)
      } else {
        downVote.push(voterId)
      }
      console.log(status)
      console.log({ upVote, downVote })
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          upVote,
          downVote,
        },
      }
      const result = await productsCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // Generate client secret for stripe payment
    app.post('/create-payment-intent', verifyToken, async (req, res) => {
      const { price } = req.body
      const amount = parseInt(price * 100)
      if (!price || amount < 1) return
      const { client_secret } = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      })
      res.send({ clientSecret: client_secret })
    })

    // Admin Stat Data
    app.get('/admin-stat', verifyToken, verifyAdmin, async (req, res) => {
      const userCount = await usersCollection.countDocuments()
      const productCount = await productsCollection.countDocuments()
      const reviewCount = await reviewsCollection.countDocuments()

      const chartData = [
        ['Data', 'Amount'],
        ['Products', productCount],
        ['Reviews', reviewCount],
        ['Users', userCount],
      ]

      res.send({
        chartData,
      })
    })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from Tech-Hunt Server..')
})

app.listen(port, () => {
  console.log(`Tech-Hunt is running on port ${port}`)
})
