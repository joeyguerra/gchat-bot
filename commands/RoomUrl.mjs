import log from "npmlog"
const RoomUrl = {
    async execute(chatMessage){
      let roomUrl = `https://chat.google.com/u/0/room/${chatMessage.space.name.replace("spaces/", "")}`
      log.info(roomUrl)
      return {text: `<${roomUrl}|${chatMessage.space.displayName}> (${roomUrl})`}
    },
    respondsTo(chatMessage){
      return chatMessage.type === "MESSAGE" && /room url$/.test(chatMessage.message.argumentText.trim())
    }
  }
  
  export default RoomUrl