module.exports = {

  friendlyName: 'Get recently played games',

  description: 'GetRecentlyPlayedGames returns a list of games a player has played in the last two weeks, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting).',

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
    count: {
      description: 'Optionally limit to a certain number of games (the number of games a person has played in the last 2 weeks is typically very small)',
      example: 2
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
        total_count: 1,
        games: [
          {
            appid: 570,
            name: "Dota 2",
            playtime_2weeks: 1927,
            playtime_forever: 125905,
            img_icon_url: "0bbb630d63262dd66d2fdd0f7d37e8661a410075",
            img_logo_url: "d4f836839254be08d8e9dd333ecc9a01782c26d2"
          }
        ]
      }
    }

  },

  fn: function (inputs, exits) {
    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'IPlayerService/GetRecentlyPlayedGames/v0001/',
      method: 'get',
      params: {
        steamid: inputs.steamid,
        key: inputs.key,
        count: inputs.count,
        format: 'json'
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
    });
  }

};
