/**
 * @file Check Client
 * @author RedPen
 * @since 1.0.0
 * @version 1.1.0
 */

const tcpPing = require("tcp-ping")
const cron = require("node-cron")
const fs = require("fs")
const { server_ip, server_port, channel_log } = require("../config.json")

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		const channel = client.channels.cache.get(channel_log)

		tcpPing.probe(server_ip, server_port, function (err, available) {
			cron.schedule("0 */1 * * * *", () => {
				// Read last server status
				const lastStatus = JSON.parse(fs.readFileSync("./events/checkServer.json", "utf8")).status
				const obj = { status: available }

				// When server is up, it returns true.
				if (available == true && lastStatus == false) {
					console.log("Login server is up!")
					fs.writeFileSync("./events/checkServer.json", JSON.stringify(obj))
					channel.send(">>> **로그인 서버가 열렸습니다!**")
				} else if (available == false && lastStatus == true) {
					console.log("Login server is down!")
					fs.writeFileSync("./events/checkServer.json", JSON.stringify(obj))
					channel.send(">>> **로그인 서버가 닫혔습니다!**")
				} else {
					console.log("available: %s", available)
					console.log("lastStatus: %s", lastStatus)
				}
			})
		})
	},
}
