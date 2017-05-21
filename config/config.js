var config = {};

config.version = "1.0.0";

config.timeout_peer = 500;
config.secret = "n2qv1994";
// config.HOST = "http://localhost:3005/";
// config.authenticate = "http://localhost:3005/api/authenticate";
// config.rooms = "http://localhost:3005/api/rooms";
// config.register = "http://localhost:3005/api/register";
config.HOST = "https://198.23.226.18:3004/";
config.authenticate = "https://198.23.226.18:3005/api/authenticate";
config.rooms = "https://198.23.226.18:3005/api/rooms";
config.register = "https://198.23.226.18:3005/api/register";
module.exports = config;
