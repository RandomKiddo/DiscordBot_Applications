'''
application.py
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
'''

import discord
from discord.ext import commands
import datetime

TOKEN = 'YOUR_TOKEN_HERE'

client = commands.Bot(command_prefix = '!', intents = discord.Intents.all()) # unnecessary declaration for implementation

# Events

@client.event
async def on_ready():
    await client.change_presence(activity = discord.Game(name = 'discord.py'))
    with open('errlog.txt', 'w') as file:
        file.truncate()
    file.close()

@client.event
async def on_message(message):
    await client.process_commands(message)

@client.event
async def on_error(event, *args, **kwargs):
    with open('errlog.txt', 'a') as file:
        file.writeline(str(event))
        file.writeline(str(args))
        file.writeline(str(kwargs))
    file.close()

async def errmsg(ctx, description):
    embed = discord.Embed(
        title = 'An Error Was Encountered',
        description = description,
        colour = discord.Colour.red()
    )
    await ctx.send(embed=embed)

# Commands

@client.command()
async def ping(ctx):
    api = int((round(client.latency, 3)) * 1000)
    bot = str(datetime.datetime.now() - ctx.message.created_at)
    bot = bot[9:11]
    bot = str(bot).rstrip(':')
    await ctx.send('Pong! API: `{}ms`, Bot: `{}ms`'.format(api, bot))

@client.command()
async def lock(ctx, amount=1, eta='UNKNOWN'):
    if not ctx.author.guild_permissions.administrator or ctx.author.voice.channel is None:
        await errmsg(ctx, description='You Need Admin Permissions For This')
        return
    await ctx.author.voice.channel.edit(
        name = ctx.author.voice.channel.name + ' (LOCKED ETA_{})'.format(eta),
        user_limit = amount
    )

@client.command()
async def unlock(ctx):
    if not ctx.author.guild_permissions.administrator or ctx.author.voice.channel is None:
        await errmsg(ctx, description='You Need Admin Permissions For This')
        return
    await ctx.author.voice.channel.edit(
        name = channel.name[:channel.name.index('LOCKED')-2],
        user_limit = None
    )

@client.command()
async def poll(ctx, question, *args):
    if (len(args) > 9):
        await errmsg(ctx, description='Poll Can Only Have A Maximum Of 9 Options (For Emoji & Cleanliness Reasons')
        return
    embed = discord.Embed(
        title = str(question),
        description = 'React With The Appropriate Emoji(s) To Vote!',
        colour = discord.Colour.default()
    )
    emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
    index = 0
    for _ in args:
        embed.add_field(
            name = emojis[index],
            value = _,
            inline = False
        )
        index += 1
    embed.set_footer(text='Asked by: {}'.format(ctx.author.name))
    message = await ctx.channel.send(embed=embed)
    for _ in range(len(args)):
        await message.add_reaction(emojis[_])

client.run(TOKEN)
