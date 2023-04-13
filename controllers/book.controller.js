const db = require("../config")
const upload = require('./file-upload').single('cover')
exports.getAllBooks = async (req, res) => {
    let sql = "select * from t_buku"
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }
        }
        return res.json(response) // send response
    })
};
exports.insertbook = async (req, res) => {
    upload(req, res, async error => {
        // console.log(request.body);
        if (error) {
            return res.json({ message: error })
        }
        let data = [];
        if (!req.file) {
            // return res.json({ message: `nothing to upload` })
            data = {
                isbn: req.body.isbn,
                judul: req.body.judul,
                penulis: req.body.penulis,
                penerbit: req.body.penerbit,
                harga: req.body.harga,
            }
        } else {
            data = {
                isbn: req.body.isbn,
                judul: req.body.judul,
                penulis: req.body.penulis,
                penerbit: req.body.penerbit,
                harga: req.body.harga,
                cover: req.file.filename,
            }
        }

        let message = ""

        let sql = "insert into t_buku set ?"
        db.query(sql, data, (err, result) => {
            if (err) {
                message = err.message
            } else {
                message = result.affectedRows + " row inserted"
            }
            let response = {
                message: message
            }
            res.json(response)
        })
    })


}
exports.updatebook = async (req, res) => {

    upload(req, res, async error => {
        // console.log(request.body);
        if (error) {
            return res.json({ message: error })
        }
        let data = [];
        if (!req.file) {
            data = [{
                isbn: req.body.isbn,
                judul: req.body.judul,
                penulis: req.body.penulis,
                penerbit: req.body.penerbit,
                harga: req.body.harga,
            }, req.params.id]
        } else {
            data =
                [{
                    isbn: req.body.isbn,
                    judul: req.body.judul,
                    penulis: req.body.penulis,
                    penerbit: req.body.penerbit,
                    harga: req.body.harga,
                    cover: req.file.filename,
                }, req.params.id]
        }
        let message = ""
        let sql = "update t_buku set ? where isbn = ?"
        db.query(sql, data, (err, result) => {
            if (err) {
                message = err.message
            } else {
                message = result.affectedRows + " row updated"
            }

            let response = {
                message: message
            }
            res.json(response)
        })
    })
}
exports.dropbook = async (req, res) => {
    let data = {
        isbn: req.params.id
    }
    let message = ""
    let sql = "delete from t_buku where ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message: message
        }
        res.json(response)
    })
}
exports.search = async (req, res) => {
    let find = req.body.find
    let sql = "select * from t_buku where isbn like '%" + find + "%' or judul like '%" + find + "%' or penulis like '%" + find + "%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                buku: result
            }
            res.json(response)
        }
    })
}
