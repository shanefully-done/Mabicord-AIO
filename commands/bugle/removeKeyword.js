/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

module.exports = {
	name: "삭제",

	/** You need to uncomment below properties if you need them. */
	description: "등록한 뿔피리 알림 키워드를 삭제합니다. 한번에 하나의 키워드만 삭제 할 수 있습니다.",
	usage: "!삭제 키워드",
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
					content: args[0] + " 키워드를 알림 목록에서 삭제했습니다.",
				})
			} catch (err) {
				console.error(err)
			}
		} else if (removeSuccess == false) {
			message.reply({ content: "삭제할 키워드가 없습니다." })
		}
	},
}
