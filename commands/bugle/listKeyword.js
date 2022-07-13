/**
 * @file Bugle Keyword System
 * @author RedPen
 * @since 1.0.0
 */

const { channel_command } = require("./../../config.json")

module.exports = {
	name: "목록",

	/** You need to uncomment below properties if you need them. */
	description: "등록한 모든 뿔피리 알림 키워드를 보여줍니다.",
	usage: "!목록",
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
				message.reply({ content: "등록된 키워드가 없습니다." })
			}
		}
	},
}
