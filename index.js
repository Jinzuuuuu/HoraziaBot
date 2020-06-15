//-----Discord.js-----
const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client()

//-----Connexion-----
bot.login(config.token)
bot.on("ready", async message => {
    console.log("Je suis prêt !")
bot.user.setPresence({ activity: { name: 'en dev ^^' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
})

//-----variable-----
let prefix = "?"

//-----message-----
bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "général");
    if(!channel) return;

    channel.send(`Bienvenue sur le serveur de test de Renji ${member} !`)
});

bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('?kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`${user.tag} à été kick avec succès!`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('Je ne peux pas kick cette personne!');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("Erreur!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("Vous devez mentionner quelqu'un!");
      }
    }
  });

