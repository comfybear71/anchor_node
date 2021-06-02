const express = require('express')
const Lessons = require('./models/dbhelpers')

const server = express()

server.use(express.json())

const PORT = 5000

server.get('/', (req, res) => {
    res.json({message: 'I am watching'})
});

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message: "cannot add lesson"})
    })
})

server.get('/api/lessons', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({message: "cannot find lessons"})
    })
})

server.get('/api/lessons/:id', (req, res) => {
    const { id } = req.params

    Lessons.findById(id)
    .then(lessons => {
        if(lessons){
            res.status(200).json(lessons)
        }else {
            res.status(404).json({ message: "Record not found "})
        }
    })
    .catch(error => {
        res.status(500).json({message: "cannot find lessons"})
    })
})

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params
    
    Lessons.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "Successfully deleted"})
        } else {
            res.status(404).json({message: "Unable to locate record"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "unable to delete"})
    })
})

server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    Lessons.update(id, changes)
    .then(lesson => {
        if(lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({message: "Record Not found!!"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "unable to patch"})
    })
})


server.listen(PORT, () => {
    console.log(`\n*** Server running on Port ${PORT} ***\n`)
})