module.exports = {

  friendlyName: 'Get owned games',

  description: 'GetOwnedGames returns a list of games a player owns along with some playtime information, if the profile is publicly visible. Private, friends-only, and other privacy settings are not supported unless you are asking for your own personal details (ie the WebAPI key you are using is linked to the steamid you are requesting).',

  extendedDescription: '',

  inputs: {
    steamid: {
      description: 'The SteamID of the account.',
      example: '76561197960434622',
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
    include_appinfo: {
      description: 'Include game name and logo information in the output. The default is to return appids only.',
      example: 1
    },
    include_played_free_games: {
      description: 'By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community.',
      example: 1
    },
    appids_filter: {
      description: 'You can optionally filter the list to a set of appids. Note that these cannot be passed as a URL parameter, instead you must use the JSON format described in Steam_Web_API#Calling_Service_interfaces.',
      example: [ 440, 500, 550 ]
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
        game_count: 1,
        games: [
          {
            appid: 10,
            name: "Counter-Strike",
            playtime_forever: 32,
            img_icon_url: "6b0312cda02f5f777efa2f3318c307ff9acafbb5",
            img_logo_url: "af890f848dd606ac2fd4415de3c3f5e7a66fcb9f",
            has_community_visible_stats: true
          }
        ]
      }
    }

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    var params = {
      steamid: inputs.steamid,
      key: inputs.key,
      include_appinfo: inputs.include_appinfo,
      include_played_free_games: inputs.include_played_free_games,
      format: 'json'
    };

    if (inputs.appids_filter) {
      params.appids_filter = '[' + inputs.appids_filter.join() + ']';
    }

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'IPlayerService/GetOwnedGames/v0001/',
      method: 'get',
      params: params
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
