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
})

app.get("/info", (req, res) => {
    const page = getPublicPath("views/info.html");
    res.status(200).sendFile(page);
})

app.get("/healthcheck", (req, res) => {
    res.status(200).send("200 OK");
})

// * ------------------- * //
// * 404 CATCH-ALL ROUTE * //
// * ------------------- * //

app.all("*", (req, res) => {
    const error404Page = getPublicPath("views/404.html");
    res.status(404).sendFile(error404Page);
})

// * --------------------- * //
// * SERVER INITIALIZATION * //
// * --------------------- * //

// Potentially dangerous but I figure it's probably fine for this use case.
initTime = 0;
const server = app.listen(port, async () => {
    initTime = humanTimestamp();
    console.log(`[${initTime}] Blood Compatibility listening on port {${port}}`);
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