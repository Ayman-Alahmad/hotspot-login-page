const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');

const data = require('./data');
const MikrotikVariables = require('./mikrotik')

const axios = require('axios')


const app = express();

app.set('view engine', 'ejs');


/**Parse the body of the request  (body-parser) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
    res.redirect('http://home.hotspot.sy/login')
})

app.get('/home', (req, res) => {
    res.render('direct/index')
})

app.get('/find', (req, res) => {
    res.render('find-a-hotspot', { posList: data.posList })
})

app.post('/login', (req, res) => {

    const varibles = new MikrotikVariables(req.body)

    res.render('mobile/login', { error: null, varibles })
})

// Sending the code via sms and waitting for validation code from user
app.post('/code', (req, res) => {
    const { mobile } = req.body
    const varibles = new MikrotikVariables(req.body)
    // validation mobile 
    const regex = new RegExp(config.patterns.mobile)
    if (!regex.test(mobile))
        return res.render('mobile/login', { error: 'invalid mobile number', varibles })

    // send code via sms
    axios
        .post('http://188.247.31.134:3000/sms/create-user', {
            mac: varibles.mac,
            mobile,
            ip: varibles.ip,
            server_address: varibles.server_address
        })
        .then(data => {
            // render code input page
            varibles.username = data.username
            res.render('mobile/code', { mobile, error: null, varibles })
        })
        .catch(error => {
            // render code input page
            return res.render('mobile/login', { error: 'invalid mobile number', varibles })
        })

})


app.post('/verify-code', (req, res) => {
    const { mobile, code } = req.body
    const varibles = new MikrotikVariables(req.body)

    // validation mobile 
    const regex = new RegExp(config.patterns.mobile)
    if (!regex.test(mobile))
        return res.render('mobile/login', { error: 'invalid mobile number', varibles })

    // validation mobile 
    const code_regex = new RegExp(config.patterns.code)
    if (!code_regex.test(code))
        return res.render('mobile/code', { mobile, error: 'Invalid code' })
    // do login to wifi with username and password(code)
    res.render('mobile/verify-code', { mobile, code, error: null, varibles })

})


app.post('/login/account', (req, res) => {
    const varibles = new MikrotikVariables(req.body)
    res.render('account/login', { error: null, varibles })
})

app.post('/logout', (req, res) => {
    const varibles = new MikrotikVariables(req.body)
    res.render('logout', { varibles })

})

app.post('/status', (req, res) => {
    const varibles = new MikrotikVariables(req.body)
    res.render('status', { varibles })
})

app.get('/status', (req, res) => {
    res.redirect('http://home.hotspot.sy/status')
})
app.get('/login', (req, res) => {
    res.redirect('http://home.hotspot.sy/login')
})

app.use((req, res) => {
    res.render('404')
})

app.listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`))