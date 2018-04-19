<template>
  <div class="popUps" :class="{backColor: selectGrayscale!=='亮度/对比度'}" v-show="isShow">
    <!-- 新建 -->
    <div class="newCanvas popStyle" v-show="popUpsKey.newCanvas">
      <div class="recordTitle">
        <span class="iconOne icon"></span>
        <span class="iconTwo icon" @click="close('newCanvas')"></span>
        <div class="iconTle title">新建</div>
      </div>
      <div class="recordWrapper">
        <div class="newCanvasInput">
          <div class="inputOne">
            <span>名称：</span>
            <input type="text" v-model="canvasObj.name">
          </div>
          <div>
            <span>高度：</span>
            <div class="spinner">
              <input class="spinnerInput" v-model="canvasObj.height">
              <div class="spinnerArrow">
                <div class="spinnerArrowUp" @click="changeInput('height', 'add')"></div>
                <div class="spinnerArrowDown" @click="changeInput('height', 'down')"></div>
              </div>
            </div>
            <span>像素</span>
          </div>
          <div>
            <span>宽度：</span>
            <div class="spinner">
              <input class="spinnerInput" v-model="canvasObj.width">
              <div class="spinnerArrow">
                <div class="spinnerArrowUp" @click="changeInput('width', 'add')"></div>
                <div class="spinnerArrowDown" @click="changeInput('width', 'down')"></div>
              </div>
            </div>
            <span>像素</span>
          </div>
        </div>
        <div class="newCanvasButton">
          <buttonIcon :type="'closeSecond'" :callback="close"></buttonIcon>
          <buttonIcon :type="'defineSecond'" :callback="add"></buttonIcon>
        </div>
      </div>
    </div>
    <!-- 关闭 -->
    <div class="closeCanvas popStyle" v-show="popUpsKey.closeCanvas">
      <div class="recordTitle">
        <span class="iconTwo icon" @click="close('closeCanvas')"></span>
        <div class="iconTle title">确定</div>
      </div>
      <div class="recordWrapper">
        <div class="closeCanvasTle">
          <span class="closeCanvasIcon"></span>
          <span class="closeCanvasCon">图片未保存，确定关闭？</span>
        </div>
        <div class="closeCanvasBtn">
          <buttonIcon :type="'defineFirst'" :callback="popCanvas"></buttonIcon>
          <buttonIcon :type="'closeFirst'" :callback="close" :prop="'closeCanvas'"></buttonIcon>
        </div>
      </div>
    </div>
    <!-- 清空 -->
    <div class="closeCanvas popStyle" v-show="popUpsKey.clearCanvas">
      <div class="recordTitle">
        <span class="iconTwo icon" @click="close('clearCanvas')"></span>
        <div class="iconTle title">确定</div>
      </div>
      <div class="recordWrapper">
        <div class="closeCanvasTle">
          <span class="closeCanvasIcon"></span>
          <span class="closeCanvasCon">确定清空当前画布？</span>
        </div>
        <div class="closeCanvasBtn">
          <buttonIcon :type="'defineFirst'" :callback="clearCanvas"></buttonIcon>
          <buttonIcon :type="'closeFirst'" :callback="close" :prop="'clearCanvas'"></buttonIcon>
        </div>
      </div>
    </div>
    <!-- fieldset -->
    <fieldSet></fieldSet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import buttonIcon from './selectmodules/buttonIcon.vue'
import fieldSet from './selectmodules/fieldSet.vue'
export default {
  name: 'pop-ups',
  components: {
    buttonIcon,
    fieldSet
  },
  data () {
    return {
      canvasObj: {
        name: '新建画布',
        width: 820,
        height: 520,
        context: '',
        canvas: '',
        dataArr: [{
          id: 34,
          imgData: ''
        }],
        index: 0,
        lightObj: {
          name: 'light',
          title: '亮度/对比度',
          data: [{
            title: '亮度',
            num: 0,
            len: [-50, 50]
          }, {
            title: '对比度',
            num: 0,
            len: [-50, 50]
          }]
        }
      }
    }
  },
  computed: {
    ...mapState([
      'canvasArr',
      'popUpsKey',
      'nowCanvas',
      'selectGrayscale'
    ]),
    isShow () {
      var a = false
      for (const key in this.popUpsKey) {
        if (this.popUpsKey[key]) {
          a = true
          break
        }
      }
      return a
    }
  },
  methods: {
    close (prop) {
      this.$store.commit('changePopUpsKey', [prop, false])
    },
    add () {
      this.$store.commit('addCanvasArr', JSON.parse(JSON.stringify(this.canvasObj)))
      this.close('newCanvas')
    },
    changeInput (prop, key) {
      if (key === 'add') {
        this.canvasObj[prop]++
      } else {
        this.canvasObj[prop]--
      }
    },
    popCanvas () {
      this.$store.commit('popCanvasArr', this.nowCanvas)
      this.close('closeCanvas')
    },
    // 清空画布
    clearCanvas () {
      this.$store.commit('clearCanvas')
      this.close('clearCanvas')
    }
  }
}
</script>

<style lang="scss">
.backColor {
  background-color: rgba(204, 204, 204, 0.4);
}
.popUps {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  .newCanvas {
    width: 288px;
    .recordTitle {
      .iconOne {
        background: url('../../src/assets/icons/new.png') no-repeat center center;
      }
    }
    .recordWrapper {
      height: 165px;
      .newCanvasInput {
        height: 130px;
        &>div {
          display: flex;
          align-items: center;
          padding: 5px 0 5px 45px;
          span {
            font-size: 13px;
            padding-left: 5px;
          }
          .spinner {
            border: 1px solid #95B8E7;
            display: flex;
            align-items: center;
            .spinnerInput {
              border: none;
              padding: 0 2px;
              width: 56px;
              height: 20px;
              outline: none;
            }
            .spinnerArrow {
              width: 18px;
              height: 20px;
              background-color: #E0ECFF;
              div {
                height: 10px;
              }
              .spinnerArrowUp {
                background: url('../../src/assets/default/spinner_arrows.png') no-repeat 1px center;
              }
              .spinnerArrowDown {
                background: url('../../src/assets/default/spinner_arrows.png') no-repeat -15px center;
              }
            }
          }
        }
        .inputOne {
          input {
            border: 1px solid #95B8E7;
          }
        }
      }
      .newCanvasButton {
        height: 34px;
        border-top: 1px solid #CBC6C6;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        &>div {
          padding-right: 5px;
        }
      }
    }
  }
  .closeCanvas {
    width: 288px;
    .recordWrapper {
      height: 76px;
      padding: 10px;
      .closeCanvasTle {
        .closeCanvasIcon {
          display: inline-block;
          width: 32px;
          height: 32px;
          background: url('../../src/assets/default/messager_icons.png') no-repeat scroll -32px 0;
        }
        .closeCanvasCon {
          vertical-align: top;
          font-size: 13px;
          padding-left: 5px;
        }
      }
      .closeCanvasBtn {
        margin-top: 17px;
        display: flex;
        justify-content: center;
        &>div {
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
