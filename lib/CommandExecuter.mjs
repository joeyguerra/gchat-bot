import Path from "path"
import Folder from "../lib/Folder.mjs"
import log from "npmlog"

const CommandExecuter = {
  commands: [],
  async init(){
    let files = await Folder.read(Path.resolve(Path.dirname(new URL(import.meta.url).pathname), "../commands/"))
    files = files.filter( f => f.indexOf(".mjs") !== -1)
    for(let i = 0; i < files.length; i++){      
      let c = await import(files[i])
      c = c.default // Doing this because it's a dynamic import.
      if(c.init) c.init()
      this.commands.push(c)
    }
    return this.commands
  },
  async execute(chatMessage) {
    let commands = this.commands.filter( c => {
      let doesRespond = false
      try{
        doesRespond = c.respondsTo && c.respondsTo(chatMessage)
      } catch(e){
        log.error("error", e, c)
      }
      return doesRespond
    })
    let messages = []
    for(let i = 0; i < commands.length; i++){
      let m = await commands[i].execute(chatMessage)
      messages.push(m)
    }
    if(messages.length > 0){
      return messages
    }
    return [{text: "Hi. Thanks. I got your message, but I didn't find a `Command` that would handle it. If you just added me to the room, thanks, and you'll have to send the message to me again."}]
  }
}

export default CommandExecuter