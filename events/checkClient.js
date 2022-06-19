/**
 * @file Check Client
 * @author RedPen
 * @since 1.0.0
 * @version 1.1.0
 */

const { channel_log, owner } = require("./../config.json")

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		const cron = require("node-cron")
		const find = require("find-process")
		const channel = client.channels.cache.get(channel_log)

		console.log("Check Client started!")

		cron.schedule("5 * * * *", () => {
		console.log("Cron: Check client")
		find("name", "Client.exe", true).then(function (list) {
			if (list.length == 0) {
				console.log("Cron: Client is down!")
				return client.users
					.fetch(owner, false)
					.then((user) => {
						user.send("<@!" + owner + ">, client is down!").catch((error) => {
							console.error("Failed to send error message via DM")
							channel.send("<@!" + owner + ">, client is down! (Failed to send this message via DM)")
						})
					})
					
			}
		})
		})
	},
}
