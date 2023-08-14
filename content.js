let highlightedElement;

// Global variable to store the selection mode (text or image)
window.selectionMode = 'text';

// Mouse over event to highlight element
document.addEventListener('mouseover', function (e) {
    if (highlightedElement) {
        highlightedElement.classList.remove('highlight');
    }
    highlightedElement = e.target;
    highlightedElement.classList.add('highlight');
});

// Mouse click event to get element info based on the selection mode
document.addEventListener('click', function (e) {
    e.preventDefault();
    if (window.selectionMode === 'image') {
        const imgElement = e.target.querySelector('img');
        if (imgElement) {
            console.log('Image Element Info JSON:', getElementInfosByJson(imgElement));
        }
    } else {
        console.log('Text Element Info JSON:', getElementInfosByJson(e.target));
    }
});

// Function to get element information in JSON format
function getElementInfosByJson(element) {
    let currentElement = element;
    const elementInfos = [];

    // Loop through the element and its parents to gather the information
    while (currentElement) {
        const info = {
            tag: currentElement.tagName.toLowerCase(),
            attributes: {}
        };

        // Get attributes
        Array.from(currentElement.attributes).forEach(attr => {
            info.attributes[attr.name] = attr.value;
        });

        elementInfos.push(info);

        // Move to the parent element
        currentElement = currentElement.parentElement;
    }

    return JSON.stringify(elementInfos);
}
