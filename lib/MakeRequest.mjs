import https from "https"
import http from "http"
const MakeRequest = async url => {
    return new Promise((resolve, reject)=>{
        (url.indexOf("https") > -1 ? https : http).get(url, res => {
            res.setEncoding("utf8")
            let body = ""
            res.on("data", chunk => {
                body += chunk
            })
            res.on("end", e=>{ 
                resolve({body, res})
            })
        }).on("error", e => {
            reject(e)
        })
    })
}

export default MakeRequest