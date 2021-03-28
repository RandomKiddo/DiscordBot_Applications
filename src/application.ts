import {
    Discord,
    On,
    Client
} from "@typeit/discord";
import {
    Message
} from "discord.js";

@Discord
export class AppDiscord {
    private static _client: Client;
    private _prefix: string = "!";
    static start() {
        this._client = new Client();
        this._client.login(
            "YOUR_TOKEN_HERE",
            `$(__dirname}/*Discord.ts`
        );
    }
    @On("message")
    async onMessage(message: Message, client: Client) {
        if (AppDiscord._client.user.id !== message.author.id) {
            const cmd = message.content.replace(this._prefix, "").toLowerCase();
            switch (cmd) {
                case "ping":
                    message.channel.send("Pong!");
                    break;
                default:
                    break;
            }
        }
    }
}