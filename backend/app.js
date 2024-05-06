const env = require("dotenv")
const cookieParser = require("cookie-parser");
env.config()
const express = require("express")
const app = express()
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://192.168.246.75:1234');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const { PORT } = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(fileUpload())

app.use("/", require("./routes/index"))

app.listen(PORT, async () => {
    await require("./config/mongodbconfig")()
    console.log(`::> Server listening on port ${ PORT } @ http://localhost:${ PORT }`)
})

module.exports = app
// require("./createNewData")