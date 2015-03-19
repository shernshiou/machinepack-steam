module.exports = {


  friendlyName: 'Get global achievement percentage for app',


  description: 'Returns on global achievements overview of a specific game in percentages.',


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
