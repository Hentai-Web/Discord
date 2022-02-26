const Command = require("../Command.js");
const ReactionMenu = require("../ReactionMenu.js");
const { MessageEmbed } = require("discord.js");

module.exports = class RolesCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roles",
      usage: "roles",
      description: "Displays a list of all current roles.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const roles = [];
    message.guild.roles.cache.forEach((role) => roles.push(`${role.name}`));

    const embed = new MessageEmbed()
      .setTitle(`Role List [${message.guild.emojis.cache.size}]`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const interval = 25;
    if (roles.length === 0) message.channel.send(embed.setDescription("No emojis found. 😢"));
    else if (roles.length <= interval) {
      const range = roles.length == 1 ? "[1]" : `[1 - ${roles.length}]`;
      message.channel.send(
        embed
          .setTitle(`Role List ${range}`)
          .setDescription(roles.join("\n"))
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
      );

      // Reaction Menu
    } else {
      embed
        .setTitle("Role List")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          "Expires after two minutes.\n" + message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, roles, interval);
    }
  }
};
