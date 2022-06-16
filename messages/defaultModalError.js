/**
 * @file Default Error Message On Error Modal Interaction
 * @author Naman Vrati
 * @since 3.2.0
 */

module.exports = {
	/**
	 * @description Executes when the modal interaction could not be fetched.
	 * @author Naman Vrati
	 * @param {import('discord.js').ModalSubmitInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "해당 모달을 실행하는데에 에러가 발생했습니다!",
			ephemeral: true,
		})
		return
	},
}
