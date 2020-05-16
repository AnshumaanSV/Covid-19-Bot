const path = require('path')
const dialogflow = require('dialogflow')
const uuid = require('uuid')

async function runSample(query, projectId = 'crow-ppcmcc') {
    const sessionId = uuid.v4()
    const sessionClient = new dialogflow.SessionsClient( {
        keyFilename:path.join(__dirname, '../../') + "Crow-c6d35003877c.json"
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

      return {message: result.fulfillmentText}
}

module.exports = {
    runSample: runSample
}