const colors = require('./colors');

function colorText(text, color = 'White') {
    const colorId = color.toLowerCase();
    const colorName = colors.id[colorId];
    const hexColorCode = colors.code[colorName];
    const hexR = hexColorCode.slice(1, 3);
    const hexG = hexColorCode.slice(3, 5);
    const hexB = hexColorCode.slice(5);
    const decR = parseInt(hexR, 16);
    const decG = parseInt(hexG, 16);
    const decB = parseInt(hexB, 16);
    return `\x1b[38;2;${decR};${decG};${decB}m${text}\x1b[0m`;
}

module.exports = { colorText };
