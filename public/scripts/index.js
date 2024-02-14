function lazyQuery(element, selector) {
    return element.querySelector(selector);
}

function lazyGetID(elementId) {
    return document.getElementById(elementId);
}

const infoButton = lazyGetID("infoButton");
infoButton.addEventListener("click", () => {
    alert("Lmao");
});

const emptyCursor = "Empty";
const emptyInvalidCursor = "EmptyInvalid";
const halfFullCursor = "HalfFull";
const halfFullInvalidCursor = "HalfFullInvalid";
function setBloodSyringeCursor(bloodTrayObj, cursorType) {
    bloodTrayObj.style.cursor = (
        `url('/assets/graphics/exports/Blood_Syringe/BloodSyringe_32x32_${cursorType}.svg'), ` +
        `url('/assets/graphics/exports/Blood_Syringe/BloodSyringe_32x32_${cursorType}.png'), ` +
        "auto"
    );
}

function setBloodBagCursor(bloodBagObj) {
    if (selectedType === " ") {
        setBloodSyringeCursor(bloodBagObj, emptyCursor);
        return;
    }
    setBloodSyringeCursor(bloodBagObj, halfFullCursor);
}

const bloodBagTypeA = lazyGetID("bloodBagTypeA");
const bloodBagTypeB = lazyGetID("bloodBagTypeB");
const bloodBagTypeO = lazyGetID("bloodBagTypeO");
const bloodBagTypeAB = lazyGetID("bloodBagTypeAB");

let selectedType = " ";
bloodBagTypeA.addEventListener("click", () => {
    selectedType = "A";
    setBloodBagCursor(bloodBagTypeA);
});
bloodBagTypeB.addEventListener("click", () => {
    selectedType = "B";
    setBloodBagCursor(bloodBagTypeB);
});
bloodBagTypeO.addEventListener("click", () => {
    selectedType = "O";
    setBloodBagCursor(bloodBagTypeO);
})
bloodBagTypeAB.addEventListener("click", () => {
    selectedType = "AB";
    setBloodBagCursor(bloodBagTypeAB);
});

bloodBagTypeA.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeA); });
bloodBagTypeB.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeB); });
bloodBagTypeO.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeO); });
bloodBagTypeAB.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeAB); });

const recipientTypeA = lazyGetID("recipientTypeA");
const recipientTypeB = lazyGetID("recipientTypeB");
const recipientTypeO = lazyGetID("recipientTypeO");
const recipientTypeAB = lazyGetID("recipientTypeAB");

function createBloodType(typeLabel, compatibleTypes) {
    const newBloodType = {
        type: typeLabel,
        state: "normal",
        compatibility: compatibleTypes,
        isMixed: false
    };
    return newBloodType;
}

// God helps my naming scheme.
function changeBloodIllustration(recipientBloodTrayObj, associatedBloodTypeObj) {
    const image = lazyQuery(recipientBloodTrayObj, "img");
    const bloodType = associatedBloodTypeObj.type;

    if (associatedBloodTypeObj.state == "normal") {
        image.src = `/assets/graphics/exports/Recipient_Blood/NormalBlood_Type${bloodType}_Light.svg`;
        image.alt = `Illustration of type ${bloodType} blood in normal conditions`;
    }
    else if (associatedBloodTypeObj.state == "incompatible") {
        image.src = `/assets/graphics/exports/Recipient_Blood/IncompatibleBlood_Type${bloodType}_Light.svg`;
        image.alt = `Illustration of type ${bloodType} blood when mixed with incompatible blood types`;
    }
}

const bloodObjTypeA = createBloodType("A", ["A", "O"]);
const bloodObjTypeB = createBloodType("B", ["B", "O"]);
const bloodObjTypeO = createBloodType("O", ["O"]);
const bloodObjTypeAB = createBloodType("AB", ["AB", "A", "B", "O"]);

function mixBlood(donorBloodType, recipientBloodObj) {
    let isCompatibleType = recipientBloodObj.compatibility.includes(donorBloodType);
    let isMixed = recipientBloodObj.isMixed;

    if (isMixed) { return; }
    if (isCompatibleType) {
        recipientBloodObj.state = "normal";
        return;
    }
    recipientBloodObj.state = "incompatible";
    recipientBloodObj.isMixed = true;
}

function bloodMixer(recipientBloodTrayObj, associatedBloodTypeObj) {
    if (selectedType !== " ") {
        mixBlood(selectedType, associatedBloodTypeObj);
    }
    changeBloodIllustration(recipientBloodTrayObj, associatedBloodTypeObj);
}

function setRecipientCursor(recipientBloodTrayObj, associatedBloodTypeObj) {
    if (selectedType === " ") {
        setBloodSyringeCursor(recipientBloodTrayObj, emptyInvalidCursor);
        return;
    }
    if (associatedBloodTypeObj.isMixed) {
        setBloodSyringeCursor(recipientBloodTrayObj, halfFullInvalidCursor);
        return;
    }
    setBloodSyringeCursor(recipientBloodTrayObj, halfFullCursor);
}

recipientTypeA.addEventListener("click", () => {
    bloodMixer(recipientTypeA, bloodObjTypeA);
    setRecipientCursor(recipientTypeA, bloodObjTypeA);
});
recipientTypeB.addEventListener("click", () => {
    bloodMixer(recipientTypeB, bloodObjTypeB);
    setRecipientCursor(recipientTypeB, bloodObjTypeB);
});
recipientTypeO.addEventListener("click", () => {
    bloodMixer(recipientTypeO, bloodObjTypeO);
    setRecipientCursor(recipientTypeO, bloodObjTypeO);
});
recipientTypeAB.addEventListener("click", () => {
    bloodMixer(recipientTypeAB, bloodObjTypeAB);
    setRecipientCursor(recipientTypeAB, bloodObjTypeAB);
});

recipientTypeA.addEventListener("mouseover", () => { setRecipientCursor(recipientTypeA, bloodObjTypeA); });
recipientTypeB.addEventListener("mouseover", () => { setRecipientCursor(recipientTypeB, bloodObjTypeB); });
recipientTypeO.addEventListener("mouseover", () => { setRecipientCursor(recipientTypeO, bloodObjTypeO); });
recipientTypeAB.addEventListener("mouseover", () => { setRecipientCursor(recipientTypeAB, bloodObjTypeAB); });

function resetBloodObj(bloodObj) {
    bloodObj.isMixed = false;
    bloodObj.state = "normal";
}

const resetButton = lazyGetID("resetButton");
resetButton.addEventListener("click", () => {
    selectedType = " ";
    resetBloodObj(bloodObjTypeA);
    resetBloodObj(bloodObjTypeB);
    resetBloodObj(bloodObjTypeO);
    resetBloodObj(bloodObjTypeAB);
    changeBloodIllustration(recipientTypeA, bloodObjTypeA);
    changeBloodIllustration(recipientTypeB, bloodObjTypeB);
    changeBloodIllustration(recipientTypeO, bloodObjTypeO);
    changeBloodIllustration(recipientTypeAB, bloodObjTypeAB);
});