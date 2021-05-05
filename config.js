const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const patterns = {
    mobile:/^\+963 9[3-6-8-9]\d \d{3} \d{3}$/,
    code:/^\d{3} - \d{3}$/
}


module.exports = {
    server,
    patterns
}