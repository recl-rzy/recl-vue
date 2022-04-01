import request from '@/utils/request'

export default {
    getEduStatistics(searchQuery) {
        return request({
            url: `/edusta/daily-statistics//getEduStatistics`,
            method: 'post',
            data: searchQuery
        })
    }
}