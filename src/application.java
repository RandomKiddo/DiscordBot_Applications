/**
application.java
Copyright 2021 RandomKiddo

This work is licensed under the Open Software License 3.0
As defined by this license, this work may be used commercially or privately,
modified, and distributed as specified by the license.
This license also comes with terms and conditions applied to it when,
dealing with modified and distributed derivative works.
For more information, see: https://opensource.org/licenses/OSL-3.0

The current maintainer of this work is RandomKiddo
This work only consists of source code files, written in:
python, javascript, typescript, go, or java
*/

import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDABuilder;

import javax.security.auth.login.LoginException;

public class Main extends ListenerAdapter {
    private final String PREFIX = "!";
    public static void main(String[] args) throws LoginException {
        JDABuilder builder = new JDABuilder(AccountType.BOT);
        final String TOKEN = "YOUR_TOKEN_HERE";
        builder.setToken(TOKEN);
        builder.addEventListener(new Main());
        builder.buildAsync();
    }
    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        String content = event.getMessage().getContentRaw();
        if (event.getAuthor().isBot() || !content.contains(PREFIX)) {
            return;
        }
        if (content.toLowerCase().contains("ping")) {
            ping(event);
        }
    }
    public void ping(MessageReceivedEvent event) {
        event.getChannel().sendMessage("Pong!").queue();
    }
}