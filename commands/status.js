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
        const f = await fetch(`https://api.mozambiquehe.re/servers?auth=${apitoken}`)
        const data = await f.json()

        var origin_login_total_count = 0
        var origin_login_up = []
        var origin_login_slow = []
        var origin_login_down = []
        var origin_login_resp = []

        var eanf_total_count = 0
        var eanf_up = []
        var eanf_slow = []
        var eanf_down = []
        var eanf_resp = []

        var eaAcc_total_count = 0
        var eaAcc_up = []
        var eaAcc_slow = []
        var eaAcc_down = []
        var eaAcc_resp = []

        var crossplay_total_count = 0
        var crossplay_up = []
        var crossplay_slow = []
        var crossplay_down = []
        var crossplay_resp = []

        Object.keys(data.Origin_login).forEach( loc => 
        {
            origin_login_total_count++
            origin_login_resp.push(data.Origin_login[loc].ResponseTime)

            if( data.Origin_login[loc].Status == 'UP' )
                origin_login_up.push(loc)
            else if( data.Origin_login[loc].Status == 'SLOW' )
                origin_login_slow.push(loc)
            else if( data.Origin_login[loc].Status == 'DOWN' )
                origin_login_down.push(loc)
        })

        Object.keys(data.EA_novafusion).forEach( loc => 
        {
            eanf_total_count++
            eanf_resp.push(data.EA_novafusion[loc].ResponseTime)

            if( data.EA_novafusion[loc].Status == 'UP' )
                eanf_up.push(loc)
            else if( data.EA_novafusion[loc].Status == 'SLOW' )
                eanf_slow.push(loc)
            else if( data.EA_novafusion[loc].Status == 'DOWN' )
                eanf_down.push(loc)
        })

        Object.keys(data.EA_accounts).forEach( loc => 
        {
            eaAcc_total_count++
            eaAcc_resp.push(data.EA_accounts[loc].ResponseTime)

            if( data.EA_accounts[loc].Status == 'UP' )
                eaAcc_up.push(loc)
            else if( data.EA_accounts[loc].Status == 'SLOW' )
                eaAcc_slow.push(loc)
            else if( data.EA_accounts[loc].Status == 'DOWN' )
                eaAcc_down.push(loc)
        })

        Object.keys(data.ApexOauth_Crossplay).forEach( loc => 
        {
            crossplay_total_count++
            crossplay_resp.push(data.ApexOauth_Crossplay[loc].ResponseTime)

            if( data.ApexOauth_Crossplay[loc].Status == 'UP' )
                crossplay_up.push(loc)
            else if( data.ApexOauth_Crossplay[loc].Status == 'SLOW' )
                crossplay_slow.push(loc)
            else if( data.ApexOauth_Crossplay[loc].Status == 'DOWN' )
                crossplay_down.push(loc)
        })

        var origin_login_average_resp = (origin_login_resp.reduce( (a,b) => a + b, 0 ))/origin_login_resp.length
        var eanf_average_resp = (eanf_resp.reduce( (a,b) => a + b, 0 ))/eanf_resp.length
        var eaAcc_average_resp = (eaAcc_resp.reduce( (a,b) => a + b, 0 ))/eaAcc_resp.length
        var crossplay_average_resp = (crossplay_resp.reduce( (a,b) => a + b, 0 ))/crossplay_resp.length

        var origin_login_on_count = origin_login_up.length+origin_login_slow.length
        var eanf_on_count = eanf_up.length+eanf_slow.length
        var eaAcc_on_count = eaAcc_up.length+eaAcc_slow.length
        var crossplay_on_count = crossplay_up.length+crossplay_slow.length

        var embed = new MessageEmbed()
            .setColor( themeColor )
            .setURL(`https://apexlegendsstatus.com`)
            .setTitle( `Apex Legends Server Status:` )

        var origin_login_str = `Average Local Ping: ${parseFloat(origin_login_average_resp).toFixed(2)}`

        if( origin_login_slow.length )
            origin_login_str += `\🟡Slow: ${origin_login_slow.join(', ')}`
        if( origin_login_down.length )
            origin_login_str += `\n🔴Down: ${origin_login_down.join(', ')}`
        
        embed.addField( `Origin Login (${origin_login_on_count}/${origin_login_total_count})🟢`, origin_login_str )

        var eanf_str = `Average Local Ping: ${parseFloat(eanf_average_resp).toFixed(2)}`

        if( eanf_slow.length )
            eanf_str += `\🟡Slow: ${eanf_slow.join(', ')}`
        if( eanf_down.length )
            eanf_str += `\n🔴Down: ${eanf_down.join(', ')}`

        embed.addField( `EA Novafusion (${eanf_on_count}/${eanf_total_count})🟢`, eanf_str )

        var eaAcc_str = `Average Local Ping: ${parseFloat(eaAcc_average_resp).toFixed(2)}`

        if( eaAcc_slow.length )
            eaAcc_str += `\🟡Slow: ${eaAcc_slow.join(', ')}`
        if( eaAcc_down.length )
            eaAcc_str += `\n🔴Down: ${eaAcc_down.join(', ')}`

        embed.addField( `EA Accounts (${eaAcc_on_count}/${eaAcc_total_count})🟢`, eaAcc_str )

        var crossplay_str = `Average Local Ping: ${parseFloat(crossplay_average_resp).toFixed(2)}`

        if( crossplay_slow.length )
            crossplay_str += `\n🟡Slow: ${crossplay_slow.join(', ')}`
        if( crossplay_down.length )
            crossplay_str += `\n🔴Down: ${crossplay_down.join(', ')}`

        embed.addField( `Apex OAuth Crossplay (${crossplay_on_count}/${crossplay_total_count})🟢`, crossplay_str )

        msg.channel.send({embeds: [embed]})
    }
}