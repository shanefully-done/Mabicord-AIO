/**
 * @file Check Client
 * @author RedPen
 * @since 1.0.0
 * @version 1.1.2
 */

const fs = require("fs")
const { channel_log, owner, language } = require("./../config.json")
const lang = require("./../lang/" + language + ".json")

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

		console.log(lang.checkClient)

		cron.schedule("0 */5 * * * *", () => {
			const serverStatus = JSON.parse(fs.readFileSync("./events/checkServer.json", "utf8")).status
			if (serverStatus == true) {
				console.log(lang.checkClientCron)
				find("name", "Client.exe", true).then(function (list) {
					if (list.length == 0) {
						console.log(lang.checkClientDown)
						return client.users.fetch(owner, false).then((user) => {
							user.send("<@!" + owner + ">, " + lang.checkClientDM).catch((error) => {
								console.error(lang.checkClientDMFail)
								channel.send("<@!" + owner + ">, " + lang.checkClientDMFailSend)
							})
						})
					}
				})
			}
		})
	},
}
