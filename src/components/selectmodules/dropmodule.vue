<template>
  <div>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;{{optionalObj.title}}：</span>
    <div class="selectBox">
      <div class="selectBoxDef">
        <span class="selectBoxCon">{{optionalObj.choose}}</span>
        <span class="selectBoxBtn" @click="hideBox"></span>
      </div>
      <div class="selectBoxHid" v-show="isShow">
        <div v-for="item in optionalObj.optional" :key="item.id" @click="change($event)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropmodule',
  props: ['optionalObj'],
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    change: function (event) {
      this.optionalObj.choose = event.target.innerText
      this.isShow = false
    },
    hideBox: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss">
.selectBox {
  position: relative;
  .selectBoxDef {
    display: flex;
    border: 1px solid #95B8E7;
    align-items: center;
    .selectBoxCon {
      padding: 0 2px;
    }
    .selectBoxBtn {
      display: inline-block;
      width: 18px;
      height: 20px;
      background: url('../../../src/assets/default/combo_arrow.png') no-repeat center center;
      background-color: #E0ECFF;
      cursor: pointer;
    }
  }
  .selectBoxHid {
    border: 1px solid #5F98EA;
    position: absolute;
    width: 100%;
    background-color: #fff;
    z-index: 111;
    box-sizing: border-box;
    div {
      box-sizing: border-box;
      padding: 3px;
    }
  }
}
</style>
