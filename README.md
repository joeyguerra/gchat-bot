Pipbot
=================================================

![Pip Boy on the Beach](assets/pipboyhavingadrink.png)

Pip boy is the name of the arm computer in the video game Fallout that you use to handle your inventory, quests and maps. It's the inspiration for `pipbot`. A Google chat bot that you can use to handle your [enter anything here]. It's built on the NodeJS platform in Javascript.

Setup
=================================================

You need a Google Service Account. Google has some documentation on how to setup a Bot. [Publishing bots](https://developers.google.com/hangouts/chat/how-tos/bots-publish)

The outcome of that is a `.json` file. Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable with the path to the credentials file that you downloaded when creating the Bot. I called it `chatbot.json` and in a file called `.env`, I set the environment variable like the following.

```bash
GOOGLE_APPLICATION_CREDENTIALS="chatbot.json"
```
I ran this on [Glitch](https://glitch.com/) to have a publicly accessible URL for Google Chat to call. So, after setting this code up on [Glitch](https://glitch.com/) and setting the `CHATBOT_URI` environment variable with the URI I specified when configuring the chat bot on Google, I added a `console.log(req.headers)` to `server.mjs` in the `server.post` handler for the `CHATBOT_URI` and sent a message to the bot from Hangouts Chat in order to copy and paste the `BEARER` token that Hangouts Chat service sends as part of the request to the chat bot, as an environment variable. The code decrypts that token and "checks it" in order to validate that the request is legitimately coming from Hangouts Chat.

Once you've got those environment variables defined in the `.env` file (on Glitch, that file isn't shared with others), then you should be good to go.


Run on Dev Environment
=================================================

Need to have a `.env` file with the environment variables and set them when running `npm start`.

```bash
sh -ac '. .env;PORT=3000 npm start'
```

The assumption here is that in production, the hosting environment will have a way to set those environment variables.

Handy Things
=================================================

The environment variables are stored in a `.env` file locally on my machine. I use this command to get them into a line so that I can set them in one go.

```bash
echo $(grep -v '^#' .env | xargs -0)
```