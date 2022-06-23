/**
 * @file Check Client
 * @author RedPen
 * @since 1.0.0
 * @version 1.1.0
 */

const cron = require("node-cron")
const fs = require("fs")
const fetch = require("node-fetch")
const { patch_url, channel_log, channel_alert, channel_raid } = require("../config.json")

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		const channel = client.channels.cache.get(channel_log)
		const channelAlert = client.channels.cache.get(channel_alert)
		const channelRaid = client.channels.cache.get(channel_raid)

		cron.schedule("0 */1 * * * *", () => {
			// Getting patch info
			fetch(patch_url)
				.then((response) => response.text())
				.then((data) => {
					let patchData = data.split("\r\n")
					let patchInfo = {}
					for (let i = 0; i < patchData.length; i++) {
						patchSplit = patchData[i].split("=")
						patchInfo[patchSplit[0]] = patchSplit[1]
					}

					// Current time
					let currDate = new Date()
					let year = currDate.getFullYear()
					let month = ("0" + (currDate.getMonth() + 1)).slice(-2)
					let date = ("0" + currDate.getDate()).slice(-2)
					let hours = ("0" + currDate.getHours()).slice(-2)
					let minutes = ("0" + currDate.getMinutes()).slice(-2)
					let seconds = ("0" + currDate.getSeconds()).slice(-2)
					let curr_dt = year + month + date + hours + minutes + seconds

					const lastStatus = JSON.parse(fs.readFileSync("./events/checkServer.json", "utf8")).status

					if (lastStatus == false && patchInfo.patch_accept == "1" && curr_dt > patchInfo.ed_dt) {
						console.log("Update server is up!")
						fs.writeFileSync("./events/checkServer.json", JSON.stringify({ status: true }))
						channel.send(">>> **패치 & 로그인 서버가 열렸습니다!**")
						channelAlert.send(">>> **패치 & 로그인 서버가 열렸습니다!**")
						channelRaid.send(">>> **패치 & 로그인 서버가 열렸습니다!**")
					} else if (lastStatus == true && (patchInfo.patch_accept == "0" || curr_dt < patchInfo.ed_dt)) {
						console.log("Update server is down!")
						fs.writeFileSync("./events/checkServer.json", JSON.stringify({ status: false }))
						channel.send(">>> **패치 & 로그인 서버가 닫혔습니다!**")
						channelAlert.send(">>> **패치 & 로그인 서버가 닫혔습니다!**")
						channelRaid.send(">>> **패치 & 로그인 서버가 닫혔습니다!**")
					}
				})
		})
	},
}
