<template>
  <div class="buttonIcon">
    <div class="buttonBackground" v-if="type === 'defineFirst'" @click="callback">
      <span class="buttonLeft"></span>
      <span class="buttonRight"></span>
      <div class="buttonContent">
        确定
      </div>
    </div>
    <div class="buttonBackground" v-else-if="type === 'closeFirst'" @click="callback(prop)">
      <span class="buttonLeft"></span>
      <span class="buttonRight"></span>
      <div class="buttonContent">
        取消
      </div>
    </div>
    <div class="buttonBackground" v-else-if="type === 'defineSecond'" @click="callback">
      <span class="buttonLeft secondWidth"></span>
      <span class="buttonRight"></span>
      <div class="buttonContent">
        <span class="buttonContentIconTwo"></span>
        <span>确定</span>
      </div>
    </div>
    <div class="buttonBackground" v-else @click="callback(prop)">
      <span class="buttonLeft secondWidth"></span>
      <span class="buttonRight"></span>
      <div class="buttonContent">
        <span class="buttonContentIcon"></span>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'button-icon',
  props: ['type', 'callback', 'prop']
}
</script>

<style lang="scss">
.buttonIcon {
  display: inline-block;
  .buttonBackground {
    float: left;
    cursor: pointer;
    position: relative;
    .buttonLeft {
      float: left;
      width: 42px;
      height: 24px;
      background: url('../../../src/assets/default/linkbutton_bg.png') no-repeat 0 -48px;
    }
    .buttonRight {
      float: right;
      width: 18px;
      height: 24px;
      background: url('../../../src/assets/default/linkbutton_bg.png') no-repeat right 0;
    }
    .buttonContent {
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .buttonContentIcon {
        width: 16px;
        height: 16px;
        background: url('../../../src/assets/icons/cancel.png') no-repeat
      }
      .buttonContentIconTwo {
        width: 16px;
        height: 16px;
        background: url('../../../src/assets/icons/ok.png') no-repeat
      }
    }
    &:hover {
      .buttonLeft {
        background-position-y: -72px;
      }
      .buttonRight {
        background-position-y: -24px;
      }
    }
  }
  .secondWidth {
    width: 62px !important;
  }
}
</style>
