module.exports = {

  friendlyName: 'Get player bans',

  description: 'GetPlayerBans returns Community, VAC, and Economy ban statuses for given players.',

  extendedDescription: '',

  inputs: {
    steamids: {
      description: 'Array of SteamIDs',
      example: [ '76561197960435530' ],
      required: true
    },
    key: {
      description: 'Steam API Key',
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
            SteamId: "76561197960435530",
            CommunityBanned: false,
            VACBanned: false,
            NumberOfVACBans: 0,
            DaysSinceLastBan: 0,
            EconomyBan: "none"
          }
        ]
      }
    },

  },


  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUser/GetPlayerBans/v1/',
      method: 'get',
      params: {
        steamids: inputs.steamids.join(),
        key: inputs.key,
        format: 'json'
      }
    })
    .exec({
      success: function (res) {
        var response = JSON.parse(res.body);
        return exits.success(response);
      },
      error: function (err) {
        return exits.error(err);
      }
    });

  }

};
