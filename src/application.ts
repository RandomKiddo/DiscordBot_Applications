/**
application.ts
Copyright 2021 RandomKiddo

This work is licensed under the Open Software License 3.0
As defined by this license, this work may be used commercially or privately,
modified, and distributed as specified by the license.
This license also comes with terms and conditions applied to it when,
dealing with modified and distributed derivative works.
For more information, see: https://opensource.org/licenses/OSL-3.0

The current maintainer of this work is RandomKiddo
This work only consists of source code files, written in:
python, javascript, typescript, go, java, c#
*/

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