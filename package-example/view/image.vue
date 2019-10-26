<!--
 * @Description: In User Settings Edit 
 * @Author: your name
 * @Date: 2019-09-03 21:16:11
 * @LastEditTime: 2019-09-04 11:11:09
 * @LastEditors: Please set LastEditors
 -->
<script>
let image_1 = require("../image/zly.jpg");
let image_2 = require("../image/zly2.jpg");
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    image: image_1,
    status: false
  };
};
instance.computed = {};
instance.methods = {
  change() {
    this.status = !this.status;
    this.image = this.status ? image_2 : image_1;
  },
  loadingSuccess() {
    this.$message("加载成功");
  },
  loadingError() {
    this.$message.danger("加载失败");
  }
};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-padding">
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--bold vui-text--primary">
        <div class="vui-text--bold vui-text--primary">
          本地切换
        </div>
        <div class="vui-text--light">
          由于之前存在切换之后不能更新图片
        </div>
      </div>
      <div class="vui-margin-bottom">
        <vui-image width="100px" height="100px" :src="image" class="">
          <span>center</span>
        </vui-image>
      </div>
      <vui-button @click="change" hollow thin color="primary">切换</vui-button>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom vui-text--bold vui-text--primary">
        <div class="vui-text--bold vui-text--primary">
          align-type
        </div>
        <div class="vui-text--light">
          center top bottom left right top-left top-right bottom-left
          bottom-right
        </div>
      </div>
      <vui-image
        width="100px"
        height="100px"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
      >
        <span>center（默认）</span>
      </vui-image>
      <vui-image
        width="100px"
        height="100px"
        align-type="top"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
      >
        <span>top</span>
      </vui-image>
      <vui-image
        width="100px"
        height="100px"
        align-type="top-left"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
      >
        <span>top-left</span>
      </vui-image>
      <vui-image
        width="100px"
        height="100px"
        align-type="bottom"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
      >
        <span>bottom</span>
      </vui-image>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          fill-type
        </div>
        <div class="vui-text--light">
          填充方式 width（宽度100%） height（高度100%） min（至少一边100%）
          max（至多一边100%） cover（两边100%）
        </div>
      </div>
      <div>
        <vui-image
          width="100px"
          height="100px"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <span>width（默认）</span>
        </vui-image>
        <vui-image
          width="100px"
          height="100px"
          fill-type="height"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <span>height</span>
        </vui-image>

        <vui-image
          width="100px"
          height="100px"
          fill-type="min"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <span>min</span>
        </vui-image>
        <vui-image
          width="100px"
          height="100px"
          fill-type="max"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <span>max</span>
        </vui-image>
        <vui-image
          width="100px"
          height="100px"
          fill-type="cover"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <span>cover</span>
        </vui-image>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          lazy
        </div>
        <div class="vui-text--light">
          lazyThreshold（懒加载阈值，即image的顶部距离窗口的底部的差值）、lazyDuration（
          懒加载图片定时器的时差）
        </div>
      </div>
      <div>
        <vui-image
          width="100px"
          height="100px"
          lazy
          lazyThreshold="100"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567526746768&di=d53df45ee65e21d73bf0377a8e48d2ac&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F19%2F20150819183143_PK2kj.jpeg"
        >
          <div slot="loading">
            <vui-loading-ring color="#000"></vui-loading-ring>
          </div>
        </vui-image>
        <vui-image
          width="100px"
          height="100px"
          lazy
          lazyThreshold="100"
          src="http://n.sinaimg.cn/541/w854h487/20190902/0f75-ieaiqii0002448.jpg"
        >
          <div slot="loading">
            <vui-loading-ring color="#000"></vui-loading-ring>
          </div>
          <div slot="error">
            <span>失败</span>
          </div>
        </vui-image>
      </div>
    </div>
    <div class="vui-margin-bottom--large">
      <div class="vui-margin-bottom">
        <div class="vui-text--bold vui-text--primary">
          showDelay
        </div>
        <div class="vui-text--light">
          延迟显示
        </div>
      </div>
      <div>
        <span>lazyThreshol="100" | showDelay="1000"</span>
        <vui-image
          width="100px"
          height="100px"
          lazy
          lazyThreshold="100"
          showDelay="1000"
          :loading-success="loadingSuccess"
          :loading-error="loadingError"
          src="http://n.sinaimg.cn/sinacn20190902ac/541/w854h487/20190902/0f75-ieaiqii0002448.jpg"
        >
          <div slot="loading">
            <vui-loading-ring color="#000"></vui-loading-ring>
          </div>
        </vui-image>
      </div>
      <div>
        <vui-image
          width="100px"
          height="100px"
          lazy
          lazyThreshold="100"
          showDelay="100"
          :loading-success="loadingSuccess"
          :loading-error="loadingError"
          src="http://n.sinaimg.cn/541/w854h487/20190902/0f75-ieaiqii0002448.jpg"
        >
          <div slot="loading">
            <vui-loading-ring color="#000"></vui-loading-ring>
          </div>
          <div slot="error">
            加载失败
          </div>
        </vui-image>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
