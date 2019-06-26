
import Tap from "tap"
import {MessageType, SpaceType, AddedToSpace, EventTime, Space, Name, TextMessage, DisplayName,
    User, UserMentioned, UserMention, AvatarUrl, Annotation, Email, RemovedFromSpace, CreateTime,
    ChatMessage, Message, Thread, UserType} from "../lib/GoogleChat.mjs"


Tap.test("", t => {
    const a = AddedToSpace({
        eventTime: EventTime("2017-03-02T19:02:59.910959Z"),
        space: Space({
            name: Name("spaces/AAAAAAAAAAA"),
            displayName: DisplayName("Chuck Norris Discussion Room"),
            type: SpaceType.ROOM
        }),
        user: User({name: Name("users/12345678901234567890"),
            displayName: DisplayName("Chuck Norris"),
            avatarUrl: AvatarUrl("https://lh3.googleusercontent.com/.../photo.jpg"),
            email: Email("chuck@example.com")
        })
    })

    const addToSpace = {
        "type": "ADDED_TO_SPACE",
        "eventTime": "2017-03-02T19:02:59.910959Z",
        "space": {
            "name": "spaces/AAAAAAAAAAA",
            "displayName": "Chuck Norris Discussion Room",
            "type": "ROOM"
        },
        "user": {
            "name": "users/12345678901234567890",
            "displayName": "Chuck Norris",
            "avatarUrl": "https://lh3.googleusercontent.com/.../photo.jpg",
            "email": "chuck@example.com"
        }
    }
    t.equal(addToSpace.space.name, a.space.name, "Space should be equal")

    const rfs = RemovedFromSpace({
        eventTime: EventTime("2017-03-02T19:02:59.910959Z"),
        space: Space({
            name: Name("spaces/AAAAAAAAAAA"),
            type: SpaceType.DM
        }),
        user: User({
            name: Name("users/12345678901234567890"),
            displayName: DisplayName("Chuck Norris"),
            email: Email("chuck@example.com")
        }),
        createTime: CreateTime()
    })

    const removedFromSpace = {
        "type": "REMOVED_FROM_SPACE",
        "eventTime": "2017-03-02T19:02:59.910959Z",
        "space": {
            "name": "spaces/AAAAAAAAAAA",
            "type": "DM"
        },
        "user": {
            "name": "users/12345678901234567890",
            "displayName": "Chuck Norris",
            "avatarUrl": "https://lh3.googleusercontent.com/.../photo.jpg",
            "email": "chuck@example.com"
        }
    }

    t.equal(removedFromSpace.user.name, rfs.user.name, "User names should be equal")

    const m = ChatMessage({
        type: MessageType.MESSAGE,
        eventTime: EventTime("2017-03-02T19:02:59.910959Z"),
        space: Space({
            name: Name("spaces/AAAAAAAAAAA"),
                displayName: DisplayName("Chuck Norris Discussion Room"), type: SpaceType.ROOM
            }),
        message: Message({
            name: Name("spaces/AAAAAAAAAAA/messages/CCCCCCCCCCC"),
            sender: User({name: Name("users/12345678901234567890"),
                    displayName: DisplayName("Chuck Norris"),
                    avatarUrl: AvatarUrl("https://lh3.googleusercontent.com/.../photo.jpg"),
                    email: Email("chuck@example.com")
                }),
            createTime: CreateTime("2017-03-02T19:02:59.910959Z"),
            text: TextMessage("@TestBot Violence is my last option."),
            argumentText: TextMessage(" Violence is my last option."),
            thread: Thread({name: Name("spaces/AAAAAAAAAAA/threads/BBBBBBBBBBB")}),
            annotations: [
                Annotation({
                    length: 8,
                    startIndex: 0,
                    userMention: UserMentioned({
                        user: User({
                            name: Name("users/1234567890987654321"),
                            displayName: DisplayName("TestBot"),
                            avatarUrl: AvatarUrl("https://lh3.googleusercontent.com/.../photo.jpg"),
                            type: UserType.BOT
                        }),
                        type: UserMention.MENTION
                    }),
                    type: UserMention.USER_MENTION
                })
            ]
        }),
        user: User({
            name: Name("users/12345678901234567890"),
            displayName: DisplayName("Chuck Norris"),
            avatarUrl: AvatarUrl("https://lh3.googleusercontent.com/.../photo.jpg"),
            email: Email("chuck@example.com")})
        }
    )

    const someMessage = {
        "type": "MESSAGE",
        "eventTime": "2017-03-02T19:02:59.910959Z",
        "space": {
            "name": "spaces/AAAAAAAAAAA",
            "displayName": "Chuck Norris Discussion Room",
            "type": "ROOM"
        },
        "message": {
            "name": "spaces/AAAAAAAAAAA/messages/CCCCCCCCCCC",
            "sender": {
                "name": "users/12345678901234567890",
                "displayName": "Chuck Norris",
                "avatarUrl": "https://lh3.googleusercontent.com/.../photo.jpg",
                "email": "chuck@example.com"
            },
            "createTime": "2017-03-02T19:02:59.910959Z",
            "text": "@TestBot Violence is my last option.",
            "argumentText": " Violence is my last option.",
            "thread": {
                "name": "spaces/AAAAAAAAAAA/threads/BBBBBBBBBBB"
            },
            "annotations": [{
                "length": 8,
                "startIndex": 0,
                "userMention": {
                    "type": "MENTION",
                    "user": {
                        "avatarUrl": "https://.../avatar.png",
                        "displayName": "TestBot",
                        "name": "users/1234567890987654321",
                        "type": "BOT"
                    }
                },
                "type": "USER_MENTION"
            }],
        },
        "user": {
            "name": "users/12345678901234567890",
            "displayName": "Chuck Norris",
            "avatarUrl": "https://lh3.googleusercontent.com/.../photo.jpg",
            "email": "chuck@example.com"
        }
    }
    t.equal(someMessage.message.annotations[0].userMention.user.type, m.message.annotations[0].userMention.user.type, "User type from user mention in annontations should be equal")
    t.end()
})