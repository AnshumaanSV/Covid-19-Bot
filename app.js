const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const chalk = require('chalk');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


let query = "";

app.post('/sent', (req, res) => {
  query = JSON.stringify(req.body);
  runSample().then(data => {
    res.send({Reply: data})
  });
})

async function runSample(projectId = 'crow-ppcmcc') {
  const sessionId = uuid.v4();
  console.log("API accessed");
    const sessionClient = new dialogflow.SessionsClient( {
        keyFilename:"/home/srt/Documents/Covid-19 Bot/Crow-c6d35003877c.json"
      }
    );
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US',
        },
      },
    };
  
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(chalk.blue(`${result.fulfillmentText}`));

    return result.fulfillmentText;
  }

app.listen(port, () => {
  console.log('Server running');
});