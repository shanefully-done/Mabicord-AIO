# About

Mabicord AIO is a Discord bot that handles MMORPG Mabinogi's raid messages and bugle messages, designed to serve a single Discord server.

# Features

- Relay field raid event notifications to designated Discord channels.
- Relay horn bugle messages to designated Discord channels.
- Let users edit their own keywords. If a new horn bugle message has the keyword in it, send a notification to the user by mentioning him/her.
- Announce changes of server status to all channels.

# Installation

## Requirements

- Windows 10 (lower Windows versions are not tested)
- [npcap](https://npcap.com/)
- [node.js](https://nodejs.org/) 16.13.1 or higher

## Preparation

### Preparing Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. Create new application.
3. Under *Bot*, click *Add Bot*.
    1. Uncheck public bot if you plan to keep the bot in servers where you have permission to add bots.
4. Click *Reset Token*. Take note of this randomised string.
5. Under *OAuth2 → URL Generator*:
    1. Check *bot* and *applications.commands* scopes.
    2. Under *bot permissions*, check *administrator* or if you want to keep the permissions minimal:
        1. Read Messages/View Channels
        2. Send Messages
        3. Embed Links
        4. Read Message History
        5. Mention Everyone
        6. Add Reactions
        7. Use Slash Commands
    3. Take note of the *generated URL*, this is the link you use to add bot to your server.

### Enable Discord Developer Mode

1. On desktop or web version of Discord, go to *User Settings → Advanced* and enable *Developer Mode*.
2. With developer mode enabled, you can access ID of an element via context menu by right clicking on the element.

### Preparing project
1. Download the repo as ZIP.
2. Unzip the file into a convenient folder.
3. In the root directory of the project, copy `config-example.json` to `config.json`.

## Configuration

Copy `config-example.json` to `config.json`.  
Edit the following options.

| Name | Description |
| --- | --- |
| prefix | Prefix of command used to control Mabicord AIO. |
| token | Bot token issued from Discord Developer Portal. |
| owner | ID of bot owner. |
| client_id | Application ID issued from Discord Developer Portal. |
| test_guild_id | Server ID of bot’s test server. It’s highly recommended to have a dedicated test server for your bot. |
| guild_id | Server ID of bot’s main server. Mabicord AIO is designed to server a single server. |
| channel_log | ID of channel for logging bugle horn messages. |
| channel_alert | ID of channel for mentioning users when a keyword is matched in a bugle horn message. |
| channel_raid | ID of channel to log world raid events. |
| role_raid | ID of role to mention when a world raid occurs. |
| device_address | Address of device used to capture network packets. Use deviceList.js to find your device address. |
| cap_filter | Partial IP address to listen to for incoming packets. IP defaults to official Korean server. |
| patch_url | Address of patch information text file. Defaults to official Korean server. |
| language | Language Mabicord AIO will send messages in. Supports english and korean. Language defaults to Korean. |
| config.css | Message style Mabicord sends in. Toggles between CSS and plain styles. |
| config.bugle_style | Bugle horn message log style. Choose between css, plain and webhook. Using webhook will send the message as if the user has send the message. |
| config.webhookID | ID part of webhook URL. A webhook URL is constructed as https://discord.com/api/webhooks/ID/Token. |
| config.webhookToken | Token part of webhook URL. A webhook URL is constructed as https://discord.com/api/webhooks/ID/Token. |

## Serving Mabicord AIO

1. Log in with any character in Mabinogi.
2. Run `npm run start`.
    - Optionally, use `forever` or `pm2` to start `bot.js`.

# Troubleshooting

## Finding your `device_address`

Use IP address assigned by your router. It is recommended to use static DHCP by configuring in your router settings.  
If you don't know your IP address issued by your router, you have two options.
1. Access your router settings and view which IP it is issuing.
2. In Windows network settings, find IPv4 address under `Hardware properties` of your network device.
3. Run `node deviceList.js` to confirm and use the `addr` assigned by your router.

## What are the `cap_filter` values for my server?

If you have configured `device_address` correctly, running `node findChannel.js` will log valid IP address and data if it includes `<ALL_CHANNELS>` in the message while running Mabinogi.  
If you have successfully logged your channel IP, log all IP addresses by channel hopping. To make the process faster, you may send bugle messages yourself.  
Once you have collected all IP addresses, find common value and substitute `211.218.233` appropriately. Leaving out values will automatically match source IP partially.

# Contributing

Feel free to contribute via issues or pull requests!  
If you need to contact me, reach out at Lx#2909 on Discord.
