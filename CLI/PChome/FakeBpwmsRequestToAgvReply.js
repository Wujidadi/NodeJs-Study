const fs = require('fs');
const path = require('path');
const helper = require('./helper');
const agvReply = require('./agvReply');

const src = path.join(__dirname, './wcs_trans_log.WTL_DISPATCHER_RAW_DATA.json');
const dst = path.join(__dirname, './Fake_AGV_Reply.json');

fs.readFile(src, 'utf-8', function(err, dataStr) {
    if (err) {
        console.log(`讀取 ${src} 失敗`);
    } else {
        const json = JSON.parse(dataStr);
        const replyJson = JSON.stringify(agvReply.buildAgvReply(json), null, 4);
        fs.writeFile(dst, replyJson, 'utf-8', function(error) {
            if (error) {
                console.log(`寫入 ${dst} 失敗`);
            } else {
                console.log(helper.colorText('轉換完畢', 'Gold'));
            }
        });
    }
});
