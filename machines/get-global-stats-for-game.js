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
    name: {
      description: 'Name of the achievement as defined in Steamworks.',
      example: [ 'global.map.emp_isle' ],
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
        globalstats: { },
        result: 1
      }
    },

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    var params = {
      appid: inputs.appid,
      count: inputs.name.length,
      format: 'json'
    };

    inputs.name.forEach(function (val, idx) {
      var key = 'name[' + idx + ']';
      params[key] = val;
    });

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUserStats/GetGlobalStatsForGame/v0001/',
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
    })

  }

};
