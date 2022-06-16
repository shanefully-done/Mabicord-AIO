/**
 * @file Default Bot Mention Command
 * @author Naman Vrati
 * @since 3.0.0
 */

const { prefix } = require("../config.json")

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`안녕하세요 ${message.author}님! 제 명령 시작어는 \`${prefix}\`이고, 도움말은 \`${prefix}도움말\`을 통해 알아보실 수 있습니다!`
		)
	},
}
