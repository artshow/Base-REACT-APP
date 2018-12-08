var env = process.env.NODE_ENV || 'development';

if (env === 'production' || env === 'preproduction' || env === 'development' || env === 'test') {
	var config = require('./config.json');
	var envConfig = config[env];

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}
