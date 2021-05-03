const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');

const data = require('./data');




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


app.get('/login', (req, res) => {
    res.render('login')
})


app.post('/code', (req, res) => {
    res.render('login-code')
})


app.post('/status', (req, res) => {

    res.render('status')

})


app.listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`))