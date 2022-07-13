/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

const { channel_command, language } = require("./../../config.json")
const lang = require("./../../lang/" + language + ".json")

module.exports = {
	name: "초기화",

	/** You need to uncomment below properties if you need them. */
	description: lang.clearDesc,
	usage: lang.clearExample,
	cooldown: 5,
	aliases: ["리셋", "reset"],
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
			var oldKeyword = []
			var user = message.author.id

			try {
				// Read old keyword JSON
				const data = fs.readFileSync("./commands/bugle/keywordDB.json", "utf8")
				oldKeyword = JSON.parse(data)
			} catch (err) {
				console.error(err)
			}

			if (oldKeyword[user] != undefined) {
				oldKeyword[user].length = 0
				try {
					// Write appended keyword list to JSON
					fs.writeFileSync("./commands/bugle/keywordDB.json", JSON.stringify(oldKeyword))
					message.reply({ content: lang.clearSuccess })
				} catch (err) {
					console.error(err)
				}
			} else {
				message.reply({ content: lang.clearFail })
			}
		}
	},
}
