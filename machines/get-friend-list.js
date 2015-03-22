module.exports = {

  friendlyName: 'Get friend list',

  description: 'Returns the friend list of any Steam user, provided his Steam Community profile visibility is set to "Public".',

  extendedDescription: '',

  inputs: {
    steamid: {
      example: '76561197960435530',
      required: true
    },
    key: {
      example: 'XXXXXXXXXXXXXXXXXXXXXXX',
      required: true,
      whereToGet: {
        url: 'http://steamcommunity.com/dev/apikey/',
        description: 'Copy and paste an API key, or create one if you haven\'t already.',
        extendedDescription: ''
      }
    },
    relationship: {
      description: 'Relationship filter. Possibles values: all, friend.',
      example: 'friend'
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
        friendslist: {
          friends: [
            {
              steamid: "76561197960265731",
              relationship: "friend",
              friend_since: 0
            }
          ]
        }
      }
    }

  },

  fn: function (inputs, exits) {

    var Http = require('machinepack-http');

    Http.sendHttpRequest({
      baseUrl: 'http://api.steampowered.com/',
      url: 'ISteamUser/GetFriendList/v0001/',
      method: 'get',
      params: {
        steamid: inputs.steamid,
        key: inputs.key,
        relationship: inputs.relationship
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
