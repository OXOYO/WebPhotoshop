<template>
  <div class="borderBox">
    <!-- 窗口主体 -->
    <div class="wrapper">
      <!-- 导航栏 -->
			<nava></nava>
      <!-- 工具参数区 -->
      <alloption></alloption>
      <!-- 画布区 -->
			<div class="main">
        <wptabs></wptabs>
        <div class="mainCenter">
          <div class="main-box">
            <sketchpad></sketchpad>
          </div>
          <div class="main-pop" v-show="isShowPop">
            <colorPicker></colorPicker>
          </div>
        </div>
        <div class="mainRight">
          <div class="layers-bar">
            <div @click="operate=!operate">o p e r a t e</div>
          </div>
          <div class="layers" v-show="operate">
            <record></record>
          </div>
        </div>
			</div>
      <!-- 底部 -->
			<bot></bot>
		</div>
    <!-- 弹窗 -->
    <popUps></popUps>
  </div>
</template>

<script>
import Nava from './Nava.vue'
import alloption from './alloption.vue'
import wptabs from './wptabs.vue'
import Sketchpad from './Sketchpad.vue'
import Bot from './Bot.vue'
import record from './record.vue'
import colorPicker from './colorPicker.vue'
import popUps from './popUps.vue'
import { mapState } from 'vuex'
export default {
  name: 'wrapper',
  data () {
    return {
      operate: true
    }
  },
  components: {
    Nava,
    alloption,
    wptabs,
    Sketchpad,
    Bot,
    record,
    colorPicker,
    popUps
  },
  methods: {},
  computed: {
    isShowPop () {
      if (this.popUpsKey.colorPicker) {
        return true
      } else {
        return false
      }
    },
    ...mapState([
      'popUpsKey'
    ])
  }
}
</script>

<style lang="scss">
.borderBox {
  position: absolute;
  width: 100vw;
  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    &>div {
      min-width: 610px;
    }
    .main {
      flex: 1;
      display: flex;
      border-bottom: 1px solid #95B8E7;
      background-color: #EDF5FA;
      .mainCenter {
        flex: 1;
        position: relative;
        max-width: 100%;
        overflow: auto;
        .main-pop {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .main-box {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(201, 211, 226);
        }
      }
      .mainRight {
        display: flex;
        .layers-bar {
          width: 15px;
          position: relative;
          div {
            cursor: pointer;
            background-color: #EDF5FA;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-9px);
            font-weight: bold;
            padding: 5px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.title {
  font-weight: bold;
  color: #0E2D5F;
}
.popStyle {
  padding: 5px;
  border: 1px solid #81ADE3;
  border-radius: 5px;
  background: linear-gradient(to bottom,#EFF5FF 0,#A7C4EA 20%);
}
.recordTitle {
  margin-bottom: 5px;
}
.recordWrapper {
  border: 1px solid #81ADE3;
  background-color: #ffffff;
}
.iconOne {
  float: left;
}
.iconTwo {
  float: right;
  background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
  cursor: pointer;
}
.iconTle {
  vertical-align: top;
  padding-left: 18px;
}
</style>
