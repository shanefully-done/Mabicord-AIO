/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

// Deconstructing prefix from config file to use in help command
const { prefix } = require("./../../config.json")

// Deconstructing MessageEmbed to create embeds within this command
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "도움말",
	description: "모든 명령어를 보거나 특정 명령어의 사용법을 볼 수 있습니다.",
	aliases: ["help", "commands", "manual", "도움", "명령어", "사용법"],
	usage: "[command name]",
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
					"사용법",
					`\n\`${prefix}도움말 [command name]\` 명령어를 사용하여 특정 명령어의 사용법을 볼 수 있습니다.`
				)

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "DM") return

					// On validation, reply back.

					message.reply({
						content: "모든 명령어를 DM으로 보냈습니다.",
					})
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(`${message.author.tag}에게 도움말 DM을 보내는데에 실패했습니다.\n`, error)

					message.reply({ content: "이런! DM을 보낼 수 없습니다!" })
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
			return message.reply({ content: "유효한 명령어가 아닙니다!" })
		}

		/**
		 * @type {MessageEmbed}
		 * @description Embed of Help command for a specific command.
		 */

		let commandEmbed = new MessageEmbed().setColor(0x4286f4).setTitle("명령어 도움말")

		if (command.description) commandEmbed.setDescription(`${command.description}`)

		if (command.aliases)
			commandEmbed
				.addField("대체명령어", `\`${command.aliases.join(", ")}\``, true)
				.addField("쿨타임", `${command.cooldown || 3} 초`, true)
		if (command.usage) commandEmbed.addField("사용법", `\`${prefix}${command.name} ${command.usage}\``, true)

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] })
	},
}
