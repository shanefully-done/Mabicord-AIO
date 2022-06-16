/**
 * @file Default Error Message On Error Select Menu Interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description Executes when the select menu interaction could not be fetched.
	 * @author Naman Vrati
	 * @param {import('discord.js').SelectMenuInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "해당 선택 메뉴를 실행하는데에 에러가 발생했습니다!",
			ephemeral: true,
		})
		return
	},
}
