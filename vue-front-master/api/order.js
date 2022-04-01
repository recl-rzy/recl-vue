import request from '@/utils/request'

export default {
    queryPayOrder(orderNo) {
        return request({
            url: `/order/order-pay-log/queryPayLog`,
            method: 'get',
            data: orderNo
        })
    },
    
}