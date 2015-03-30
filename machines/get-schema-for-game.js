module.exports = {

  friendlyName: 'Get schema for game',

  description: 'GetSchemaForGame returns gamename, gameversion and availablegamestats(achievements and stats).',

  extendedDescription: '',

  inputs: {
    appid: {
      description: 'The AppID of the game you want stats of',
      example: '620',
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
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.',
      example: {
        game: {
          gameName: "Portal 2",
          gameVersion: "1108170002",
          availableGameStats: {
            achievements: [],
            stats: []
          }
        }
      }
    },

  },

  fn: function (inputs, exits) {
    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUserStats/GetSchemaForGame/v2/',
      method: 'get',
      params: {
        appid: inputs.appid,
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
