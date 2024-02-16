// * ------------ * //
// * DEPENDENCIES * //
// * ------------ * //

const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs/promises")

// * ---------------- * //
// * GLOBAL CONSTANTS * //
// * ---------------- * //

const app = express();
const port = process.env.PORT || 4242;
const publicPath = getAbsPath("public");

// * ------------ * //
// * APP SETTINGS * //
// * ------------ * //

app.use(compression());
app.use(express.static(publicPath));

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
app.listen(port, async () => {
    initTime = humanTimestamp();
    console.log(`[${initTime}] Blood Compatibility listening on port {${port}}`);
})

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