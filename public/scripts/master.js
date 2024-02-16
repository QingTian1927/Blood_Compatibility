export function lazyQuery(element, selector) {
    return element.querySelector(selector);
}

export function lazyGetID(elementId) {
    return document.getElementById(elementId);
}

export function openSameTab(link) {
    window.open(link, "_self");
}