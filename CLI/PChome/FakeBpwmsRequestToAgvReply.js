const fs = require('fs');
const path = require('path');
const dayJs = require('dayjs');

const src = path.join(__dirname, './wcs_trans_log.WTL_DISPATCHER_RAW_DATA.json');
const dst = path.join(__dirname, './Fake_AGV_Reply.json');

fs.readFile(src, 'utf-8', function(err, dataStr) {
    if (err) {
        console.log(`讀取 ${src} 失敗`);
    } else {
        const json = JSON.parse(dataStr);
        const replyJson = JSON.stringify(buildAgvReply(json), null, 4);
        fs.writeFile(dst, replyJson, 'utf-8', function(error) {
            if (error) {
                console.log(`寫入 ${dst} 失敗`);
            } else {
                console.log('轉換完畢')
            }
        });
    }
});

function buildAgvReply(data) {
    const ownerCode = '010001';
    const startTime = new Date().getTime();
    const containerCode = randomContainerCodeBySecond(startTime);
    const creationDate = startTime;
    const compactTime = dayJs(startTime).format('YYYYMMDDHHmmss');
    let fakeCode = Number(compactTime);

    let skuAmount = 0;
    let skuType = [];
    let skuList = [];

    data.forEach((item, i) => {
        if (i > 0) {
            fakeCode++; 
        }

        const fakeShelfCode = `FSC${fakeCode}`;
        const fakeShelfBinCode = `FSB${fakeCode}`;

        skuAmount += item.SkuQty;

        skuType.push(item.SkuCode);

        skuList.push({
            'out_order_code': item.OrderCode,
            'item': item.RowNum,
            'sku_code': item.SkuCode,
            'sku_level': 1,
            'amount': item.SkuQty,
            'owner_code': ownerCode,
            'expiration_date': Date.parse(item.ExpiryDate),
            'out_batch_code': item.OutBatchCode,
            'pick_order_item_finish_time': Date.parse(item.CompleteTime),
            'lack_flag': 0,
            'is_last_container': 1,
            'container_amount': 1,
            'sequence_no': [],
            'shelf_bin_list': [
                {
                    'shelf_code': fakeShelfCode,
                    'shelf_bin_code': fakeShelfBinCode,
                    'quantity': item.SkuQty
                }
            ]
        });
    });

    skuType = [ ... new Set(skuType) ];
    const skuTypeAmount = skuType.length;

    return {
        'header': {
            'warehouse_code': 'geekplus',
            'interface_code': 'feedback_outbound_container',
            'user_id': 'fakeReplyByWCS',
            'user_key': ''
        },
        'body': {
            'warehouse_code': 'geekplus',
            'container_list': [
                {
                    'container_code': containerCode,
                    'container_type': 2,
                    'pallet_code': "",
                    'sku_amount': skuAmount,
                    'sku_type_amount': skuTypeAmount,
                    'creation_date': creationDate,
                    'picker': "FAKE",
                    'sku_list': skuList
                }
            ]
        }
    };
}

function randomContainerCodeBySecond(time) {
    const timestamp = !isNaN(time) ? time : new Date().getTime();
    const secondTimestamp = Math.floor(timestamp / 1000);
    const last3DigitOfSecondTimestamp = secondTimestamp.toString().slice(-5);
    return `99ZA${last3DigitOfSecondTimestamp}`;
}