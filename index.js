/* 引入express框架 */
const express = require('express');
const api = require('./api')
const connStr = require('./dbConfig')

var router = express.Router();
const app = express();
/* 引入cors */
const cors = require('cors');
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* 引入mysql */
const mysql = require('mysql');




// 实测不管用，重新链接会报端口占用
function handleDisconnection(){
    const conn = mysql.createConnection(connStr)
    conn.connect( err=>{
        if (err) {
            setTimeout('handleDisconnection()', 2000);
        }
    });

    conn.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnection();
        } else {
            throw err;
        }
    });

    api(app,conn)
}

handleDisconnection()






