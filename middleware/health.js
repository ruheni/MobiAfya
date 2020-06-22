const region = process.env.REGION || "Unknown";

const healthResponse = (res, statusCode, message) => (
    res.status(statusCode).send({
        health: message,
        region: region
    })
);

module.exports = {
    healthy: (res) => healthResponse(res, 200, "Ok"),
    unhealthy: (res) => healthResponse(res, 503, "Unhealthy"),
}
