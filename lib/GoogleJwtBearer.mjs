import crypto from "crypto"

function base64urlDecode(str) {
  return Buffer.from(base64urlUnescape(str), "base64").toString()
}

function base64urlUnescape(str) {
  str += Array(5 - str.length % 4).join("=")
  return str.replace(/\-/g, "+").replace(/_/g, "/")
}

class GoogleJwtBearer {
  constructor(bearer){
    let parts = bearer.split(".")
    this.envelope = JSON.parse(base64urlDecode(parts[0]))
    this.payload = JSON.parse(base64urlDecode(parts[1]))
    this.signature = base64urlUnescape(parts[2])
    this.message = [parts[0], parts[1]].join(".")
  }
  verifyWithCert(cert){
    return crypto.createVerify("sha256")
      .update(this.message)
      .verify(cert, this.signature, "base64")
  }
}

export default GoogleJwtBearer