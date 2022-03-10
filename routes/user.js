// const express = require('express')
const router = require('express').Router()

//GETTING all
 router.get('/usertest', async (req, res) => {
     res.send('user test is successful')
//   try {
//     const subscribers = await Subscriber.find()
//     res.json(subscribers)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
 });

// //GETTING 1
// router.get('/:id', getSubscriber, (req, res) => {
//   res.json(res.subscriber)
// })

//CREATING 1
router.post('/userposttest', async (req, res) => {
  const username = req.body.username 
  res.send('your username is: ' + username)
//     name: req.body.name,
//     subscribedToChannel: req.body.subscribedToChannel
//  })
//  try {
//    const newSubscriber = await subscriber.save()
//    res.status(201).json(newSubscriber)
//  } catch (err) {
//   res.status(400).json ({ message: err.message })
//   }
})

router.get('appointments', async (req, res) => {
 req.collection.find({})
 .toArray()
 .then(results => res.json(results))
 .catch(error => res.send(error))
})

router.post('/appointments', async (req, res) => {
 const { appointmentDate, name, email }
 if (!appointmentDate || !name || !email {
     return.res.status(400).json({
         message: 'Appointment date, name, email are required',
     })
 }
 const payload = { appointmentDate, name, email }
 req.collection.insertOne(payload)
 .then(result => res.json(result))
 
})


module.exports = router

// //UPDATING 1
// router.patch('/:id', getSubscriber, (req, res) =>{
 
// })

// //DELETE 1
// router.delete('/:id', getSubscriber, async (req, res) => {
//   try {
//     await res.subscriber.remove()
//     res.json({ message: 'Deleted Subscriber' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// async function getSubscriber(req, res, next) {
//   let subscriber
//   try {
//     subscriber = await Subscriber.findById(req.params.id)
//     if (subscriber == null) {
//       return res.status(404).json({ message: 'Cannot find subscriber '})
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }

//   res.subscriber = subscriber
//   next()
// }

// module.exports = router