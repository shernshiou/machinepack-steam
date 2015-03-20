module.exports = {

  friendlyName: 'Get News for Steam app',

  description: 'Fetch news feeds for each Steam game',

  extendedDescription: '',

  inputs: {
    appid: {
      description: 'AppID of the game you want the news of.',
      example: 400,
      required: true
    },
    count: {
      description: 'How many news entries you want to get returned.',
      example: 3
    },
    maxlength: {
      description: 'Maximum length of each news entry.',
      example: 300
    }
  },

  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {

      description: 'Done.',

      example:  {
        appnews: {
          appid: 400,
          newsitems: []
        }
      }
    }

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamNews/GetNewsForApp/v0002/',
      method: 'get',
      params: {
        appid: inputs.appid,
        count: inputs.count,
        maxlength: inputs.maxlength,
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
    })

  }

};
