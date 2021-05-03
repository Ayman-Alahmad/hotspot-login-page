const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
module.exports = {
    server
}