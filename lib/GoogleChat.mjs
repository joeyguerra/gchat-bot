import googleApis from "googleapis"
const SCOPES = ["https://www.googleapis.com/auth/chat.bot"]
const google = googleApis.google

const GoogleChat = {
  async replyWith(chatMessage, message){
    const auth = await google.auth.getClient({
      scopes: SCOPES
    })
    message.thread = message.thread || {
      name: chatMessage.message.thread.name
    }
    const chat = google.chat({version: "v1", auth: auth})
    const response = await chat.spaces.messages.create({parent: chatMessage.message.space.name, resource: message})
    return response
  }
}

const MessageType = {
  ADDED_TO_SPACE: "ADDED_TO_SPACE",
  REMOVED_FROM_SPACE: "REMOVED_FROM_SPACE",
  MESSAGE: "MESSAGE",
  DM: "DM",
  schemaName: "type"
}
const SpaceType = {
  ROOM: "ROOM",
  DM: "DM"
}
const UserType = {
  BOT: "BOT",
  USER: "USER"
}
const UserMention = {
  MENTION: "MENTION",
  USER_MENTION: "USER_MENTION"
}
const Space = ({name = Name(""), displayName = DisplayName(""), type = SpaceType.ROOM}) => {
  return {name, displayName, type}
}
const AddedToSpace = ({eventTime = Date(), space = Space({}), user = User({})}) => {
  return {eventTime, space, user}
}
const RemovedFromSpace = ({eventTime = Date(), space = Space({}), user = User({})}) => {
  return {eventTime, space, user}
}
const EventTime = (time = "") => {
  return Date(time)
}
const CreateTime = (time = "") => {
  return Date(time)
}
const User = ({name = Name(""), displayName = DisplayName(""), avatarUrl = AvatarUrl(""), email = Email(""), type = UserType.USER}) => {
  return {name, displayName, avatarUrl, email, type}
}
const Email = (email = "") => {
  return email
}
const Name = (name = "") => {
  return name
}
const DisplayName = (name = "") => {
  return name
}
const AvatarUrl = (avatarUrl = "") => {
  return avatarUrl
}

const ChatMessage = ({type = MessageType.MESSAGE, eventTime = EventTime(""), space = Space({}), message = Message({}), user = User({})}) => {
  return {type, eventTime, space, message, user}
}

const Message = ({name = Name(""), sender = User({}), createTime = CreateTime(""), text = TextMessage(""),
  argumentText = TextMessage(""), thread = Thread({}), annotations = [Annotation({})]}) => {

  return {name, sender, createTime, text, argumentText, thread, annotations}
}
const TextMessage = (text = "") => {
  return text
}
const Thread = ({name = Name("")}) => {
  return {name}
}

const Annotation = ({userMention = UserMentioned({}), type = UserMention.USER_MENTION, length = 0, startIndex = 0}) => {
  return {userMention, type, length, startIndex}
}
const UserMentioned = ({user = User({}), type = UserMention.USER_MENTION}) => {
  return {user, type}
}

export {
  GoogleChat,
  SpaceType,
  MessageType,
  EventTime,
  Space,
  Name,
  DisplayName,
  Email,
  UserType,
  User,
  AvatarUrl,
  Message,
  ChatMessage,
  AddedToSpace,
  RemovedFromSpace,
  UserMention,
  UserMentioned,
  Annotation,
  CreateTime,
  TextMessage,
  Thread
}
