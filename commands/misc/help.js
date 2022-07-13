/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

// Deconstructing prefix from config file to use in help command
const { prefix, language } = require("./../../config.json")
const lang = require("./../../lang/" + language + ".json")

// Deconstructing MessageEmbed to create embeds within this command
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: lang.help,
	description: lang.helpDesc,
	aliases: ["help", "commands", "manual", "도움", "명령어", "사용법"],
	usage: lang.helpUsage1,
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client

		// If there are no args, it means it needs whole help command.

		if (!args.length) {
			/**
			 * @type {MessageEmbed}
			 * @description Help command embed object
			 */

			let helpEmbed = new MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle("모든 명령어")
				.setDescription("`" + commands.map((command) => command.name).join("`, `") + "`")

				.addField(
					lang.usage,
					`\n\`${prefix}\`` +
						lang.help +
						" " +
						lang.helpUsage2
				)

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "DM") return

					// On validation, reply back.

					message.reply({
						content: lang.helpSent,
					})
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(`${message.author.tag}\n` + lang.helpDMFail, error)

					message.reply({ content: lang.helpDMFail2 })
				})
		}

		// If argument is provided, check if it's a command.

		/**
		 * @type {String}
		 * @description First argument in lower case
		 */

		const name = args[0].toLowerCase()

		const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name))

		// If it's an invalid command.

		if (!command) {
			return message.reply({ content: langinvalidCommand })
		}

		/**
		 * @type {MessageEmbed}
		 * @description Embed of Help command for a specific command.
		 */

		let commandEmbed = new MessageEmbed().setColor(0x4286f4).setTitle(lang.helpCommand)

		if (command.description) commandEmbed.setDescription(`${command.description}`)

		if (command.aliases)
			commandEmbed
				.addField(lang.alias, `\`${command.aliases.join(", ")}\``, true)
				.addField(lang.cooldown, `${command.cooldown || 3}` + lang.seconds, true)
		if (command.usage) commandEmbed.addField(lang.usage, `\`${prefix}${command.name} ${command.usage}\``, true)

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] })
	},
}
