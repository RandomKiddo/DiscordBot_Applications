import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDABuilder;

import javax.security.auth.login.LoginException;

public class Main extends ListenerAdapter {
    public static void main(String[] args) throws LoginException {
        JDABuilder builder = new JDABuilder(AccountType.BOT);
        final String TOKEN = "YOUR_TOKEN_HERE";
        builder.setToken(TOKEN);
        builder.addEventListener(new Main());
        builder.buildAsync();
    }
    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        if (event.getAuthor().isBot()) {
            return;
        }
        if (event.getMessage().getContentRaw().equals("!ping")) {
            long time = System.currentTimeMillis();
            String response = String.format("Pong: %dms", time);
            event.getChannel().sendMessage(response).queue();
        }
    }
}