var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = require('../../app');
var User = require('../../model/admin/user');
var wx_auth = require('../../model/admin/wx_auth');
var redis = require('../../model/redis_db');
var exp = require('../../config')['redis']['exp'];
var common = require('../../common');
var websocket = require('../../websocket');


router.get('/jsoncode2session', (req, res) => {
    var js_code = req.query.js_code;
    var appid = "wxc12a610b34e848b8";
    var secret = "222d6077e14afe2f3a70a834bff18a36";
    var grant_type = "authorization_code";
    var params = {
        appid,
        secret,
        js_code,
        grant_type
    };
    common.get_request('https://api.weixin.qq.com/sns/jscode2session', params).then(result => {
        res.json(result);
    }, err => {
        res.end(err);
    });
})

router.get('/checkAuth', (req, res) => {
    var OPEN_ID = req.query.OPEN_ID;
    wx_auth.checkAuth(OPEN_ID).then(result => {
        if (result.length > 0) {
            res.json({
                code: 200,
                success: true,
                result
            });
        } else {
            res.json({
                code: 109,
                success: false,
                result
            });
        }
    }, err => {
        res.end(err);
    })
})

router.get('/getLocation', (req, res) => {
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var params = {
        location: longitude + ',' + latitude,
        key: '111cd711282bda0bf4b1c2d3e7d2cf13',
        radius: '1000',
        extensions: 'all'
    }
    common.get_request('http://restapi.amap.com/v3/geocode/regeo', params).then(result => {
        res.json(result);
    }, err => {
        res.end(err);
    });
})

module.exports = router;