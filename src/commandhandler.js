// this module will look for user commands
require('rootpath')()
const fs = require('fs')
const {MessageEmbed} = require('discord.js')
const ErrorHandler = require('src/errorhandler')
const discordclient = require('src/discordclient')
const { prefix, themeColor } = require('config')

module.exports.commandHandler = async function( msg )
{
    var content = msg.content

    if( !content.length || !content.startsWith(prefix) || msg.author.bot )
        return

    content = content.trim()

    let tokens = content.split(/ +/)

    const cmd = tokens[0].toLowerCase().substring(prefix.length)    // remove prefix

    // create args
    tokens.shift()
    var args = tokens

    if( !cmd.length )
        return

    msg.channel.sendTyping()
        .catch( err => 
        {
            ErrorHandler.minor(`Discord preventing sendTyping() as a security measure`) 
        })

    if( !fs.existsSync(`./commands/${cmd}.js`) )
        return msg.reply( { embeds: [ new MessageEmbed().setColor(themeColor).setDescription(`Unknown Command **__${prefix}${cmd}__**`) ] } )

    // forward to module
    console.log(`Command: ${content} by ${msg.author.tag}`)
    require(`commands/${cmd}`).callback( msg, args )
}