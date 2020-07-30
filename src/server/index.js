var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv')

// meaning cloud sentiment analysis API
const https = require('follow-redirects').https;
const fs = require('fs');

let data =[];

dotenv.config();
const app = express()

app.use(express.static('dist'))

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// GET request server side
app.get('/getData', function (req, res) {
    console.log("get request", data)
    res.send(data.pop());
})

// POST request server side
app.post('/addEntry', (req, res) => {
    console.log(req.body.text);
    APIRequest(req.body.text).then((APIresult) => {
        console.log("result posted");
        data.push({subjectivity: APIresult.subjectivity, tone: APIresult.irony});
        res.send(data);
    })
})

// API request
const APIRequest = async (text) => {
    let encodedText = encodeURI(text);
    let link = '/sentiment-2.1?key=' + process.env.API_KEY + '&lang=auto&txt=' + encodedText; 
    const options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': link,
        'headers': {
        },
        'maxRedirects': 20
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            var chunks = [];
    
            res.on("data", (chunk) => {
            chunks.push(chunk);
            });
    
            res.on("end", (chunk) => {
            var body = Buffer.concat(chunks);
            resolve(JSON.parse(body.toString()));
            });
    
            res.on("error",(error) => {
            reject(error);
            });
        });
        req.end();
    });

}