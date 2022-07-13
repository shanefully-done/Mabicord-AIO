/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.1.0
 */

const { channel_command, language } = require("./../../config.json")
const lang = require("./../../lang/" + language + ".json")

module.exports = {
	name: "추가",

	/** You need to uncomment below properties if you need them. */
	description: lang.addDesc,
	usage: lang.addExample,
	cooldown: 1,
	aliases: ["등록", "+", "add", "touch", "make"],
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
			var dupeCheck = false
			var user = message.author.id
			var oldKeyword = []
			var newKeyword = {}

			newKeyword[user] = []
			for (i = 0; i < args.length; i++) {
				newKeyword[user].push(args[i])
			}

			try {
				// Read old keyword JSON
				const data = fs.readFileSync("./commands/bugle/keywordDB.json", "utf8")
				oldKeyword = JSON.parse(data)
			} catch (err) {
				console.error(err)
			}

			if (oldKeyword[user] != undefined) {
				for (let j = 0; j < oldKeyword[user].length; j++) {
					if (dupeCheck == true) {
						break
					} else {
						for (let i = 0; i < newKeyword[user].length; i++) {
							if (oldKeyword[user][j] == newKeyword[user][i]) {
								dupeCheck = true
								message.reply({
									content: newKeyword[user][i] + lang.addExists,
								})
								break
							} else if (
								newKeyword[user][i] == "undefined" ||
								newKeyword[user][i] == "NaN" ||
								newKeyword[user][i] == undefined ||
								newKeyword[user][i] == NaN
							) {
								dupeCheck = true
								message.reply({ content: lang.addUndefined })
								break
							} else {
								dupeCheck = false
							}
						}
					}
				}
				if (dupeCheck == false) {
					for (let i = 0; i < newKeyword[user].length; i++) {
						oldKeyword[user].push(newKeyword[user][i])
					}
					fs.writeFileSync("./commands/bugle/keywordDB.json", JSON.stringify(oldKeyword))
					message.reply({
						content: newKeyword[user].join(", ") + lang.addSuccess,
					})
				}
			} else if (oldKeyword[user] == undefined) {
				oldKeyword[user] = newKeyword[user]
				fs.writeFileSync("./commands/bugle/keywordDB.json", JSON.stringify(oldKeyword))
				message.reply({
					content: newKeyword[user].join(", ") + lang.addSuccess,
				})
			}
		}
	},
}
