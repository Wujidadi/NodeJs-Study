const hexColorCode = '#FFD700';
const hexR = hexColorCode.slice(1, 3);
const hexG = hexColorCode.slice(3, 5);
const hexB = hexColorCode.slice(5);
const decR = parseInt(hexR, 16);
const decG = parseInt(hexG, 16);
const decB = parseInt(hexB, 16);

console.log(decR, decG, decB);
