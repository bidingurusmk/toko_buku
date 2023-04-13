const express = require('express')
const router = express.Router();
const transController = require('../controllers/transaksi.controller')
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const {authorizeAdmin,authorizePetugas} = require(`../controllers/auth.controller`)
router.use(authorizeAdmin)

router.post('/save',transController.save)


module.exports = router