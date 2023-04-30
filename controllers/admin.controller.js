const db = require("../config")
const md5 = require("md5")
exports.getadmin = async (req, res) => {
    let sql = "select * from t_admin"
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        return res.json(response) // send response
    })
};
exports.insertadmin = async (req, res) => {
    let data = [];
    data = {
        nama_admin: req.body.nama_admin,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password),
    }
    let message = ""

    let sql = "insert into t_admin set ?"
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
}



exports.updateadmin = async (req, res) => {
    let data = [];
    data = [{
        nama_admin: req.body.nama_admin,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password),
    }, req.params.id]

    let message = ""
    let sql = "update t_admin set ? where id_admin = ?"
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
}
exports.dropadmin = async (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    let message = ""
    let sql = "delete from t_admin where ?"
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
exports.search=async(req,res)=>{
    let find=req.body.find
    let sql = "select * from t_admin where id_admin like '%"+ find +"%' or nama_admin like '%"+ find +"%' or role like '%"+ find +"%' or username like '%"+find+"%'" 
    db.query(sql,(error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        return res.json(response) // send response
    })
}
exports.getlaporan=async(req,res)=>{
    let sql = "select * from transaksi order by id_transaksi desc" 
    db.query(sql,(error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                data: result // isi data
            }
        }
        return res.json(response) // send response
    })
}
exports.getdetaillaporan=async(req,res)=>{
    let sql = "select * from detail_transaksi join t_buku on t_buku.isbn=detail_transaksi.isbn where id_transaksi = '"+req.params.id+"'" 
    db.query(sql,(error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                data: result // isi data
            }
        }
        return res.json(response) // send response
    })
}





