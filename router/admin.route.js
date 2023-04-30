/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load function authentcation from auth's controller */
const admincontroler = require(`../controllers/admin.controller`)
const {authorizeAdmin} = require(`../controllers/auth.controller`)
app.use(authorizeAdmin)
/** create route for authentication */
app.get('/', admincontroler.getadmin)
app.post('/insertadmin', admincontroler.insertadmin)
app.put('/updateadmin/:id', admincontroler.updateadmin)
app.delete('/dropadmin/:id', admincontroler.dropadmin)
app.post('/search', admincontroler.search)
app.get("/laporan",admincontroler.getlaporan)
app.get("/getdetaillaporan/:id",admincontroler.getdetaillaporan)

/** export app in order to load in another file */
module.exports = app