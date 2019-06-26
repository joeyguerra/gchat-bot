import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import GoogleJwtBearer from "./lib/GoogleJwtBearer.mjs"
import GetGoogleCerts from "./lib/GetGoogleCerts.mjs"
import CommandExecuter from "./lib/CommandExecuter.mjs"
import natural from "natural"
import myVocab from "./lib/MyVocab.mjs"
import log from "npmlog"

Reflect.defineProperty(
  log, "heading", {
    get(){
      return new Date()
    }
  }
)

const shutdown = ()=>{
  process.exit(0)
}
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

log.level = "silly"

async function main(){
  let requiredEnvironmentVariables = []
  ;["GOOGLE_APPLICATION_CREDENTIALS",
      "CHATBOT_URI", "BEARER"
  ].forEach( key => {
      if(!(key in process.env)){
          requiredEnvironmentVariables.push(key)
      }
  })
  
  if(requiredEnvironmentVariables.length > 0){
      log.error("Required environment variables", requiredEnvironmentVariables)
      throw new Error("Required Environment Variables")
  }
  const classifier = new natural.LogisticRegressionClassifier()
  myVocab.intents.map( intent => {
      intent.patterns.forEach(p=>{
          classifier.addDocument(p, intent.tag)
      })
  })
  classifier.train()

  const server = express()

  server.use(cookieParser())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(express.static("dist"))
  server.use(express.static("public"))

  server.use(`/${process.env.CHATBOT_URI}`, async (req, resp, next) => {
    try{
      let gToken = new GoogleJwtBearer(req.headers["authorization"].replace(/Bearer\s/, ""))
      let {certs, res, maxAgeSeconds} = await GetGoogleCerts(`https://www.googleapis.com/service_accounts/v1/metadata/x509/${gToken.payload.iss}`)
      if(res.statusCode !== 200){
        next(401)
      }
      let cert = certs[gToken.envelope.kid]
      if(gToken.verifyWithCert(cert)){
        next()
      } else {
        log.warn("request not from Google")
        next(401)
      }
    } catch(e){
      next(400)
    }
  })

  server.post(`/${process.env.CHATBOT_URI}`, async (req, res) => {
    let messages = await CommandExecuter.execute(req.body)
    messages.forEach( async m => {
      await GoogleChat.replyWith(req.body, m)
    })
    res.status(200).end()
  })

  CommandExecuter.init(log).then( o => {
    const endpoint = server.listen(process.env.PORT, () => {
      log.info("listening", `on ${endpoint.address().port}`)
    })
  }).catch( e => log.error(e) )
}

main()