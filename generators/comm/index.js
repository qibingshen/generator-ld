const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

module.exports = function() {
  env.lookup(function() {
    env.run(
      'test',
      {
        'skip-install': true
      },
      function(err) {
        if (err) {
          throw err;
        }
      }
    );
  });
};
