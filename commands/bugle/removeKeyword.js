/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

const { channel_command, language } = require("./../../config.json")
const lang = require("./../../lang/" + language + ".json")

module.exports = {
	name: "삭제",

	/** You need to uncomment below properties if you need them. */
	description: lang.removeDesc,
	usage: lang.removeExample,
	cooldown: 1,
	aliases: ["제거", "-", "remove", "delete", "rm"],
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
			var removeSuccess = false
			var fs = require("fs")
			var oldKeyword = []
			var user = message.author.id

			// Read old keyword JSON
			const data = fs.readFileSync("./commands/bugle/keywordDB.json", "utf8")
			oldKeyword = JSON.parse(data)

			if (Object.keys(oldKeyword).filter((user) => user == message.author.id) == user) {
				for (let i = 0; i < oldKeyword[user].length; i++) {
					if (oldKeyword[user][i] == args[0]) {
						oldKeyword[user].splice(i, 1)
						removeSuccess = true
					}
				}
			}

			if (removeSuccess == true) {
				try {
					// Write appended keyword list to JSON
					fs.writeFileSync("./commands/bugle/keywordDB.json", JSON.stringify(oldKeyword))
					message.reply({
						content: args[0] + lang.removeSuccess,
					})
				} catch (err) {
					console.error(err)
				}
			} else if (removeSuccess == false) {
				message.reply({ content: lang.removeUndefined })
			}
		}
	},
}
