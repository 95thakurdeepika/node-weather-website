const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path and express config
const puclicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

//Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

//setup static diretory to serve
app.use(express.static(puclicDirectoryPath));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  }); 

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepika Chand',
    });
})

app.get('/about', (req, res) => {
    // res.send('<h1>About Page</h1>')
    // res.sendFile(path.join(__dirname, '../public/about.html'));
    res.render('about', {
        title: 'About Me',
        name: 'Deepika Chand',
    })
})

app.get('/help', (req, res) => {
    // res.send({
    //     name: 'Deepika',
    //     age: 27
    // })
    // res.sendFile(path.join(__dirname, '../public/help.html'));
    res.render('help', {
        title: 'Help Page',
        message: "Contact us on @www.weatherhelp.com for any queries",
        name: 'Deepika Chand'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide address'
        })
    }

    geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Its too cold and snowy',
    //     location: 'Faridabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'Please proide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: "Help Article not found",
        name: 'Deepika Chand'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: "Page not Found",
        name: 'Deepika Chand'
        
    })
})

app.listen(3000, () =>{
    console.log('Server is up and running on 3000 port')
})