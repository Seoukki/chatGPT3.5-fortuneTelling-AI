const { G4F } = require("g4f");
let g4f = new G4F();
const { Configuration, OpenAIApi } = require("openai");
const serverless = require('serverless-http')
const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: process.env.OPENAPI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

//CORS 이슈 해결
let corsOptions = {
    origin: 'https://chatdodge-ko.pages.dev',
    credentials: true
}
app.use(cors(corsOptions));

//POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
    let { myDateTime, userMessages, assistantMessages} = req.body

    let todayDateTime = new Date().toLocaleString("en-US",{timeZone:"America/New_York"});

    const options = [
    {model: "gpt-4",
     debug: "true"
     }
  ];
   const messages = [
    {role: "assistant", content: "Kamu Seon, Kamu menjawab dengan teliti."},{ role: "user", content: +String(userMessages.shift()).replace(/\n/g,"")},
];
    let res = await g4f.chatCompletion(messages, options);

    res.json({"assistant": fortune});
});

//이것때문에 lambda 가능 
module.exports.handler = serverless(app);

//app.listen(3000)
