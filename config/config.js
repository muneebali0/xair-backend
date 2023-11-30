const env = process.env.NODE_ENV || 'local';
if (env === 'local' || env === 'dev' || env=== 'prod') {
    process.env.NODE_ENV = env;
    const config = require('./config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
        //console.log(key , " ", process.env[key] );
    });
}
