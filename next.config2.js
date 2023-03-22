module.exports = {
    env: {
        apiKey: process.env.API_KEY,
    },
    serverRuntimeConfig: {
        // Will be available on both server and client
        apiKey: process.env.API_KEY, // pass through eny variables
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiKey: process.env.API_KEY,
    },
};
