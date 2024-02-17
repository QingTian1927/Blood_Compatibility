// * ------------ * //
// * DEPENDENCIES * //
// * ------------ * //

const express = require("express");
const compression = require("compression");
const path = require("path");
const rateLimit = require('express-rate-limit');

// * ---------------- * //
// * GLOBAL CONSTANTS * //
// * ---------------- * //

const app = express();
const port = process.env.PORT || 4242;
const publicPath = getAbsPath("public");

// set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// * ------------ * //
// * APP SETTINGS * //
// * ------------ * //

app.use(compression());
app.use(express.static(publicPath));

// apply rate limiter to all requests
app.use(limiter);

// * ---------- * //
// * GET ROUTES * //
// * ---------- * //

app.get("/", (req, res) => {
    const page = getPublicPath("views/index.html");
    res.status(200).sendFile(page);
    logEvent("HOME", humanTimestamp(), "Someone accessed the home page");
})

app.get("/info", (req, res) => {
    const page = getPublicPath("views/info.html");
    res.status(200).sendFile(page);
    logEvent("INFO", humanTimestamp(), "Someone accessed the info page");
})

app.get("/healthcheck", (req, res) => {
    res.status(200).send("200 OK");
    logEvent("HECK", humanTimestamp(), "Someone accessed the healthcheck path");
})

// * ------------------- * //
// * 404 CATCH-ALL ROUTE * //
// * ------------------- * //

app.all("*", (req, res) => {
    const error404Page = getPublicPath("views/404.html");
    res.status(404).sendFile(error404Page);
    logEvent("S404", humanTimestamp(), "Someone accessed an invalid resource");
})

// * --------------------- * //
// * SERVER INITIALIZATION * //
// * --------------------- * //

const server = app.listen(port, async () => {
    const initTime = humanTimestamp();
    logEvent("INIT", initTime, `Blood Compatibility listening on port {${port}}`);
})

server.keepAliveTimeout = 120000  // 120 seconds

// * ------------------------- * //
// * GENERAL FILE IO FUNCTIONS * //
// * ------------------------- * //

function getPublicPath(dir) {
    return path.join(publicPath, dir);
}

function getAbsPath(dir) {
    return path.join(__dirname, dir);
}

// * ------------------------ * //
// * SERVER LOGGING FUNCTIONS * //
// * ------------------------ * //

function humanTimestamp() {
    return new Date().toISOString();
}

function logEvent(eventCode, timestamp, message) {
    console.log(`[${eventCode}] [${timestamp}] ${message}`);
}