module.exports = {

  friendlyName: 'Get player summaries',

  description: 'Returns basic profile information for a list of 64-bit Steam IDs.',

  extendedDescription: '',

  inputs: {
    steamids: {
      example: [ '76561197960435530' ],
      required: true
    },
    key: {
      example: 'XXXXXXXXXXXXXXXXXXXXXXX',
      required: true,
      whereToGet: {
        url: 'http://steamcommunity.com/dev/apikey/',
        description: 'Copy and paste an API key, or create one if you haven\'t already.',
        extendedDescription: ''
      }
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: {
        players: [
          {
            steamid: "76561197960435530",
            communityvisibilitystate: 3,
            profilestate: 1,
            personaname: "Robin",
            lastlogoff: 1426915786,
            profileurl: "http://steamcommunity.com/id/robinwalker/",
            avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4.jpg",
            avatarmedium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_medium.jpg",
            avatarfull: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_full.jpg",
            personastate: 0,
            realname: "Robin Walker",
            primaryclanid: "103582791429521412",
            timecreated: 1063407589,
            personastateflags: 0,
            loccountrycode: "US",
            locstatecode: "WA",
            loccityid: 3961
          }
        ]
      }
    },

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUser/GetPlayerSummaries/v0002/',
      method: 'get',
      params: {
        steamids: inputs.steamids.join(),
        key: inputs.key
      }
    })
    .exec({
      success: function (res) {
        var response = JSON.parse(res.body).response;
        return exits.success(response);
      },
      error: function (err) {
        return exits.error(err);
      }
    })

  },

};
