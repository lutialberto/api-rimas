const wordRoutes = require('./word_routes');
module.exports = function(app, db) {
  wordRoutes(app, db);
  // Other route groups could go here, in the future
};
