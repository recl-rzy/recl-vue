<template>
  
    <div class="footer">
        <!-- 底部 -->
        <footer>
            <div class="footer-menus">
            <div class="contact-us">
                <p class="menu-title">联系我们</p>
                <p>地址:中国四川省眉山市xx路xx商务中心10号楼</p>
                <p>电话:+18582416628</p>
                <p>传真:+18582416628</p>
                <p>电子邮箱:admmin@163.com</p>
            </div>

            <div class="service-menu footer-menu">
                <p class="menu-title">服务概览</p>
                <ul class="menu-items">
                <li><a href="#">网站建设</a></li>
                <li><a href="#">域名购买</a></li>
                <li><a href="#">网页设计</a></li>
                <li><a href="#">移动应用</a></li>
                </ul>
            </div>

            <div class="service-menu footer-menu">
                <p class="menu-title">成功案例</p>
                <ul class="menu-items">
                <li><a href="#">桌面网址</a></li>
                <li><a href="#">移动网站</a></li>
                <li><a href="#">科研项目</a></li>
                <li><a href="#">软件应用</a></li>
                </ul>
            </div>

            <div class="service-menu footer-menu">
                <p class="menu-title">公司动态</p>
                <ul class="menu-items">
                <li><a href="#">信息公开</a></li>
                <li><a href="#">最近新闻</a></li>
                <li><a href="#">最新博客</a></li>
                </ul>
            </div>

            <div class="service-menu footer-menu">
                <p class="menu-title">帮助与支持</p>
                <ul class="menu-items">
                <li><a href="#">帮助中心</a></li>
                <li><a href="#">联系客服</a></li>
                <li><a href="#">文档资源</a></li>
                </ul>
            </div>

            <p class="icp-info">京ICP备 1245678901-1 号</p>
            <p class="rights">
                copy; 2021 xx科技 - xxx网络公司官网 版权所有
            </p>
            <div class="scrollToTop">
                <a href="#"><i class="el-icon-caret-top" style="font-size: 30px;margin-left: 1px;"></i></a>
            </div>
            </div>
        </footer>
    </div>

</template>

<script>
export default {
  mounted() {
    const scrollToTop = document.querySelector(".scrollToTop")

    window.addEventListener("scroll", () => {

      if(window.pageYOffset > 2500) {
        scrollToTop.style.display = "block"
      } else {
        scrollToTop.style.display = "none"
      }
    })
  }
}
</script>

<style scoped>


/* 底部 */
footer {
  width: 100%;
  background-color: #181818;
  display: grid;
  justify-items: center;
  padding-top: 72px;
  padding-bottom: 24px;
}

.footer-menus {
  width: 100%;
  max-width: 1180px;
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  padding: 0 80px;
  position: relative;
}

.menu-title {
  font-size: 16px;
  color: white;
  font-weight: 500;
  margin-bottom: 20px;
}

.contact-us {
  justify-self: start;
  color: rgb(134, 134, 134);
}

.contact-us p:not(:first-child) {
  padding-bottom: 16px;
}

.menu-items li {
  list-style: none;
  padding-bottom: 8px;
}

.menu-items li a {
  text-decoration: none;
  font-weight: 300;
  color: rgb(134, 134, 134);
}

.icp-info {
  margin-top: 24px;
  margin-bottom: 16px;
}

.icp-info,
.rights {
  grid-column: 1 / -1;
  justify-self: center;
  color: #6c7377;
}

.scrollToTop a {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff434f;
  color: white;
  text-decoration: none;
  position: fixed;
  bottom: 60px;
  right: 30px;
  display: block;
}   

</style>