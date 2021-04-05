/**
application.js
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

const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const PREFIX = '!';

// Writing To Files For Error Not Included In JS
client.on('ready', () => {
	client.user.setActivity('discord.js', { type: 'PLAYING' });
});

client.on('message', (msg) => {
	const m = msg.content.toString();
    if (!m.startsWith(PREFIX) || msg.author.bot) return;
	if (m.includes('ping')) {
		let api = client.ws.ping;
		let bot = Date.now() - messaeg.createdTimestamp;
		message.channel.send(`Pong! API: \`${api}ms\`, Bot: \`${bot}ms\``);
	} else if (m.includes('clear')) {
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(
                "You can\'t use this command"
            );
        }
        const args = message.content
            .toLowerCase()
            .slice(PREFIX.length)
            .trim()
            .split(/\s+/);
        const [command, input] = args;
        const amount = Number(input) > 100
            ? 101
            : Number(input) + 1;
        message.channel.bulkDelete(amount, true);
    }
});