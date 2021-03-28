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