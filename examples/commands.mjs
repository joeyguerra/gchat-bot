import tap from "tap"
import CommandExecuter from "../lib/CommandExecuter.mjs"
import {GoogleChat, ChatMessage, TextMessage, MessageType} from "../lib/GoogleChat.mjs"
import { Message } from "../lib/GoogleChat.mjs";
import { Space } from "../lib/GoogleChat.mjs";

tap.test(async t => {
    await CommandExecuter.init()
    t.ok(CommandExecuter.commands.length > 0, `Should have some commands: got ${CommandExecuter.commands.length}`)
    let messages = await CommandExecuter.execute(ChatMessage({
        message: Message({
            text: TextMessage("@pipbot What does the fox say"),
            argumentText: TextMessage(" What does the fox say"),
            space: Space({type: MessageType.MESSAGE})
        }),
        type: MessageType.MESSAGE
    }))
    t.match(messages[0].text, "Beep bap bo do de be do boop", "Answer questions")
    t.end()
})