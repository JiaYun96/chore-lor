const { ChoresModel } = require('../models/chores');
const { render } = require('ejs');
const { result } = require('lodash');
const { response } = require('express');
const chores = require('../models/chores');
const calendar = require('../models/chores');
var moment = require('moment');


module.exports = {

  // 1. SHOW HOME PAGE (LIST ALL CHORES)
    index: (req, res) => {

      ChoresModel.find()
        .then(result => {
          res.render('index', {chores: result})
        })
        .catch(err => {
          console.log(err)
          res.send("INDEX ERROR")
        })

    },


  // 2. CREATE NEW FORM
    new: (req, res) => {
        res.render('add')

    },


  // 3. CREATE NEW CHORE
    create: (req, res) => {
      console.log(req.body)

        var newStartDate = new Date(req.body.starttime)
        console.log(newStartDate)

        // New Chore
        const newchore = new ChoresModel({
            "date": req.body.date,
            "chorename": req.body.chorename,
            "housearea": req.body.housearea,
            "starttime": new Date(req.body.starttime),
            "endtime": new Date(req.body.endtime),
            "status": req.body.status,
            "comments": req.body.comments,
        })

        // Save Chore in Database
        newchore
          .save(newchore)
          .then(response => {
            res.redirect('/chorelor')
            // res.send(response)
          })
          .catch(err => {
            res.redirect('/chorelor/error')
            console.log(err)
          })

    },


  // 4. SHOW CHORE ITEM DETAILS (BY ID)
    find: (req, res) => {
      console.log('ID is', req.params.id)

      ChoresModel.findOne({ _id: req.params.id })
        .then(response => {
          res.render('find', { chores: response })
        })
        .catch(err => {
          console.log(err)
          res.send("db error")
        })

    },


  // 5. EDIT EXISTING CHORE ITEM DETAILS (BY ID)
    edit: (req, res) => {

        // Find Chore Details from DB
      ChoresModel.findOne( { _id: req.params.id } )
        .then(response => {
          // then render template with chore details
          res.render('edit', { chores: response })
        })
        .catch(err => {
          console.log(err)
          res.send("ERROR")
        })

    },



  // 6. UPDATE IDENTIFIED CHORE (BY ID)
    update: (req, res) => {

      ChoresModel.updateOne( { _id: req.params.id },
        {$set:
              {
                date: req.body.date,
                chorename: req.body.chorename,
                housearea: req.body.housearea,
                starttime: req.body.starttime,
                endtime: req.body.endtime,
                status: req.body.status,
                comments: req.body.comments,
              }
        }
      )

      .then(response => {
        res.redirect('/chorelor/' + req.params.id)
      })
      .catch(err => {
        console.log(err)
        res.send("ERROR")
      })

    },


  // 7. DELETE A SPECIFIC CHORE (WITH ID IN REQUEST)
    delete: (req, res) => {

      ChoresModel.deleteOne( { _id: req.params.id } )
        .then(response => {
          res.redirect('/chorelor')
        })
        .catch(err => {
          console.log(err)
          res.send('db err')
        })

    },


  // FILTER CHORES BASED ON STATUS - PENDING
    pending: (req, res) => {

      ChoresModel.find( {status: "Pending"},

        function(err, result) {
          if (err) {
            res.send(err)
          }
          else {
            res.render('index_pending', {chores: result})
          }
        }
      )

    },

  // FILTER CHORES BASED ON STATUS - NOT COMPLETED
    notcompleted: (req, res) => {

      ChoresModel.find( {status: "Not Completed"},

        function(err, result) {
          if (err) {
            res.send(err)
          }
          else {
            res.render('index_notcompleted', {chores: result})
          }
        }
      )

    },

  // FILTER CHORES BASED ON STATUS - COMPLETED
    completed: (req, res) => {

      ChoresModel.find( {status: "Completed"},

        function(err, result) {
          if (err) {
            res.send(err)
          }
          else {
            res.render('index_completed', {chores: result})
          }
        }
      )

    },

  // FILTER CHORES & SORT BASED ON DATE + STATUS 'PENDING' OR 'NOT COMPLETED'
    duesoon: (req, res) => {

      ChoresModel.aggregate(
        [
          {$sort: {date: 1} },
          {$match: {status: {$in: ["Pending", "Not Completed"]}} },
          {$limit: 10}
        ],

        function(err, result) {
          if (err) {
            res.send(err)
          }
          else {
            res.render('index_duesoon', {chores: result})
          }
        }
      )

    },


  // FIND CHORES BASED ON KEYWORDS SEARCHED (SEARCHBAR)
    search: (req, res) => {

      if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')

        ChoresModel.find({ chorename: regex },
          function(err, result) {
            if (err) {
              console.log(err)
            }
            else {
              res.render('index_search', {chores: result})
            }
          }
        )
      }

    },



  // ERROR PAGE - SHOWN WHEN FORM SUBMITTED HAS MISSING DETAILS
    error: (req, res) => {
      res.render('error')

    },


  // SHOW CALENDAR
  cal: (req, res) => {
      ChoresModel.find( {},
          function(err, result) {
              if (err) {
                  res.send(err)
              }
              else {

                const calendarItems = result.map(chore => {
                  return {
                    title: `${chore.chorename}`,
                    start: `${chore.date}`,
                  }


                })
                console.log(calendarItems)
                res.render('calendar', {chores: result, calendarItems})
              }
          }
      )

    // res.render('calendar', {chores: chores})

  },


}


// REGEX FOR SEARCHBAR / KEYWORDS
let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}
