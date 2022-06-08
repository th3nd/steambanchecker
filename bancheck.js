const api = require('steamapi')
const steam = new api('EC38E5FB824530A42A57627DBC86FB3D')

let displayinfo = true

async function get_friends(my_url) {
    const my_id = await steam.resolve(my_url)
    const friends = await steam.getUserFriends(my_id)

    let totalcommbans = 0
    let commbannedusers = ''

    let totalvacbans = 0
    let vacbannedusers = ''

    let totaltradebans = 0
    let tradebannedusers = ''

    console.log('this may take a while...')

    for (let i = 0; i < friends.length; i++) {
        const id = await steam.resolve(friends[i].steamID)
        const general = await steam.getUserSummary(id)
        const level = await steam.getUserLevel(id)
        const bans = await steam.getUserBans(id)

        const cban = bans.communityBanned
        const vban = bans.vacBanned
        const eban = bans.economyBan
        
        if (displayinfo) {
            console.log('')
            console.log('nick:             ' + general.nickname)
            console.log('id64:             ' + id)
            console.log('steam level:      ' + level)

            console.log('community banned: ' + (cban ? 'true' : 'false'))
            console.log('vac banned:       ' + (vban ? 'true' : 'false'))  
            console.log('economy banned:   ' + (eban != 'none' ? 'true' : 'false'))
        }

        if (cban) {
            totalcommbans++
            commbannedusers += '\n-' + id
        }

        if (vban) {
            totalvacbans++
            vacbannedusers += '\n-' + id
        }

        if (eban != 'none') {
            totaltradebans++
            tradebannedusers += '\n- ' + id
        }
    }


    console.log('\n')
    console.log('---------------------')
    console.log('accounts checked: ' + friends.length)
    console.log('communitybans:    ' + totalcommbans)
    console.log('vacbans:          ' + totalvacbans)
    console.log('tradebans:        ' + totaltradebans)

    console.log('')

    if (commbannedusers.length > 0)
        console.log('commbanned id64:  ' + commbannedusers)
    if (vacbannedusers.length > 0)
        console.log('vacbanned id64:   ' + vacbannedusers)
    if (tradebannedusers.length > 0)
        console.log('tradebanned id64: ' + tradebannedusers)
}

get_friends('https://steamcommunity.com/id/63u')