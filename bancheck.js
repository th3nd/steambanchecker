const api = require('steamapi')
const steam = new api('EC38E5FB824530A42A57627DBC86FB3D')

let displayinfo = true

async function get_friends(my_url) {
    let my_id = await steam.resolve(my_url)
    let friends
    
    if (!(friends = await steam.getUserFriends(my_id)))
        console.log('u need to set ur friendslist public!!!!')

    let totalcommbans = 0
    let commbannedusers = ''

    let totalgamebans = 0
    let gamebannedusers = ''

    let totaltradebans = 0
    let tradebannedusers = ''

    console.log('this may take a while...')

    for (let i = 0; i < friends.length; i++) {
        let id = await steam.resolve(friends[i].steamID)
        let general = await steam.getUserSummary(id)
        let level = await steam.getUserLevel(id)
        let bans = await steam.getUserBans(id)
        
        if (displayinfo) {
            console.log('')
            console.log('nick:             ' + general.nickname)
            console.log('id64:             ' + id)
            console.log('steam level:      ' + level)
            console.log('community banned: ' + bans.communityBanned)
            console.log('vac banned:       ' + bans.vacBanned)
            if (bans.economyBan == 'banned') {
                console.log('economy banned:   yes')
                totaltradebans++
                tradebannedusers += '\n- ' + id
            }
        } else {
            if (bans.economyBan == 'banned') {
                totaltradebans++
                tradebannedusers += '\n- ' + id
            }
        }
    }

    console.log('\n')
    console.log('-------------------')
    console.log('accounts checked: ' + friends.length)
    console.log('tradebans:        ' + totaltradebans)
    console.log('')
    console.log('tradeban id64:    ' + tradebannedusers)

}

async function test() {
    let my_id = await steam.resolve('id/63u')
    let friends = await steam.getUserFriends(my_id)

    console.log(friends)
}
//test()
get_friends('https://steamcommunity.com/id/63u')