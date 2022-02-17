const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class HmtaiCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hm",
      usage: "hm <type> <category>",
      description: "Sends random Hentai image",
      type: client.types.FUN,
      examples: ["hm neko"],
    });
  }
  async run(message, args) {
    try {
      const res = await fetch(
        `https://cdn.dergoogler.com/others/hentai-web/images/${args[0]}.json`
      );
      const img = await res.json();
      const embed = new MessageEmbed()
        .setTitle(args[0])
        .setImage(img[Math.floor(Math.random() * img.length)])
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      if (message.channel.nsfw) {
        message.channel.send(embed);
      } else {
        message.channel.send(`This is not an NSFW channel`);
      }
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, "Please try again in a few seconds", err.message);
    }
  }
};
