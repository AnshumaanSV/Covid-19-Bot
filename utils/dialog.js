const dialogflow = require('dialogflow')
const uuid = require('uuid')
const chalk = require('chalk')
const path = require('path')

let query = ""

const changeQuery = (tempString) => {
    query = tempString
    runSample()
}

async function runSample(projectId = 'crow-ppcmcc') {
    const sessionId = uuid.v4()
    console.log(chalk.bgGreen('API accessed'))
    const sessionClient = new dialogflow.SessionsClient( {
        keyFilename:path.join(__dirname, '../') + "Crow-c6d35003877c.json"
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId)
    
    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: 'en-US',
          },
        },
      }
    
      const responses = await sessionClient.detectIntent(request)
      const result = responses[0].queryResult
      console.log(chalk.blue(`${result.fulfillmentText}`));
    }

module.exports = {
    changeQuery: changeQuery
}