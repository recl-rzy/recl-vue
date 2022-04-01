import request from '@/utils/request'

export default {
    getArticleData(id) {
        return request({
            url: `/eduservice/article-front/getArticleInfo/${id}`,
            method: 'get'
        })
    },
    getArticleComment(id) {
        return request({
            url: `/eduservice/article-front/getArticleComment/${id}`,
            method: 'get'
        })
    },
    addArticleComment(addComment) {
        return request({
            url: `/eduservice/article-front/addArticleComment`,
            method: 'post',
            data: addComment
        })
    },
    praise(commentPraise) {
        return request({
            url: `/eduservice/article-front/addOrCancelCommentPraise`,
            method: 'post',
            data: commentPraise
        })
    },
    focus(memberFocus) {
        return request({
            url: `/educenter/member-focus/focus`,
            method: 'post',
            data: memberFocus
        })
    },
    getFocusStatus(userId, focusUserId) {
        return request({
            url: `/educenter/member-focus/getFocusStatus/${userId}/${focusUserId}`,
            method: 'get'
        })
    },
    pageArticleFactor(current, limit, articleQuery) {
        return request({
            url: `/eduservice/article-front/pageArticleFactor/${current}/${limit}`,
            method: 'post',
            data: articleQuery
        })
    },
    indexPageArticleFactor(current, limit, articleQuery) {
        return request({
            url: `/eduservice/article-front/indexPageArticleFactor/${current}/${limit}`,
            method: 'post',
            data: articleQuery
        })
    }
}