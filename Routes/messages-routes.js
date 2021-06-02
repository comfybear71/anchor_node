const express = require('express')
const Lessons = require('../models/dbhelpers')

const router = express.Router()

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Lessons.removeMessage(id)
    .then(count => {
        if(count > 0 ) {
            res.status(200).json({message: `Message Deleted id ${id}` })
        } else {
            res.status(404).json({message: "Couldn't find message with that id"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to delete message - ERROR"})
    })
})

module.exports = router