const moment = require('moment');

// const dt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
// const dt = moment(new Date(1203440000000).getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
const dt = parseInt(moment().format('x'));
// const dt = moment('19870125082615', 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss.SSS');

console.log(dt);
