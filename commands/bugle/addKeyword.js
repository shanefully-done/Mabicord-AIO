/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.1.0
 */

const { channel_command } = require("./../../config.json")

module.exports = {
	name: "추가",

	/** You need to uncomment below properties if you need them. */
	description: "뿔피리 알림 키워드를 등록합니다. 띄어쓰기로 구분하여 여러 개의 키워드를 등록할 수 있습니다.",
	usage: "!추가 알림받을키워드",
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
		if (message["channelId"] == channel_command) {
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
									content: newKeyword[user][i] + " 키워드가 이미 등록되어 있습니다.",
								})
								break
							} else if (
								newKeyword[user][i] == "undefined" ||
								newKeyword[user][i] == "NaN" ||
								newKeyword[user][i] == undefined ||
								newKeyword[user][i] == NaN
							) {
								dupeCheck = true
								message.reply({ content: "키워드 등록 실패 : undefined" })
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
						content: newKeyword[user].join(", ") + " 키워드를 알림 목록에 등록했습니다.",
					})
				}
			} else if (oldKeyword[user] == undefined) {
				oldKeyword[user] = newKeyword[user]
				fs.writeFileSync("./commands/bugle/keywordDB.json", JSON.stringify(oldKeyword))
				message.reply({
					content: newKeyword[user].join(", ") + " 키워드를 알림 목록에 등록했습니다.",
				})
			}
		}
	},
}
