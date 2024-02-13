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
const port = 4242;
const publicPath = getAbsPath("public");

// * ------------ * //
// * APP SETTINGS * //
// * ------------ * //

app.use(compression());
app.use(express.static(publicPath));

// * ---------- * //
// * GET ROUTES * //
// * ---------- * //

app.get("/", async (req, res) => {
    const homePage = getPublicPath("views/index.html");
    res.status(200).sendFile(homePage);
})

// * --------------------- * //
// * SERVER INITIALIZATION * //
// * --------------------- * //

app.listen(port, async () => {
    console.log(`Blood Compatibility listening on port {${port}}`);
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