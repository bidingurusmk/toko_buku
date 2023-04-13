const express = require('express')
const router = express.Router();
const bookController = require('../controllers/book.controller')
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const {authorizeAdmin,authorizePetugas} = require(`../controllers/auth.controller`)
router.use(authorizeAdmin)
router.get('/getbook',bookController.getAllBooks)
router.post('/insertbook',bookController.insertbook)
router.put('/updatebook/:id',bookController.updatebook)
router.delete('/dropbook/:id',bookController.dropbook)
router.post('/search',bookController.search)

module.exports = router