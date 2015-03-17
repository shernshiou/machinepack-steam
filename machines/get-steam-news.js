module.exports = {


  friendlyName: 'Get Steam news',


  description: 'Fetch news feeds for each Steam game',


  extendedDescription: '',


  inputs: {


  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {
    return exits.success();
  },



};
