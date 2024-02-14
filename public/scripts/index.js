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

const EMPTY_CURSOR = "Empty";
const EMPTY_INVALID_CURSOR = "EmptyInvalid";
const HALF_FULL_CURSOR = "HalfFull";
const HALF_FULL_INVALID_CURSOR = "HalfFullInvalid";

function setBloodSyringeCursor(bloodTrayObj, cursorType) {
    bloodTrayObj.style.cursor = (
        `url('/assets/graphics/exports/Blood_Syringe/BloodSyringe_32x32_${cursorType}.svg'), ` +
        `url('/assets/graphics/exports/Blood_Syringe/BloodSyringe_32x32_${cursorType}.png'), ` +
        "pointer"
    );
}

function setBloodBagImg(bloodBagObj, bloodType) {
    const image = lazyQuery(bloodBagObj, "img");
    image.src = `/assets/graphics/exports/Blood_Bag/BloodBag_Type${bloodType}.svg`;
    image.alt = `Minh họa túi đựng máu chứa nhóm máu ${bloodType}`;
    bloodBagObj.title = `Người cho nhóm máu ${bloodType}`
}

function setBloodBagCursor(bloodBagObj) {
    if (selectedType === " ") {
        setBloodSyringeCursor(bloodBagObj, EMPTY_CURSOR);
        return;
    }
    setBloodSyringeCursor(bloodBagObj, HALF_FULL_CURSOR);
}

const bloodBagTypeA = lazyGetID("bloodBagTypeA");
const bloodBagTypeB = lazyGetID("bloodBagTypeB");
const bloodBagTypeO = lazyGetID("bloodBagTypeO");
const bloodBagTypeAB = lazyGetID("bloodBagTypeAB");

setBloodBagImg(bloodBagTypeA, "A");
setBloodBagImg(bloodBagTypeB, "B");
setBloodBagImg(bloodBagTypeO, "O");
setBloodBagImg(bloodBagTypeAB, "AB")

let selectedType = " ";
const notificationIcon = lazyGetID("notificationIcon");

function showTypeNotification(notificationObj) {
    if (selectedType === " ") {
        notificationObj.style.visibility = "hidden";
        return;
    }
    const notification = lazyQuery(notificationObj, "p");
    notification.innerHTML = selectedType;
    notificationObj.style.visibility = "visible";
}
showTypeNotification(notificationIcon);

bloodBagTypeA.addEventListener("click", () => {
    selectedType = "A";
    setBloodBagCursor(bloodBagTypeA);
    showTypeNotification(notificationIcon);
});
bloodBagTypeB.addEventListener("click", () => {
    selectedType = "B";
    setBloodBagCursor(bloodBagTypeB);
    showTypeNotification(notificationIcon);
});
bloodBagTypeO.addEventListener("click", () => {
    selectedType = "O";
    setBloodBagCursor(bloodBagTypeO);
    showTypeNotification(notificationIcon);
})
bloodBagTypeAB.addEventListener("click", () => {
    selectedType = "AB";
    setBloodBagCursor(bloodBagTypeAB);
    showTypeNotification(notificationIcon);
});

bloodBagTypeA.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeA); });
bloodBagTypeB.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeB); });
bloodBagTypeO.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeO); });
bloodBagTypeAB.addEventListener("mouseover", () => { setBloodBagCursor(bloodBagTypeAB); });

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
function setRecipientBloodImg(recipientBloodTrayObj, associatedBloodTypeObj) {
    const image = lazyQuery(recipientBloodTrayObj, "img");
    const bloodType = associatedBloodTypeObj.type;

    if (associatedBloodTypeObj.state == "normal") {
        image.src = `/assets/graphics/exports/Recipient_Blood/NormalBlood_Type${bloodType}_Light.svg`;
        image.alt = `Minh họa máu nhóm ${bloodType} trong tình trạng bình thường`;
        recipientBloodTrayObj.title = `Nhóm máu ${bloodType} trong tình trạng bình thường`;
    }
    else if (associatedBloodTypeObj.state == "incompatible") {
        image.src = `/assets/graphics/exports/Recipient_Blood/IncompatibleBlood_Type${bloodType}_Light.svg`;
        image.alt = `Minh họa máu nhóm ${bloodType} khi trộn với nhóm máu không tương thích`;
        recipientBloodTrayObj.title = `Nhóm máu ${bloodType} khi trộn với nhóm máu không tương thích`;
    }
}

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
    setRecipientBloodImg(recipientBloodTrayObj, associatedBloodTypeObj);
}

function setRecipientCursor(recipientBloodTrayObj, associatedBloodTypeObj) {
    if (selectedType === " ") {
        setBloodSyringeCursor(recipientBloodTrayObj, EMPTY_INVALID_CURSOR);
        return;
    }
    if (associatedBloodTypeObj.isMixed) {
        setBloodSyringeCursor(recipientBloodTrayObj, HALF_FULL_INVALID_CURSOR);
        return;
    }
    setBloodSyringeCursor(recipientBloodTrayObj, HALF_FULL_CURSOR);
}

const bloodObjTypeA = createBloodType("A", ["A", "O"]);
const bloodObjTypeB = createBloodType("B", ["B", "O"]);
const bloodObjTypeO = createBloodType("O", ["O"]);
const bloodObjTypeAB = createBloodType("AB", ["AB", "A", "B", "O"]);

const recipientTypeA = lazyGetID("recipientTypeA");
const recipientTypeB = lazyGetID("recipientTypeB");
const recipientTypeO = lazyGetID("recipientTypeO");
const recipientTypeAB = lazyGetID("recipientTypeAB");

// Initialize blood items
setRecipientBloodImg(recipientTypeA, bloodObjTypeA);
setRecipientBloodImg(recipientTypeB, bloodObjTypeB);
setRecipientBloodImg(recipientTypeO, bloodObjTypeO);
setRecipientBloodImg(recipientTypeAB, bloodObjTypeAB);

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
    showTypeNotification(notificationIcon);
    resetBloodObj(bloodObjTypeA);
    resetBloodObj(bloodObjTypeB);
    resetBloodObj(bloodObjTypeO);
    resetBloodObj(bloodObjTypeAB);
    setRecipientBloodImg(recipientTypeA, bloodObjTypeA);
    setRecipientBloodImg(recipientTypeB, bloodObjTypeB);
    setRecipientBloodImg(recipientTypeO, bloodObjTypeO);
    setRecipientBloodImg(recipientTypeAB, bloodObjTypeAB);
});