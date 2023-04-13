const express = require("express") 
const cors = require("cors") 
const app = express() 

app.use(cors())
const bookRoute = require('./router/book.route');
const auth = require('./router/auth');
const trans = require('./router/transaksi.route');
app.use('/book',bookRoute)
app.use('/auth',auth)
app.use('/transaksi',trans)
app.use(express.static(__dirname))
app.listen(8000,()=>{
	console.log('server port 8000')
})