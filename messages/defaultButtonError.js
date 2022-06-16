/**
 * @file Default Error Message On Error Button Interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description Executes when the button interaction could not be fetched.
	 * @author Naman Vrati
	 * @param {import('discord.js').ButtonInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "해당 버튼을 실행하는데에 에러가 발생했습니다!",
			ephemeral: true,
		})
		return
	},
}
