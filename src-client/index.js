

class Request {
    constructor(url, listener){
      listener = listener || (e => console.log(e))
      this.r = new XMLHttpRequest()
      this.r.addEventListener("load", listener, true)
      this.url = url
    }
    setHeaders(headers){
      for(let key in headers){
        this.r.setRequestHeader(key, headers[key])
      }
    }
    execute(method, data, headers){
      this.r.open(method, this.url)
      if(headers) {
        this.setHeaders(headers)
      }
      if(data) this.r.send(data)
      else this.r.send()
    }
    get(headers){
      this.execute("GET", null, headers)
    }
    post(data, headers){
      this.execute("POST", data, headers)
    }
    delete(data, headers){
      this.execute("DELETE", data, headers)
    }
    put(data, headers){
      this.execute("PUT", data, headers)
    }
  }
  
  
  const App = {
    open(win){
      this.win = win
      this.model = {}
      this.views = []
    },
    render(){
      this.views.forEach( v => {
        v.render()
      })
    },
    toDom(html){
      let template = document.createElement("template")
      template.innerHTML = html
      return template.content
    }
  }
  
  export default App