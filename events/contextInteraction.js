/**
 * @file Context Interaction Handler
 * @author Krish Garg & Naman Vrati
 * @since 3.0.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').ContextMenuInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	execute: async (interaction) => {
		// Deconstructed client from interaction object.
		const { client } = interaction

		// Checks if the interaction is a context interaction (to prevent weird bugs)

		if (!interaction.isContextMenu()) return

		/**********************************************************************/

		// Checks if the interaction target was a user

		if (interaction.targetType === "USER") {
			const command = client.contextCommands.get("USER " + interaction.commandName)

			// A try to execute the interaction.

			try {
				await command.execute(interaction)
				return
			} catch (err) {
				console.error(err)
				await interaction.reply({
					content: "해당 컨텍스트 명령어를 실행하는데에 에러가 발생했습니다!",
					ephemeral: true,
				})
				return
			}
		}
		// Checks if the interaction target was a user
		else if (interaction.targetType === "MESSAGE") {
			const command = client.contextCommands.get("MESSAGE " + interaction.commandName)

			// A try to execute the interaction.

			try {
				await command.execute(interaction)
				return
			} catch (err) {
				console.error(err)
				await interaction.reply({
					content: "해당 컨텍스트 명령어를 실행하는데에 에러가 발생했습니다!",
					ephemeral: true,
				})
				return
			}
		}

		// Practically not possible, but we are still caching the bug.
		// Possible Fix is a restart!
		else {
			return console.log("뭔가 이상합니다. 모르는 종류의 컨텍스트 메뉴를 받았습니다.")
		}
	},
}
