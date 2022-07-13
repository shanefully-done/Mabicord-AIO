const { device_address } = require("./config.json")
var Cap = require("cap").Cap
var decoders = require("cap").decoders
var PROTOCOL = decoders.PROTOCOL

var c = new Cap()
var device = Cap.findDevice(device_address)
var filter = "ip and tcp"
var bufSize = 10 * 1024 * 1024
var buffer = Buffer.alloc(65535)
var linkType = c.open(device, filter, bufSize, buffer)

c.setMinBytes && c.setMinBytes(0)

// Every time a packet is received, this function is called.
c.on("packet", function (nbytes, trunc) {
	if (linkType === "ETHERNET") {
		var ret = decoders.Ethernet(buffer)

		if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
			ret = decoders.IPV4(buffer, ret.offset)
			let sourceIP = ret.info.srcaddr

			if (ret.info.protocol === PROTOCOL.IP.TCP) {
				var datalen = ret.info.totallen - ret.hdrlen
				ret = decoders.TCP(buffer, ret.offset)
				datalen -= ret.hdrlen
				rcvStr = buffer.toString("utf8", ret.offset, ret.offset + datalen)
				var bugleClean = rcvStr.substring(rcvStr.indexOf("<ALL_CHANNELS>")).slice(18, -15)
				var bugleNick = bugleClean.substring(0, bugleClean.indexOf(" : "))
				var bugleData = bugleClean.substring(bugleClean.indexOf(" : ") + 3)

				if (rcvStr.includes("<ALL_CHANNELS>")) {
					console.log("%s - %s: %s", sourceIP, bugleNick, bugleData)
				}
			} else if (ret.info.protocol === PROTOCOL.IP.UDP) {
				console.log("Received UDP")
			} else console.log("Unsupported IPv4 protocol: " + PROTOCOL.IP[ret.info.protocol])
		} else console.log("Unsupported Ethertype: " + PROTOCOL.ETHERNET[ret.info.type])
	}
})
