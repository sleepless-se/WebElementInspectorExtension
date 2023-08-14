let highlightedElement;

// Global variable to store the selection mode (text or image)
window.selectionMode = 'image';
// Load the selection mode from storage
// chrome.storage.local.get(['selectionMode'], function (result) {
//     window.selectionMode = result.selectionMode || 'text';
// });

// ... その他のコードは変更なし

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
        let imgElement = findImageElement(e.target);

        if (imgElement) {
            console.log('Image Element Info JSON:', getElementInfosByJson(imgElement));
        }
    } else {
        console.log('Text Element Info JSON:', getElementInfosByJson(e.target));
    }
});

function findImageElement(target) {
    let imgElement = target.querySelector('img');

    // If no image found in the children, look for an image in the siblings of the parent
    if (!imgElement) {
        const parent = target.parentElement;
        const children = Array.from(parent.children);

        // Exclude the current element
        const otherChildren = children.filter(child => child !== target);

        // Search for an image in the other children
        otherChildren.some(child => {
            imgElement = child.querySelector('img');
            return !!imgElement; // Stop searching if an image is found
        });
    }

    // If no <img> tag found, look for a background-image in the style attribute
    if (!imgElement) {
        const backgroundImage = target.style.backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            // Return the element itself if it has a background image
            imgElement = target;
        }
    }

    return imgElement;
}



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
