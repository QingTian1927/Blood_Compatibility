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

function createBloodType(typeLabel, compatibleTypes) {
    const newBloodType = {
        type: typeLabel,
        state: "normal",
        compatibility: compatibleTypes,
        isMixed: false
    };
    return newBloodType;
}

function mixBlood(donorBloodType, recipientBloodObj) {
    let isCompatibleType = recipientBloodObj.compatibility.includes(donorBloodType);
    let isMixed = recipientBloodObj.isMixed;

    if (isMixed) { return; }
    if (isCompatibleType) { recipientBloodObj.state = "normal"; }
    else {
        recipientBloodObj.state = "incompatible";
        recipientBloodObj.isMixed = true;
    }
}

const bloodBagTypeA = lazyGetID("bloodBagTypeA");
const bloodBagTypeB = lazyGetID("bloodBagTypeB");
const bloodBagTypeO = lazyGetID("bloodBagTypeO");
const bloodBagTypeAB = lazyGetID("bloodBagTypeAB");

let selectedType = " ";
bloodBagTypeA.addEventListener("click", () => { selectedType = "A"; });
bloodBagTypeB.addEventListener("click", () => { selectedType = "B"; });
bloodBagTypeAB.addEventListener("click", () => { selectedType = "AB"; });
bloodBagTypeO.addEventListener("click", () => { selectedType = "O"; })

const recipientTypeA = lazyGetID("recipientTypeA");
const recipientTypeB = lazyGetID("recipientTypeB");
const recipientTypeO = lazyGetID("recipientTypeO");
const recipientTypeAB = lazyGetID("recipientTypeAB");

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

function bloodMixer(recipientBloodTrayObj, associatedBloodTypeObj) {
    if (selectedType != " ") {
        mixBlood(selectedType, associatedBloodTypeObj);
    }
    changeBloodIllustration(recipientBloodTrayObj, associatedBloodTypeObj);
}

recipientTypeA.addEventListener("click", () => { bloodMixer(recipientTypeA, bloodObjTypeA); });
recipientTypeB.addEventListener("click", () => { bloodMixer(recipientTypeB, bloodObjTypeB); });
recipientTypeO.addEventListener("click", () => { bloodMixer(recipientTypeO, bloodObjTypeO); });
recipientTypeAB.addEventListener("click", () => { bloodMixer(recipientTypeAB, bloodObjTypeAB); });

function resetBloodObj(bloodObj) {
    bloodObj.isMixed = false;
    bloodObj.state = "normal";
}

const resetButton = lazyGetID("resetButton");
resetButton.addEventListener("click", () => {
    resetBloodObj(bloodObjTypeA);
    resetBloodObj(bloodObjTypeB);
    resetBloodObj(bloodObjTypeO);
    resetBloodObj(bloodObjTypeAB);

    changeBloodIllustration(recipientTypeA, bloodObjTypeA);
    changeBloodIllustration(recipientTypeB, bloodObjTypeB);
    changeBloodIllustration(recipientTypeO, bloodObjTypeO);
    changeBloodIllustration(recipientTypeAB, bloodObjTypeAB);
});