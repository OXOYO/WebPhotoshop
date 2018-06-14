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
          <!-- 标尺 -->
          <ruler class="main-ruler"></ruler>
          <!-- 画布 -->
          <div class="main-box" v-scrollBar>
            <sketchpad></sketchpad>
          </div>
          <!-- 颜色选择器 -->
          <div class="main-pop" v-show="isShowPop">
            <colorPicker></colorPicker>
          </div>
          <!-- 初始化页面 -->
          <imgstr></imgstr>
        </div>
        <div class="mainRight">
          <div class="layers-bar">
            <svg @click="showPops.showRecord=!showPops.showRecord">
              <use xlink:href="#arrow"></use>
            </svg>
          </div>
          <div class="layers" v-show="showPops.showRecord">
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
import ruler from './ruler.vue'
import imgstr from './imgstr.vue'
import { mapState } from 'vuex'
export default {
  name: 'wrapper',
  data () {
    return {}
  },
  components: {
    Nava,
    alloption,
    wptabs,
    Sketchpad,
    Bot,
    record,
    colorPicker,
    popUps,
    ruler,
    imgstr
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
      'popUpsKey',
      'showPops',
      'canvasArr'
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
        background-color: #c9d3e2;
        border-left: 1px solid #95B8E7;
        border-right: 1px solid #95B8E7;
        .main-pop {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 3;
        }
        .main-ruler {
          position: absolute;
        }
        .main-box {
          position: absolute;
          overflow: auto;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .mainRight {
        display: flex;
        .layers-bar {
          width: 15px;
          position: relative;
          svg {
            width: 15px;
            height: 12px;
            cursor: pointer;
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
