require('rootpath')()
require('colors')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
// import fetch from 'node-fetch';
const { themeColor, apitoken } = require('config.json')

module.exports = 
{
    callback: async function( msg, args )
    {
        const f = await fetch(`https://api.mozambiquehe.re/maprotation?version=2&auth=${apitoken}`)
        const data = await f.json()

        const embed = new MessageEmbed()
            .setColor( themeColor )
            // .setThumbnail( data.battle_royale.current.asset )
            .setTitle( `${data.battle_royale.current.map} - ${data.battle_royale.current.remainingTimer}` )
            .setDescription( `Next: ${data.battle_royale.next.map}` )
            .addField(`Arena Casual: ${data.arenas.current.map} - ${data.arenas.current.remainingTimer}`, `Next: ${data.arenas.next.map}`)
            .addField(`Arena Ranked: ${data.arenasRanked.current.map} - ${data.arenasRanked.current.remainingTimer}`, `Next: ${data.arenasRanked.next.map}`)

        msg.channel.send({embeds:[embed]})
    }
}