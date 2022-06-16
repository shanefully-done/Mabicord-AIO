/**
 * @file Message Based Commands Handler
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

// Declares constants (destructured) to be used in this file.

const { Collection } = require("discord.js")
const { prefix, owner } = require("../config.json")

// Prefix regex, we will use to match in mention prefix.

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Naman Vrati
	 * @param {import("discord.js").Message} message The message which was created.
	 */

	async execute(message) {
		// Declares const to be used.

		const { client, guild, channel, content, author } = message

		// Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
		// You can change the behavior as per your liking at ./messages/onMention.js

		if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
			require("../messages/onMention").execute(message)
			return
		}

		/**
		 * @description Converts prefix to lowercase.
		 * @type {String}
		 */

		const checkPrefix = prefix.toLowerCase()

		/**
		 * @description Regex expression for mention prefix
		 */

		const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`)

		// Checks if message content in lower case starts with bot's mention.

		if (!prefixRegex.test(content.toLowerCase())) return

		/**
		 * @description Checks and returned matched prefix, either mention or prefix in config.
		 */

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex)

		/**
		 * @type {String[]}
		 * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
		 */

		const args = content.slice(matchedPrefix.length).trim().split(/ +/)

		/**
		 * @type {String}
		 * @description Name of the command received from first argument of the args array.
		 */

		const commandName = args.shift().toLowerCase()

		// Check if mesage does not starts with prefix, or message author is bot. If yes, return.

		if (!message.content.startsWith(matchedPrefix) || message.author.bot) return

		const command =
			client.commands.get(commandName) ||
			client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

		// It it's not a command, return :)

		if (!command) return

		// Owner Only Property, add in your command properties if true.

		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply({ content: "오너만 쓸 수 있는 명령어입니다." })
		}

		// Guild Only Property, add in your command properties if true.

		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply({
				content: "그 명령어는 DM에서 사용할 수 없습니다.",
			})
		}

		// Author perms property

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author)
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "권한이 없습니다." })
			}
		}

		// Args missing

		if (command.args && !args.length) {
			let reply = `변수가 없습니다, ${message.author}!`

			if (command.usage) {
				reply += `\n제대로 된 사용법은: \`${prefix}${command.name} ${command.usage}\``
			}

			return message.channel.send({ content: reply })
		}

		// Cooldowns

		const { cooldowns } = client

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection())
		}

		const now = Date.now()
		const timestamps = cooldowns.get(command.name)
		const cooldownAmount = (command.cooldown || 3) * 1000

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000
				return message.reply({
					content: `\`${command.name}\` 명령어를 사용하려면 ${timeLeft.toFixed(1)}초를 더 기다려주세요.`,
				})
			}
		}

		timestamps.set(message.author.id, now)
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

		// Rest your creativity is below.

		// execute the final command. Put everything above this.
		try {
			command.execute(message, args)
		} catch (error) {
			console.error(error)
			message.reply({
				content: "해당 명령어를 사용하는데에 에러가 발생했습니다.",
			})
		}
	},
}
