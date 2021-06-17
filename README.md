# chore-lor
Basic Overview:
- CRUD/RESTful Task management app designed for chores management in the house.
- Create, Edit, Update, Delete and View chores.
- Database storing capability (MongoDB/MongoAtlas).
- Input due dates, chore name, house area, projected start/end time, status and comments for each chore.
- View comments relating to each chore in the chore view button.

Features:
- Search Bar: Input keyword to filter chores.
- Quick Navigation Tabs: filters status of chores (pending/not completed/completed).
- Features both list and calendar view (fullcalendar io) of chores.

Routes:
- Display New Form (GET)
router.get('/chorelor/add', controller.new)

- Create New Chore Entry (POST)
router.post('/chorelor/add', controller.create)


- Find Chore with Filter Pending
router.get('/chorelor/pending', controller.pending)

- Find Chore with Filter Not Completed
router.get('/chorelor/notcompleted', controller.notcompleted)

- Find Chore with Filter Completed
router.get('/chorelor/completed', controller.completed)

- Find Chore and Sort by Latest Date
router.get('/chorelor/duesoon', controller.duesoon)


- Calendar Display
router.get('/chorelor/cal', controller.cal)


- Search Bar
router.get('/chorelor/search', controller.search)

- ERROR Page
router.get('/chorelor/error', controller.error)


- Edit
router.get("/chorelor/:id/edit", controller.edit)

- Update
router.patch('/chorelor/:id', controller.update)

- Delete
router.get('/chorelor/:id/delete', controller.delete)

- Find Chore
router.get('/chorelor/:id', controller.find)

- Index
router.get('/chorelor', controller.index)





HEROKU Link:

https://chore-lor.herokuapp.com/chorelor



Challenges Faced during the Project/Further Improvements:
1. Setting up FullCalendar.
2. Identifying how to use .aggregate
3. JavaScript RegExp gi Modifier - do a case insensitive search of all occurrences of a regular expression in a string.



