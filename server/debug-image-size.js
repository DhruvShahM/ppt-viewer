const sizeOf = require("image-size");
console.log('Type of import:', typeof sizeOf);
console.log('Import content:', sizeOf);
console.log('Is function?', typeof sizeOf === 'function');
try {
    console.log('Default export:', sizeOf.default);
    console.log('imageSize export:', sizeOf.imageSize);
} catch (e) { }
