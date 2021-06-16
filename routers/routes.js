const express = require('express');
const router = express.Router(); // use router.get instead of app.get
const controller = require('../controllers/controller')


// Display New Form (GET)
router.get('/chorelor/add', controller.new)

// Create New Chore Entry (POST)
router.post('/chorelor/add', controller.create)



// Find Chore with Filter Pending
router.get('/chorelor/pending', controller.pending)

// Find Chore with Filter Not Completed
router.get('/chorelor/notcompleted', controller.notcompleted)

// Find Chore with Filter Completed
router.get('/chorelor/completed', controller.completed)

// Find Chore and Sort by Latest Date
router.get('/chorelor/duesoon', controller.duesoon)


// Calendar Display
router.get('/chorelor/cal', controller.cal)


// Search Bar
router.get('/chorelor/search', controller.search)

// ERROR Page
router.get('/chorelor/error', controller.error)



// Edit
router.get("/chorelor/:id/edit", controller.edit)

// Update
router.patch('/chorelor/:id', controller.update)

// Delete
router.get('/chorelor/:id/delete', controller.delete)

// Find Chore
router.get('/chorelor/:id', controller.find)

// Index
router.get('/chorelor', controller.index)


module.exports = router