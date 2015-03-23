module.exports = {

  friendlyName: 'Get player achievements',

  description: 'Returns a list of achievements for this user by app id',

  extendedDescription: '',

  inputs: {
    steamid: {
      description: '64 bit Steam ID to return achievements for.',
      example: '76561197960435530',
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
    },
    appid: {
      description: 'The ID for the game you\'re requesting.',
      example: 400,
      required: true
    },
    l: {
      description: 'Language. If specified, it will return language data for the requested language.',
      example: 'en_US'
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.',
      example: {
        playerstats: {
          steamID: "76561197972495328",
          gameName: "Team Fortress 2",
          achievements: [
            {
              apiname: "TF_PLAY_GAME_EVERYCLASS",
              achieved: 1
            }
          ],
          success: true
        }
      }
    }

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUserStats/GetPlayerAchievements/v0001/',
      method: 'get',
      params: {
        steamid: inputs.steamid,
        key: inputs.key,
        appid: inputs.appid,
        l: inputs.l,
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
