const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {//posting to task db
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
            await task.save()
            res.status(201).send(task)
        }
        catch (e) {
            res.status(400).send(error)
        }
   })


   
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc

    router.get('/tasks', auth, async (req, res) => {//getting all tasks
        const match = {}
        const sort = {}
        
        if (req.query.completed) {
            match.completed = req.query.completed === 'true' //getting either finished or unfinished tasks
        }

        if (req.query.sortBy) {//sort by desc or asc order
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        try {
           await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),//pagination
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
           res.send(req.user.tasks)
       } catch (e) {
           res.status(500).send()
       }
   })

   
   router.get('/tasks/:id', auth, async (req, res) => {//getting task by id per user auth
       const _id = req.params.id

       try {
        const task = await Task.findOne({ _id, owner: req.user._id })
           if (!task) {
               return res.status(404).send()
           }
           res.send(task)
           console.log(task)
       } catch(e) {
           res.status(500).send()
       }
   })
   
   router.patch('/tasks/:id', auth, async (req, res) => {//updating task by owner and id as auth
      const updates = Object.keys(req.body)
      const allowedUpdates = ['completed', 'description']
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
       
      if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' })
      }
   
       try {
            const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

           if (!task) {
               return res.status(404).send()
           }

           updates.forEach((update) => task[update] = req.body[update])
            await task.save()
   
   
           res.send(task)
       } catch (e) {
           res.send(404).send()
       }
   })
   
   router.delete('/tasks/:id', auth, async (req, res) => {//deleting task by id and auth user
       try {
            const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
   
            if (!task) {
               return res.status(404).send()
            }
   
            res.send(task)
       }
       catch (e) {
           res.status(500).send()
       }
   })

module.exports = router