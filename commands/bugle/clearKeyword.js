/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

module.exports = {
	name: "초기화",

	/** You need to uncomment below properties if you need them. */
	description: "등록한 모든 뿔피리 알림 키워드를 삭제합니다.",
	usage: "!초기화",
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
				message.reply({ content: "키워드 알림을 초기화 했습니다." })
			} catch (err) {
				console.error(err)
			}
		} else {
			message.reply({ content: "초기화 실패! 등록된 키워드가 없습니다." })
		}
	},
}
