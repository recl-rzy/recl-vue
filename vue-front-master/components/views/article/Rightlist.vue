<template>
  
    <!-- 右侧列表内容 -->
    <div class="right-wrapper">
        <div class="profile-img">
            <img src="@/assets/imges/yl.png" alt="">
            <img src="@/assets/imges/yl.png" alt="">
        </div>
        <div class="theme-list">
            <a href="#">
                <p class="title">
                    <span>#人生答疑馆</span>
                    &nbsp;&nbsp;
                    <span>85篇</span>
                </p>
                <p class="detail">职业规划是生涯规划很重要的一部分</p>
            </a>
            <a href="#">
                <p class="title">
                    <span>#人生答疑馆</span>
                    &nbsp;&nbsp;
                    <span>85篇</span>
                </p>
                <p class="detail">职业规划是生涯规划很重要的一部分</p>
            </a>
            <a href="#">
                <p class="title">
                    <span>#人生答疑馆</span>
                    &nbsp;&nbsp;
                    <span>85篇</span>
                </p>
                <p class="detail">职业规划是生涯规划很重要的一部分</p>
            </a>
            <a href="#">
                <p class="title">
                    <span>#人生答疑馆</span>
                    &nbsp;&nbsp;
                    <span>85篇</span>
                </p>
                <p class="detail">职业规划是生涯规划很重要的一部分</p>
            </a>
        </div>
        <div class="theme-btn">
            <a>写文章</a>
            <a>全部主题</a>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped>

a {
    text-decoration: none;
    background: none;
    color: #333;
}

a:hover {
    text-decoration: none;
    background: none;
}

/* 右侧列表 */
.right-wrapper {
    width: 28%;
    height: 40%; 
    padding: 20px 0;
    background-color: #fff;
    margin-top: 90px;
    border-radius: 10px;
    margin-left: 40px;
    text-align: center;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    margin-bottom: 100px;
}

.right-wrapper .profile-img {
    width: 100%;
    margin-top: 20px;
}

.right-wrapper .profile-img img {
    width: 90%;
    height: 90px;
    object-fit: cover;
    border-radius: 10px;
}

.theme-list .title {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #333;
}

.theme-list .detail {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    line-height: 20px;
    margin-top: 3px;
}

.theme-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
}

.theme-btn a {
    display: block;
    text-decoration: none;
    background: #0b8bff;
    border-radius: 8px;
    width: 150px;
    height: 42px;
    line-height: 42px;
    color: #fff;
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    text-align: center;
}

@media (max-width: 1342px) {
    .right-wrapper {
        display: none;
    }
}

</style>