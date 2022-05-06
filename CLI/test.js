const dayjs = require('dayjs');

const time = dayjs(0);
const date = time.format('YYYYMMDDHHmmss');

console.log(date);