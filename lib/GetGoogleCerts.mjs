import MakeRequest from "./MakeRequest.mjs"

let certs = {}
let maxAgeSeconds = 0
const GetGoogleCerts = async url => {
  if((new Date()).getTime() < maxAgeSeconds * 1000){
    return {certs, res: {statusCode: 200}, maxAgeSeconds}
  }
  let {body, res} = await MakeRequest(url)  
  certs = JSON.parse(body)
  maxAgeSeconds = Number(res.headers["cache-control"]
    .split(",")
    .map( v => v.trim() )
    .filter( v => v.indexOf("max-age") > -1)
    .reduce( (accumulator, currentValue) => currentValue , "max-age=1")
    .split("=")[1])
  return {certs, res, maxAgeSeconds}
}
export default GetGoogleCerts