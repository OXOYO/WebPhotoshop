<template>
  <popSlot :name="name" :title="lightArr.title" :prop="name">
    <div class="recordWrapper fieldset">
      <div class="fieldsetTop">
        <fieldset class="fieldsetBox" v-for="(item, index) in lightArr.data" :key="item.id">
          <legend>{{item.title}}</legend>
          <div class="controlBox">
            <div class="slider" :class="name+'slider'" @mousedown="moveRound($event, index)">
              <div class="sliderInner"></div>
              <div class="sliderTip" :style="{left: left[index]+'px'}">
                <div class="sliderNum">{{item.num}}</div>
                <div class="sliderTipRound"></div>
              </div>
            </div>
            <div class="sliderRule">
              <span style="left: 0%;"></span>
              <span style="left: 12.5%;"></span>
              <span style="left: 25%;"></span>
              <span style="left: 37.5%;"></span>
              <span style="left: 50%;"></span>
              <span style="left: 62.5%;"></span>
              <span style="left: 75%;"></span>
              <span style="left: 87.5%;"></span>
              <span style="left: 100%;"></span>
            </div>
            <div class="sliderRulelabel">
              <span :style="{left: a[0]}" v-for="a in rulelabel(item.len)" :key="a.id">{{a[1]}}</span>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fieldsetBtn">
        <buttonIcon :type="'closeSecond'" :callback="close" :prop="name"></buttonIcon>
        <buttonIcon :type="'defineSecond'" :callback="close" :prop="name"></buttonIcon>
      </div>
    </div>
  </popSlot>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import buttonIcon from './buttonIcon.vue'
import popSlot from '../../components/popSlot.vue'
import effect from '../../js/effect.js'
import translateColorStyle from '../../js/tranlateColorStyle.js'
export default {
  name: 'field-set',
  data () {
    return {
      index: '',
      imgData: '',
      left: [130, 130],
      num: [0, 0],
      // HSV
      hsvArr: [],
      // 亮度/对比度
      light: {
        name: 'light',
        title: '亮度/对比度',
        data: [{
          title: '亮度',
          num: 0,
          len: [-150, 150]
        }, {
          title: '对比度',
          num: 0,
          len: [-100, 100]
        }]
      },
      // 色相/饱和度
      colorpalettes: {
        name: 'colorpalettes',
        title: '色相/饱和度',
        data: [{
          title: '色相',
          num: 0,
          len: [-180, 180]
        }, {
          title: '饱和度',
          num: 0,
          len: [-100, 100]
        }]
      }
    }
  },
  props: ['name'],
  components: {
    buttonIcon,
    popSlot
  },
  computed: {
    ...mapState([
      'popUpsKey',
      'canvasArr',
      'nowCanvas'
    ]),
    ...mapGetters([
      'nowCanvasArr'
    ]),
    isShow () {
      return [this.popUpsKey.light, this.popUpsKey.colorpalettes]
    },
    lightArr () {
      return this.name === 'light' ? this.light : this.colorpalettes
    }
  },
  methods: {
    close (prop) {
      if (prop === this.name) {
        // 取消
        this.lightArr.data[0].num = this.num[0]
        this.lightArr.data[1].num = this.num[1]
        this.left[0] = (this.num[0] + 50) / 100 * 260
        this.left[1] = (this.num[1] + 50) / 100 * 260
      } else {
        // 确定
        this.num[0] = this.lightArr.data[0].num
        this.num[1] = this.lightArr.data[1].num
        var obj = {
          id: this.name === 'light' ? 35 : 34,
          imgData: this.canvasArr[this.nowCanvas].imgData
        }
        this.$store.commit('changeDataArr', obj)
      }
      this.$store.commit('changePopUpsKey', [this.name, false])
    },
    moveRound (event, index) {
      var clientX = document.getElementsByClassName(this.name + 'slider')[index].getBoundingClientRect().left
      this.index = index
      var obj = this
      move(event)
      document.body.addEventListener('mousemove', move)
      document.body.addEventListener('mouseup', up)
      function move (e) {
        var x = e.clientX - clientX
        if (x >= 0 && x <= 260) {
          obj.left[index] = x
          obj.leftToTip(x)
        }
      }
      function up () {
        document.body.removeEventListener('mousemove', move)
        document.body.removeEventListener('mouseup', up)
      }
    },
    rulelabel (arr) {
      var len = arr[1] - arr[0]
      var s = arr[0]
      return [['0%', s], ['25%', 0.25 * len + s], ['50%', 0.5 * len + s], ['75%', 0.75 * len + s], ['100%', arr[1]]]
    },
    leftToTip (x) {
      var arr = this.lightArr.data[this.index].len
      this.lightArr.data[this.index].num = Math.round(x / 260 * (arr[1] - arr[0]) + arr[0])
      if (this.name === 'light') {
        this.light_canvas()
      } else {
        this.colorpalettes_canvas()
      }
    },
    // 将实时的亮度对比度反馈到画布上
    light_canvas () {
      const Brightness = this.lightArr.data[0].num
      const Contrast = this.lightArr.data[1].num
      // 处理后的像素信息
      const imgData = effect.setLight(this.imgData, Brightness, Contrast)
      // 更新像素信息数组和画布
      this.nowCanvasArr.imgData = imgData
      this.nowCanvasArr.context.putImageData(imgData, 0, 0)
    },
    // 将实时的色相饱和度反馈到画布上
    colorpalettes_canvas () {
      const val = [this.lightArr.data[0].num, this.lightArr.data[1].num]
      var outImgdata = this.nowCanvasArr.context.createImageData(this.imgData)
      var data = outImgdata.data
      for (let i = 0, n = data.length; i < n; i += 4) {
        var j = i / 4 * 3
        var H = (this.hsvArr[j] + val[0]) > 360 ? 360 : ((this.hsvArr[j] + val[0]) < 0 ? 0 : this.hsvArr[j] + val[0])
        var S = (this.hsvArr[j + 1] + val[1] / 200) > 1 ? 1 : ((this.hsvArr[j + 1] + val[1] / 200) < 0 ? 0 : (this.hsvArr[j + 1] + val[1] / 200))
        var rgb = translateColorStyle.hsvToRgb({
          H: H,
          S: S,
          V: this.hsvArr[j + 2]
        })
        data[i] = rgb.R
        data[i + 1] = rgb.G
        data[i + 2] = rgb.B
        data[i + 3] = 255
      }
      // 更新像素信息数组和画布
      this.nowCanvasArr.imgData = outImgdata
      this.nowCanvasArr.context.putImageData(outImgdata, 0, 0)
    },
    // 将RGB转为HSV
    toHsv () {
      var data = this.imgData.data
      for (let i = 0, n = data.length; i < n; i += 4) {
        var rgb = translateColorStyle.rgbTohsv({
          R: data[i],
          G: data[i + 1],
          B: data[i + 2]
        })
        this.hsvArr.push(rgb.H, rgb.S, rgb.V)
      }
    }
  },
  watch: {
    isShow: {
      handler (val) {
        this.imgData = this.nowCanvasArr.imgData
        if (val[1]) {
          this.toHsv()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.fieldset {
  height: 235px;
  width: 308px;
  .fieldsetTop {
    height: 200px;
    overflow: hidden;
    .fieldsetBox {
      height: 80px;
      margin: 10px;
      padding: 0;
      .controlBox {
        width: 260px;
        margin: 0 auto;
        margin-top: 10px;
        .slider {
          width: 260px;
          height: 22px;
          position: relative;
          .sliderInner {
            height: 6px;
            background: #C6DBF7;
            border: 1px solid #95B8E7;
            border-radius: 5px;
            position: absolute;
            width: 258px;
            top: 7px;
          }
          .sliderTip {
            position: absolute;
            width: 20px;
            top: -15px;
            transform: translateX(-50%);
            .sliderNum {
              text-align: center;
            }
            .sliderTipRound {
              height: 20px;
              cursor: pointer;
              background: url('../../../src/assets/default/slider_handle.png') no-repeat;
            }
          }
        }
        .sliderRule {
          position: relative;
          width: 100%;
          top: 2px;
          span {
            position: absolute;
            display: inline-block;
            height: 5px;
            border-left: 1px solid #95B8E7;
          }
        }
        .sliderRulelabel {
          position: relative;
          top: 10px;
          span {
            position: absolute;
            display: inline-block;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  .fieldsetBtn {
    height: 34px;
    border-top: 1px solid #CBC6C6;
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &>div {
      padding-right: 5px;
    }
  }
}
</style>
