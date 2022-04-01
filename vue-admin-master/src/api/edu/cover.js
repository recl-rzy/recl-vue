import request from '@/utils/request'


export default {
    delCover(id) {
        return request ({ 
            url: `/eduservice/edu-music-cover/delCoverById/${id}`,
            method: 'delete'
        })
    },
    getAllCover() {
        return request ({ 
            url: `/eduservice/edu-music-cover/getAllCover`,
            method: 'get'
        })
    },
    getCoverById(id) {
        return request ({ 
            url: `/eduservice/edu-music-cover/getCoverById/${id}`,
            method: 'get'
        })
    },
    updateCover(eduMusicCover) {
        return request ({ 
            url: `/eduservice/edu-music-cover/updateCover`,
            method: 'post',
            data: eduMusicCover
        })
    },
    addCover(eduMusicCover) {
        return request ({ 
            url: `/eduservice/edu-music-cover/addCover`,
            method: 'post',
            data: eduMusicCover
        })
    },
    pageCoverFactor(current, limit, coverQuery) {
        return request ({
            url: `/eduservice/edu-music-cover/pageCoverFactor/${current}/${limit}`,
            method: 'post',
            data: coverQuery
        })
    }
}