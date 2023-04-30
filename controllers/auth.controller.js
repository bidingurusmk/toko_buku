/** load express library */
const express = require(`express`)
/** load md5 library */
const md5 = require(`md5`)
/** load library jsonwebtoken */
const jwt = require(`jsonwebtoken`)
const db = require("../config")

/** create function to handle authenticating process */
const authenticate = async (req, res) => {

    let dataLogin = [
        req.body.username,
        md5(req.body.password)
    ]

    /** check data username and password on admin's table */

    let sql = "select * from t_admin where username=? and password=?"
    db.query(sql, dataLogin ,(error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message,
                token: null,
                user:null ,
                login_status: false,
            }
        } else {
            if(result.length>0){
                let payload = JSON.stringify(result[0])
                /** define secret key as signature */
                let secret = `mokleters`
            /** generate token */
                let token = jwt.sign(payload, secret)
                /** define response */
                response = {
                    message: 'sukses login',
                    token: token,
                    user:result,
                    login_status: true,
                }
            } else {
                response = {
                    message: 'Login gagal, username atau password salah',
                    token: null,
                    user:null ,
                    login_status: false,
                }
            }
        }
        res.json(response)
    })

}
/** create function authroize */
const authorizeAdmin = (request, response, next) => {
    /** get "Authorization" value from request's header */
    let headers = request.headers.authorization

    let tokenKey = headers && headers.split(" ")[1]
    /** check nullable token */
    if (tokenKey == null) {
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }
    /** define secret Key (equals with secret key in authentication function) */
    let secret = `mokleters`
    /** verify token using jwt */
    jwt.verify(tokenKey, secret, (error, user) => {
        /** check if there is error */
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        } else {
            if(user.role=="admin"){
                next()
            } else {
                return response.json({
                    success: false,
                    message: 'bukan admin'
                }) 
            }
        }
    })
}
const getUserLogin = (token)=>{
    if (token.headers && token.headers.authorization) {
        let secret = `mokleters`
        var authorization = token.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, secret);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        let user = decoded;
        return user
    }
}
const getUser = (request, response)=>{
    if (request.headers && request.headers.authorization) {
        let secret = `mokleters`
        var authorization = request.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, secret);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        let user = decoded;
        return response.json({
            data:user
        }) 
    }
}
/** create function authroize */
const authorizePetugas = (request, response, next) => {
    /** get "Authorization" value from request's header */
    let headers = request.headers.authorization
    let tokenKey = headers && headers.split(" ")[1]
    /** check nullable token */
    if (tokenKey == null) {
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }
    /** define secret Key (equals with secret key in authentication function) */
    let secret = `mokleters`
    /** verify token using jwt */
    jwt.verify(tokenKey, secret, (error, user) => {
        /** check if there is error */
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        } else {
            if(user.role=="petugas"){
                next()
            } else {
                return response.json({
                    success: false,
                    message: `bukan petugas`
                }) 
            }
        }
    })
}
module.exports = { authenticate, authorizeAdmin, authorizePetugas, getUserLogin,getUser }
