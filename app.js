const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');

const data = require('./data');
const MikrotikVariables = require('./mikrotik')


const app = express();

app.set('view engine', 'ejs');


/**Parse the body of the request  (body-parser) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
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
    // missing-----------------------------------------------------------------------

    // render code input page
    res.render('mobile/code', { mobile, error: null })
})


app.post('/verify-code', (req, res) => {
    const { mobile, code } = req.body
    // validation mobile 
    const regex = new RegExp(config.patterns.mobile)
    if (!regex.test(mobile))
        return res.render('mobile/login', { error: 'invalid mobile number' })

    // validation mobile 
    const code_regex = new RegExp(config.patterns.code)
    if (!code_regex.test(code))
        return res.render('mobile/code', { mobile, error: 'Invalid code' })
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