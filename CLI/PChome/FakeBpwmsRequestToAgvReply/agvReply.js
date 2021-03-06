const moment = require('moment');

function buildAgvReply(data) {
    const ownerCode = '010001';
    const orderCode = data.OrderCode;
    const rawSkuList = data.SkuList;
    const startTime = new Date().getTime();
    const containerCode = randomContainerCodeBySecond(startTime);
    const creationDate = startTime;
    const compactTime = moment(startTime).format('YYYYMMDDHHmmss');
    let fakeCode = Number(compactTime);

    let skuAmount = 0;
    let skuType = [];
    let skuList = [];

    rawSkuList.forEach((item, i) => {
        if (i > 0) {
            fakeCode++; 
        }

        const fakeShelfCode = `FSC${fakeCode}`;
        const fakeShelfBinCode = `FSB${fakeCode}`;

        skuAmount += item.SkuQty;

        skuType.push(item.SkuCode);

        skuList.push({
            'out_order_code': orderCode,
            'item': item.RowNum,
            'sku_code': item.SkuCode,
            'sku_level': item.SkuLevel,
            'amount': item.SkuQty,
            'owner_code': ownerCode,
            'expiration_date': Date.parse(item.ExpiryDate),
            'out_batch_code': item.OutBatchCode,
            'pick_order_item_finish_time': (item.CompleteTime !== undefined && item.CompleteTime !== null) ? Date.parse(item.CompleteTime) : new Date().getTime(),
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
    const last5DigitOfSecondTimestamp = secondTimestamp.toString().slice(-5);
    return `99ZA${last5DigitOfSecondTimestamp}`;
}

module.exports = { buildAgvReply, randomContainerCodeBySecond };
