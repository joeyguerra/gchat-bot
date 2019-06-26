import tap from "tap"
import GoogleJwtBearer from "../lib/GoogleJwtBearer.mjs"
import GetGoogleCerts from "../lib/GetGoogleCerts.mjs"
// This test doesn't pass. I was just using it to figure out the code.
tap.skip("Google Certs test. Doesn't pass because the cert for this token only exists on a prod request.", async t=>{
    let token = process.env.BEARER
    let gToken = new GoogleJwtBearer(token.replace(/Bearer\s/, ""))
    let {certs, res, maxAgeSeconds} = await GetGoogleCerts(`https://www.googleapis.com/service_accounts/v1/metadata/x509/${gToken.payload.iss}`)
    if(res.statusCode !== 200){
        t.fail("Failed to quer for certs", res.statusCode)
    }
    let cert = certs[gToken.envelope.kid]
    t.ok(gToken.verifyWithCert(cert), "Should be verified")
    t.end()
})