module.exports = {

  friendlyName: 'Get global stats for game',

  description: 'Returns on global statistics of a specific game',

  extendedDescription: '',

  inputs: {
    appid: {
      description: 'AppID of the game you want the percentages of.',
      example: 400,
      required: true
    },
    count: {
      description: 'Length of the array of global stat names you will be passing.',
      example: 1
    },
    name: {
      description: 'Name of the achievement as defined in Steamworks.',
      example: ['global.map.emp_isle'],
      required: true
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
        response: {
          globalstats: { },
          result: 1
        }
      }
    },

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUserStats/GetGlobalStatsForGame/v0001/',
      method: 'get',
      params: {
        appid: inputs.appid,
        count: inputs.count,
        name: inputs.name,
        format: 'json'
      }
    })
    .exec({
      success: function (res) {
        var response = JSON.parse(res.body);
        console.log(response);
        console.log(JSON.stringify(response));
        return exits.success(response);
      },
      error: function (err) {
        return exits.error(err);
      }
    })

  }

};
