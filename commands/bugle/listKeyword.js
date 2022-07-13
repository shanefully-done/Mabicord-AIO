/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

const { channel_command, language } = require("./../../config.json")
const lang = require("./../../lang/" + language + ".json")

module.exports = {
	name: "목록",

	/** You need to uncomment below properties if you need them. */
	description: lang.listDesc,
	usage: lang.listExample,
	cooldown: 5,
	aliases: ["리스트", "list", "ls", "l"],
	permissions: "SEND_MESSAGES",
	guildOnly: true,

	/**
	 * @description Executes when the command is called by command handler.
	 * @author RedPen
	 * @param {import("discord.js").Message} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	execute(message, args) {
		if (channel_command == "ANY" || channel_command == message["channelId"]) {
			var fs = require("fs")

			var messageCombine = ""
			var listKeyword = []
			var user = message.author.id

			try {
				// Read old keyword JSON
				const data = fs.readFileSync("./commands/bugle/keywordDB.json", "utf8")
				listKeyword = JSON.parse(data)
			} catch (err) {
				console.error(err)
			}

			if (listKeyword[user] != undefined) {
				message.reply({ content: listKeyword[user].join(", ") })
			} else {
				message.reply({ content: lang.listEmpty })
			}
		}
	},
}
