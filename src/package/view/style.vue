<script>
export default {
  name: "vi-style",
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<template>
  <div class="vi-padding">
    <div class="vi-margin-bottom--large">
      <div class="vi-margin-bottom vi-text-align--center">
        <span class="vi-font-weight--bold">输入框</span>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">尺寸</span>
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom  is-border--thiner vi-input"
        >
          <input type="text" placeholder="normal 36px" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom  is-border--thiner vi-input is-input--smaller"
        >
          <input type="text" placeholder="smaller 28px" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom  is-border--thiner vi-input is-input--small vi-border is-border--bottom"
        >
          <input type="text" placeholder="small 32px" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom  is-border--thiner vi-input is-input--large"
        >
          <input type="text" placeholder="large 40px" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom is-border--thiner  vi-input is-input--larger"
        >
          <input type="text" placeholder="larger 44px" />
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">对齐方式</span>
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom is-border--thiner vi-input is-input--left"
        >
          <input type="text" placeholder="left" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom is-border--thiner vi-input is-input--center"
        >
          <input type="text" placeholder="center" />
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom is-border--thiner vi-input is-input--right"
        >
          <input type="text" placeholder="right" />
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">边框</span>
        </div>
        <div class="vi-margin-bottom">
          <div class="vi-input is-input--border">
            <input type="text" placeholder="border" />
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">必填</span>
        </div>
        <div class="vi-margin-bottom">
          <div class="vi-input is-input--require">
            <input type="text" placeholder="border" />
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class=""> 前内容、后内容</span>
        </div>
        <div
          class="vi-margin-bottom vi-border is-border--bottom is-border--thiner vi-input is-input--left"
        >
          <div
            style="width:100px;line-height: 36px"
            class="vi-text-align--right vi-padding-right"
          >
            <span>姓名</span>
          </div>
          <input type="text" placeholder="left" />
          <div
            style=" line-height: 36px"
            class="vi-text-align--right vi-padding-right"
          >
            <span>x</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vi-margin-bottom--large">
      <div class="vi-margin-bottom vi-text-align--center">
        <span class="vi-font-weight--bold">按钮</span>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">类型</span>
        </div>
        <div>
          <div class="vi-btn is-btn--text">文本型</div>
          <div class="vi-btn">普通型</div>
          <div class="vi-btn is-btn--pack">块状型</div>
          <div class="vi-btn is-btn--hollow">镂空型</div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">尺寸</span>
        </div>
        <div>
          <div class="vi-btn is-btn--text is-btn--smaller">smaller</div>
          <div class="vi-btn is-btn--text is-btn--small">small</div>
          <div class="vi-btn is-btn--text">normal</div>
          <div class="vi-btn is-btn--text is-btn--large">large</div>
          <div class="vi-btn is-btn--text is-btn--larger">larger</div>
        </div>
        <div>
          <div class="vi-btn is-btn--smaller">smaller</div>
          <div class="vi-btn is-btn--small">small</div>
          <div class="vi-btn">normal</div>
          <div class="vi-btn is-btn--large">large</div>
          <div class="vi-btn is-btn--larger">larger</div>
        </div>
        <div>
          <div class="vi-btn is-btn--pack is-btn--smaller">smaller</div>
          <div class="vi-btn is-btn--pack is-btn--small">small</div>
          <div class="vi-btn is-btn--pack">normal</div>
          <div class="vi-btn is-btn--pack is-btn--large">large</div>
          <div class="vi-btn is-btn--pack is-btn--larger">larger</div>
        </div>
        <div>
          <div class="vi-btn is-btn--hollow  is-btn--smaller">smaller</div>
          <div class="vi-btn is-btn--hollow  is-btn--small">small</div>
          <div class="vi-btn is-btn--hollow ">normal</div>
          <div class="vi-btn is-btn--hollow  is-btn--large">large</div>
          <div class="vi-btn  is-btn--hollow is-btn--larger">larger</div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">颜色</span>
        </div>
        <div>
          <div class="vi-btn is-btn--text">normal</div>
          <div class="vi-btn is-btn--text is-btn--primary">primary</div>
          <div class="vi-btn is-btn--text is-btn--danger">danger</div>
          <div class="vi-btn is-btn--text is-btn--warning">warning</div>
          <div class="vi-btn is-btn--text is-btn--success">success</div>
          <div class="vi-btn is-btn--text is-btn--black">black</div>
          <div class="vi-btn is-btn--text is-btn--white">white</div>
        </div>
        <div>
          <div class="vi-btn">normal</div>
          <div class="vi-btn is-btn--primary">primary</div>
          <div class="vi-btn is-btn--danger">danger</div>
          <div class="vi-btn is-btn--warning">warning</div>
          <div class="vi-btn is-btn--success">success</div>
          <div class="vi-btn is-btn--black">black</div>
          <div class="vi-btn is-btn--white">white</div>
        </div>
        <div>
          <div class="vi-btn is-btn--pack">normal</div>
          <div class="vi-btn is-btn--pack is-btn--primary">primary</div>
          <div class="vi-btn is-btn--pack is-btn--danger">danger</div>
          <div class="vi-btn is-btn--pack is-btn--warning">warning</div>
          <div class="vi-btn is-btn--pack is-btn--success">success</div>
          <div class="vi-btn is-btn--pack is-btn--black">black</div>
          <div class="vi-btn is-btn--pack is-btn--white">white</div>
        </div>
        <div>
          <div class="vi-btn is-btn--hollow">normal</div>
          <div class="vi-btn is-btn--hollow is-btn--primary">primary</div>
          <div class="vi-btn is-btn--hollow is-btn--danger">danger</div>
          <div class="vi-btn is-btn--hollow is-btn--warning">warning</div>
          <div class="vi-btn is-btn--hollow is-btn--success">success</div>
          <div class="vi-btn is-btn--hollow is-btn--black">black</div>
          <div class="vi-btn is-btn--hollow is-btn--white">white</div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">块状</span>
        </div>
        <div>
          <div class="vi-btn is-btn--pack is-btn--primary is-btn--radius">
            radius
          </div>
          <div class="vi-btn is-btn--pack is-btn--primary is-btn--round">
            round
          </div>
        </div>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">镂空</span>
        </div>
        <div>
          <div class="vi-btn is-btn--hollow is-btn--primary is-btn--radius">
            radius
          </div>
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--radius is-btn--thin"
          >
            thin
          </div>
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--radius is-btn--thiner"
          >
            thiner
          </div>
          <div class="vi-btn is-btn--hollow is-btn--primary is-btn--round">
            round
          </div>
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--round is-btn--thin"
          >
            thin
          </div>
          <div
            class="vi-btn is-btn--hollow is-btn--primary is-btn--round is-btn--thiner"
          >
            thiner
          </div>
          <div
            class="vi-btn is-btn--hollow  is-btn--round is-btn--thiner"
            style="color:yellow"
          >
            自定义
          </div>
        </div>
      </div>
    </div>
    <div class="vi-margin-bottom--large">
      <div class="vi-margin-bottom vi-text-align--center">
        <span class="vi-font-weight--bold">边框</span>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">方位</span>
        </div>
        <div class="vi-margin-bottom vi-padding vi-border is-border--round">
          <span class="">round</span>
        </div>
        <div class="vi-margin-bottom vi-padding vi-border is-border--left">
          <span class="">left</span>
        </div>
        <div class="vi-margin-bottom vi-padding vi-border is-border--right">
          <span class="">right</span>
        </div>
        <div class="vi-margin-bottom vi-padding vi-border is-border--top">
          <span class="">top</span>
        </div>
        <div class="vi-margin-bottom vi-padding vi-border is-border--bottom">
          <span class="">bottom</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">粗细</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--thiner"
        >
          <span class="">is-border--thiner</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--thin"
        >
          <span class="">is-border--thin</span>
        </div>

        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--half"
        >
          <span class="">is-border--half</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">颜色</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--light"
        >
          <span class="">is-border--light</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--lighter"
        >
          <span class="">is-border--lighter</span>
        </div>

        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border"
        >
          <span class="">is-border</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--dark"
        >
          <span class="">is-border--dark</span>
        </div>
        <div
          class="vi-margin-bottom vi-padding vi-border is-border--round is-border--darker"
        >
          <span class="">is-border--darker</span>
        </div>
      </div>
    </div>
    <div class="vi-margin-bottom--large">
      <div class="vi-margin-bottom vi-text-align--center">
        <span class="vi-font-weight--bold">文本</span>
      </div>
      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">尺寸</span>
        </div>
        <div>
          <span class="vi-font-size--smaller">smaller</span>
          <span class="vi-font-size--small">small</span>
          <span class="vi-font-size--medium">medium</span>
          <span class="vi-font-size--large">large</span>
          <span class="vi-font-size--larger">larger</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">颜色</span>
        </div>
        <div>
          <span class="vi-color--primary">primary</span>
          <span class="vi-color--danger">danger</span>
          <span class="vi-color--warning">warning</span>
          <span class="vi-color--success">success</span>
          <span class="vi-color--black">black</span>
          <span class="vi-color--dark">dark</span>
          <span class="vi-color--light">light</span>
          <span class="vi-color--gray">gray</span>
          <span class="vi-color--white">white</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">样式</span>
        </div>
        <div>
          <span class="vi-font-style--italic">italic</span>
          <span class="vi-font-style--oblique">oblique</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">粗细</span>
        </div>
        <div>
          <span class="">normal</span>
          <span class="vi-font-weight--bold">bold</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">文本方向</span>
        </div>
        <div class="vi-direction--ltr">
          <span class="">ltr</span>
        </div>
        <div class="vi-direction--rtl">
          <span class="">rtl</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">单词间距</span>
        </div>
        <div>
          <span class="vi-word-spacing--smaller">vi word spacing smaller</span>
        </div>
        <div>
          <span class="vi-word-spacing--small">vi word spacing small</span>
        </div>
        <div>
          <span class="vi-word-spacing--medium">vi word spacing medium</span>
        </div>
        <div>
          <span class="vi-word-spacing--large">vi word spacing large</span>
        </div>
        <div>
          <span class="vi-word-spacing--larger">vi word spacing larger</span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">文本间距</span>
        </div>
        <div>
          <span class="vi-letter-spacing--smaller"
            >vi-letter-spacing--smaller</span
          >
        </div>
        <div>
          <span class="vi-letter-spacing--small">vi-letter-spacing--small</span>
        </div>
        <div>
          <span class="vi-letter-spacing--medium"
            >vi-letter-spacing--medium</span
          >
        </div>
        <div>
          <span class="vi-letter-spacing--large">vi-letter-spacing--large</span>
        </div>
        <div>
          <span class="vi-letter-spacing--larger"
            >vi-letter-spacing--larger</span
          >
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">行高</span>
        </div>
        <div>
          <span class="vi-line-height--smaller">
            vi-line-height--smaller
          </span>
        </div>
        <div>
          <span class="vi-line-height--small">
            vi-line-height--small
          </span>
        </div>
        <div>
          <span class="vi-line-height--medium">
            vi-line-height--medium
          </span>
        </div>
        <div>
          <span class="vi-line-height--large">
            vi-line-height--large
          </span>
        </div>
        <div>
          <span class="vi-line-height--larger">
            vi-line-height--larger
          </span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">缩进</span>
        </div>
        <div class="vi-text-indent--smaller">
          <span>
            vi-text-indent--smaller
          </span>
        </div>
        <div class="vi-text-indent--small">
          <span>
            vi-text-indent--small
          </span>
        </div>
        <div class="vi-text-indent--medium">
          <span>
            vi-text-indent--medium
          </span>
        </div>
        <div class="vi-text-indent--large">
          <span>
            vi-text-indent--large
          </span>
        </div>
        <div class="vi-text-indent--larger">
          <span class="">
            vi-text-indent--larger
          </span>
        </div>
      </div>

      <div class="vi-margin-bottom">
        <div class="vi-margin-bottom">
          <span class="">截断</span>
        </div>
        <div class="vi-text-ellipsis">
          <span>
            vi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsis
          </span>
        </div>
        <div class="vi-text-clamp">
          <span>
            vi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsisvi-text-ellipsis
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
