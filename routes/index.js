module.exports = function(app) {
	app.use('/api', require('./apiRoutes'));
  return app;
}