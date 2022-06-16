/**
 * @file Slash Command Interaction Handler
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import("discord.js").CommandInteraction} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isCommand()) return

		const command = client.slashCommands.get(interaction.commandName)

		// If the interaction is not a command in cache.

		if (!command) return

		// A try to executes the interaction.

		try {
			await command.execute(interaction)
		} catch (err) {
			console.error(err)
			await interaction.reply({
				content: "해당 명령어를 실행하는데에 에러가 발생했습니다.",
				ephemeral: true,
			})
		}
	},
}
