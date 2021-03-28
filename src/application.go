/**
application.go
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

import (
	"github.com/bwmarrin/discordgo"
	"fmt"
	"flag"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	discord, err := discordgo.New("Bot " + "YOUR_TOKEN_HERE")
	if err != nil {
		fmt.Println(err)
		return
	}
	discord.AddHandler(messageCreate)
	discord.Identify.Intents = discordgo.IntentsGuildMessages
	err = discord.Open()
	if err != nil {
		fmt.Println(err)
		return;
	}
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill))
	<-sc
	discord.Close()
}

func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}
	if m.Content == "!ping" {
		s.ChannelMessageSend(m.ChannelID, "Pong!")
	}
}