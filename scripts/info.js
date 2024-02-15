import { lazyGetID } from "./master.js";
import { lazyQuery } from "./master.js";
import { openSameTab } from "./master.js";

function returnToIndex() {
    openSameTab("/");
}

const returnButton = lazyGetID("returnButton");
returnButton.addEventListener("click", () => { returnToIndex(); });

const titleContainer = lazyGetID("titleContainer");
titleContainer.addEventListener("click", () => { returnToIndex(); });