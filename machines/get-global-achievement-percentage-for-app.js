module.exports = {

  friendlyName: 'Get global achievement percentage for app',

  description: 'Returns on global achievements overview of a specific game in percentages.',

  extendedDescription: '',

  inputs: {
    gameid: {
      description: 'AppID of the game you want the percentages of.',
      example: 400,
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
        achievementpercentages: {
          achievements: []
        }
      }
    },

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/',
      method: 'get',
      params: {
        gameid: inputs.gameid,
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
