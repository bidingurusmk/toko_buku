const db = require("../config")
const jwt = require(`jsonwebtoken`)
const { getUserLogin } = require(`./auth.controller`)

exports.save = async (req, res) => {
    let user = getUserLogin(req)
    let today = new Date()
    let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getDay()}`
    data = {
        tgl: currentDate,
        id_admin: user.id_admin,
        grandtotal: 0,
    }
    let response = {}

    let sql = "insert into transaksi set ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            response = {
                status: false,
                message: err.message
            }
        } else {
            let id_transaksi = result.insertId
            let sukses_insert = 0;
            let total = 0;
            req.body.detail_trans.forEach((data) => {
                let sql = "select * from t_buku where ?"
                let isbn = {
                    isbn: data.isbn
                }
                db.query(sql, isbn, (err, result) => {
                    if (!err) {
                        total += result[0].harga * data.qty
                        let object = {
                            id_transaksi: id_transaksi,
                            isbn: result[0].isbn,
                            qty: data.qty
                        }
                        let sql = "insert into detail_transaksi set ?"
                        db.query(sql, object, (err, result) => {
                            if (result) {
                                let object = [{
                                    grandtotal: total
                                }, id_transaksi]
                                let sql = 'update transaksi set ? where id_transaksi=?'
                                db.query(sql, object, (err, result) => {
                                    if (!err) {
                                        sukses_insert++
                                    }
                                })
                            }
                        })
                    }
                })
            })
            response = {
                status: true,
                message: "sukses memasukkan data transaksi"
            }
        }
        res.json(response)
    })
}