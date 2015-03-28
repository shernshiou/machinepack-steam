module.exports = {

  friendlyName: 'Is playing shared game',

  description: 'IsPlayingSharedGame returns the original owner\'s SteamID if a borrowing account is currently playing this game. If the game is not borrowed or the borrower currently doesn\'t play this game, the result is always 0.',

  extendedDescription: '',

  inputs: {
    steamid: {
      description: 'The SteamID of the account playing.',
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
    appid_playing: {
      description: 'The AppID of the game currently playing.',
      example: "240"
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example : {
        lender_steamid: '0'
      }
    },

  },

  fn: function (inputs, exits) {
    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'IPlayerService/IsPlayingSharedGame/v0001/',
      method: 'get',
      params: {
        steamid: inputs.steamid,
        key: inputs.key,
        appid_playing: inputs.appid_playing,
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
