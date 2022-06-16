/**
 * @file Bugle Logger
 * @author RedPen
 * @since 1.0.0
 */

const {
	channel_log,
	channel_alert,
	channel_raid,
	role_raid,
	device_address,
	cap_filter,
} = require("./../config.json")

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {import("discord.js").Client} client Main Application Client
	 * @param {import("discord.js").Guild} guild The Guild Object of the command.
	 */
	execute(client, guild) {
		console.log("Bugle Logger started!")
		var Cap = require("cap").Cap
		var decoders = require("cap").decoders
		var PROTOCOL = decoders.PROTOCOL
		var fs = require("fs")
		const channel = client.channels.cache.get(channel_log)
		const channelAlert = client.channels.cache.get(channel_alert)
		const channelRaid = client.channels.cache.get(channel_raid)

		var c = new Cap()
		var device = Cap.findDevice(device_address)
		var filter = cap_filter
		var bufSize = 10 * 1024 * 1024
		var buffer = Buffer.alloc(65535)
		var linkType = c.open(device, filter, bufSize, buffer)

		c.setMinBytes && c.setMinBytes(0)

		c.on("packet", function (nbytes, trunc) {
			if (linkType === "ETHERNET") {
				var ret = decoders.Ethernet(buffer)

				if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
					ret = decoders.IPV4(buffer, ret.offset)

					if (ret.info.protocol === PROTOCOL.IP.TCP) {
						var datalen = ret.info.totallen - ret.hdrlen
						ret = decoders.TCP(buffer, ret.offset)
						datalen -= ret.hdrlen
						rcvStr = buffer.toString("utf8", ret.offset, ret.offset + datalen)
						var bugleClean = rcvStr.substring(rcvStr.indexOf("<ALL_CHANNELS>")).slice(18, -15)
						var bugleNick = bugleClean.substring(0, bugleClean.indexOf(" : "))
						var bugleData = bugleClean.substring(bugleClean.indexOf(" : ") + 3)
						var fieldRaid = rcvStr.substring(rcvStr.indexOf("[채널12]")).slice(7, -11)

						if (rcvStr.includes("<ALL_CHANNELS>")) {
							if (bugleData == "NaN" || bugleData == "undefined" || bugleData == NaN || bugleData == undefined) {
								return
							}

							// Current time
							let currDate = new Date()
							let hours = ("0" + currDate.getHours()).slice(-2)
							let minutes = ("0" + currDate.getMinutes()).slice(-2)
							let seconds = ("0" + currDate.getSeconds()).slice(-2)

							// console.log(bugleNick + " : " + bugleData)

							channel.send(
								"```css\n[" + hours + ":" + minutes + ":" + seconds + "] " + bugleNick + " : " + bugleData + "\n```"
							)

							// Process user keywords
							const keywordDB = JSON.parse(fs.readFileSync("./commands/bugle/keywordDB.json", "utf8"))
							var messageQueue = ""
							for (let i = 0; i < Object.keys(keywordDB).length; i++) {
								// NOTE: Only continue if member is in the guild
								// This only works if member has sends a message since the start of the bot
								// as the guild member cache is not updated until the member sends a message
								// if (guild.users.cache.has(Object.keys(keywordDB)[i])) {
									for (let j = 0; j < Object.values(keywordDB)[i].length; j++) {
										if (bugleData.includes(Object.values(keywordDB)[i][j]) == true) {
											messageQueue +=
												"```css\n[" +
												hours +
												":" +
												minutes +
												":" +
												seconds +
												"] " +
												bugleNick +
												" : " +
												bugleData +
												"\n```\n<@!" +
												Object.keys(keywordDB)[i] +
												"> - " +
												Object.values(keywordDB)[i][j] +
												"\n\n"
										}
									}
								// }
							}
							if (messageQueue.length != 0) {
								channelAlert.send(messageQueue)
							}
						}

						// Raid alert
						if (rcvStr.includes("[채널12]")) {
							if (fieldRaid == "NaN" || fieldRaid == "undefined" || fieldRaid == NaN || fieldRaid == undefined) {
								return
							}

							// Current time
							let currDate = new Date()
							let hours = ("0" + currDate.getHours()).slice(-2)
							let minutes = ("0" + currDate.getMinutes()).slice(-2)
							let seconds = ("0" + currDate.getSeconds()).slice(-2)

							// console.log(fieldRaid)
							channelRaid.send(
								"```css\n[" +
									hours +
									":" +
									minutes +
									":" +
									seconds +
									"] " +
									fieldRaid +
									"\n```" +
									"<@&" +
									role_raid +
									">"
							)
						}
					} else if (ret.info.protocol === PROTOCOL.IP.UDP) {
						console.log("Received UDP")
					} else console.log("Unsupported IPv4 protocol: " + PROTOCOL.IP[ret.info.protocol])
				} else console.log("Unsupported Ethertype: " + PROTOCOL.ETHERNET[ret.info.type])
			}
		})
	},
}
