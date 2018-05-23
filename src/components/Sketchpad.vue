<template>
	<div
    class="sketchpad"
    @mousedown="down()"
    @mousemove="move($event)"
    @mouseup="up"
  >
    <canvas
      v-bind:class="{rubber: toolId===9||toolId===8}"
      v-for="(item, index) in canvasArr"
      :key="index"
      :id="index"
      :width="item.width"
      :height="item.height"
      v-show="nowCanvas===index"
      :style="scaleCanvas"
    ></canvas>
    <canvas
      id="moveBox"
      v-show="selectToolObj.isShow"
      :style="{left: selectToolObj.margin[0] + 'px', top: selectToolObj.margin[1] + 'px'}"
      :width="selectToolObj.moveBoxLen[0]"
      :height="selectToolObj.moveBoxLen[1]"
      :class="{cursorMove: toolId === 1}"
    ></canvas>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Effect from '../js/effect.js'
import stroke from '../js/stroke.js'
import translateColorStyle from '../js/tranlateColorStyle'
export default {
  name: 'sketchpad',
  data () {
    return {
      wrapper: '',
      imgData: '',
      endContext: '',
      strokeEvent: this.pen,
      prtPoint: [100, 100],
      beginPoint: [0, 0],
      prvOffset: [0, 0],
      effect: '',
      strokeFunction: '',
      prvImagaData: {},
      selectToolObj: {
        canvas: '',
        context: '',
        data: {
          imgData: '',
          moveBoxData: ''
        },
        margin: [0, 0],
        // moveBox的宽高
        moveBoxLen: [0, 0],
        isShow: false,
        oldId: ''
      },
      // HSV
      hsvArr: []
    }
  },
  computed: {
    canvas: {
      get () {
        return this.canvasArr[this.nowCanvas].canvas
      },
      set (val) {
        this.canvasArr[this.nowCanvas].canvas = val
      }
    },
    context: {
      get () {
        return this.canvasArr[this.nowCanvas].context
      },
      set (val) {
        this.canvasArr[this.nowCanvas].context = val
      }
    },
    newIndex () {
      return this.canvasArr[this.nowCanvas].index
    },
    // 当前画布imgData
    canvasImageData: {
      get () {
        return this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData
      },
      set (val) {
        this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData = val
      }
    },
    // 当前画布的宽高
    canvasLen () {
      return [
        this.canvasArr[this.nowCanvas].width,
        this.canvasArr[this.nowCanvas].height
      ]
    },
    // 当前画布缩放比例
    scaleProportion () {
      return this.canvasArr[this.nowCanvas].scaleProportion
    },
    // 缩放画布
    scaleCanvas () {
      return {width: this.canvasArr[this.nowCanvas].width * this.scaleProportion + 'px'}
    },
    // 监听亮度/对比度变化
    newLight () {
      return [this.canvasArr[this.nowCanvas].light.data[0].num, this.canvasArr[this.nowCanvas].light.data[1].num]
    },
    // 监听色相/饱和度变化
    newColorpalettes () {
      return [this.canvasArr[this.nowCanvas].colorpalettes.data[0].num, this.canvasArr[this.nowCanvas].colorpalettes.data[1].num]
    },
    // 监听是否开始调整功能
    openChange () {
      return [this.popUpsKey.light, this.popUpsKey.colorpalettes]
    },
    // 当前工具具体参数
    toolsArray () {
      return this.tools[this.toolId].parameter
    },
    ...mapState([
      // 映射 this.offset 为 store.state.offset
      'offset',
      'toolId',
      'globalColor',
      'canvasArr',
      'nowCanvas',
      'selectGrayscale',
      'popUpsKey',
      'tools'
    ])
  },
  mounted () {
    this.init(0)
    this.effect = new Effect(this)
    this.wrapper = document.getElementsByClassName('sketchpad')[0]
    for (var prop in stroke) {
      this[prop] = stroke[prop]
    }
    for (let prop in translateColorStyle) {
      this[prop] = translateColorStyle[prop]
    }
    this.strokeEvent = this.pen
  },
  methods: {
    init: function (id) {
      if (!this.canvas) {
        this.canvas = document.getElementById(id)
      }
      if (!this.context) {
        this.context = this.canvas.getContext('2d')
      }
      if (!this.canvasImageData) {
        this.getImageData()
        this.canvasImageData = this.imgData
      } else {
        this.imgData = this.canvasImageData
        this.putImageData()
      }
    },
    move: function (event) {
      this.prvOffset = this.offset
      if (event.target.id === 'moveBox') {
        this.offset[0] = (event.offsetX + document.getElementById('moveBox').offsetLeft) / this.scaleProportion
        this.offset[1] = (event.offsetY + document.getElementById('moveBox').offsetTop) / this.scaleProportion
      } else {
        this.offset[0] = event.offsetX / this.scaleProportion
        this.offset[1] = event.offsetY / this.scaleProportion
      }
      this.$store.commit('changeOffset', this.offset)
    },
    down: function () {
      if (!this.strokeEvent) return
      this.beginPoint[0] = this.offset[0]
      this.beginPoint[1] = this.offset[1]
      this.context.fillStyle = this.rgba(1)
      this.context.strokeStyle = this.rgba(1)
      this.context.lineWidth = 1
      this.context.globalCompositeOperation = 'source-over'
      this.context.lineCap = 'round'
      this.wrapper.addEventListener('mousemove', this.stroke, true)
    },
    up: function () {
      this.wrapper.removeEventListener('mousemove', this.stroke, true)
      this.getImageData()
      this.prtPoint = this.offset
      if (!this.strokeEvent || this.toolId === 1) return
      var obj = {
        id: this.toolId,
        imgData: this.imgData
      }
      this.$store.commit('changeDataArr', obj)
    },
    // 移动moveBox
    moveBox: function (event) {
      this.selectToolObj.beginPoint = [this.offset[0], this.offset[1]]
      var startPonit = [
        document.getElementById('moveBox').offsetLeft,
        document.getElementById('moveBox').offsetTop
      ]
      var a = this
      this.wrapper.addEventListener('mousemove', boxMove)
      this.wrapper.addEventListener('mouseup', function () {
        a.wrapper.removeEventListener('mousemove', boxMove)
      })
      function boxMove () {
        a.selectToolObj.margin = [
          a.offset[0] - a.selectToolObj.beginPoint[0] + startPonit[0],
          a.offset[1] - a.selectToolObj.beginPoint[1] + startPonit[1]
        ]
      }
    },
    // 绘制图形
    stroke: function () {
      this.clear()
      this.putImageData()
      this.strokeEvent()
    },
    // 获取像素信息
    getImageData: function () {
      this.imgData = this.context.getImageData(0, 0, this.canvasLen[0], this.canvasLen[1])
    },
    // 像素重绘
    putImageData: function () {
      this.context.putImageData(this.imgData, 0, 0)
    },
    // 绘制图像
    drawImage: function (img) {
      this.context.drawImage(img, 0, 0)
      this.getImageData()
    },
    // 效果
    drawImg: function (string, index) {
      this.imgData = this.effect[string](this.imgData)
      this.putImageData()
      var obj = {
        id: index,
        imgData: this.imgData
      }
      this.$store.commit('changeDataArr', obj)
    },
    // 将RGB转为HSV
    toHsv () {
      var data = this.imgData.data
      for (let i = 0, n = data.length; i < n; i += 4) {
        var rgb = this.rgbTohsv({
          R: data[i],
          G: data[i + 1],
          B: data[i + 2]
        })
        this.hsvArr.push(rgb.H, rgb.S, rgb.V)
      }
    }
  },
  watch: {
    openChange: {
      handler (val) {
        if (val[0] || val[1]) {
          this.prvImagaData = this.imgData
          if (val[1]) this.toHsv()
        }
      },
      deep: true
    },
    // 改变亮度/对比度
    newLight: {
      handler (val) {
        if (this.openChange[0]) {
          const Brightness = val[0]
          const Contrast = val[1]
          const data = this.prvImagaData
          this.imgData = this.effect.setLight(data, Brightness, Contrast)
          this.putImageData()
        }
      },
      deep: true
    },
    // 改变色相/饱和度
    newColorpalettes: {
      handler (val) {
        if (this.openChange[1]) {
          var outImgdata = this.context.createImageData(this.prvImagaData)
          var data = outImgdata.data
          for (let i = 0, n = data.length; i < n; i += 4) {
            var j = i / 4 * 3
            var H = (this.hsvArr[j] + val[0]) > 360 ? 360 : ((this.hsvArr[j] + val[0]) < 0 ? 0 : this.hsvArr[j] + val[0])
            var S = (this.hsvArr[j + 1] + val[1] / 200) > 1 ? 1 : ((this.hsvArr[j + 1] + val[1] / 200) < 0 ? 0 : (this.hsvArr[j + 1] + val[1] / 200))
            var rgb = this.hsvToRgb({
              H: H,
              S: S,
              V: this.hsvArr[j + 2]
            })
            data[i] = rgb.R
            data[i + 1] = rgb.G
            data[i + 2] = rgb.B
            data[i + 3] = 255
          }
          this.imgData = outImgdata
          this.putImageData()
        }
      },
      deep: true
    },
    // 监听添加canvasArr元素
    canvasArr: function () {
      this.$nextTick(function () {
        // DOM 更新了
        this.$store.commit('changeNowCanvas', this.canvasArr.length - 1)
      })
    },
    nowCanvas: function (val) {
      this.init(val)
    },
    selectGrayscale: function (val) {
      if (val) {
        switch (val) {
          case '黑白':
            this.drawImg('setBlack', 22)
            break
          case '反色':
            this.drawImg('setInverted', 23)
            break
          case '模糊':
            this.drawImg('gaussBlur', 25)
            break
          case '锐化':
            this.drawImg('setSharpen', 27)
            break
          case '浮雕':
            this.drawImg('setRelief', 28)
            break
          case '柔化':
            this.drawImg('setSoften', 29)
            break
          case '雕刻':
            this.drawImg('setSculpture', 32)
            break
          case '怀旧':
            this.drawImg('setNostalgia', 33)
            break
        }
      }
    },
    newIndex (val) {
      if (this.canvasArr[this.nowCanvas].dataArr[val].imgData) {
        this.imgData = this.canvasArr[this.nowCanvas].dataArr[val].imgData
        this.putImageData()
        if (this.selectGrayscale === '亮度/对比度') {
          this.prvImagaData = this.canvasArr[this.nowCanvas].dataArr[val].imgData
        }
      }
    },
    imgData (val) {
      this.canvasArr[this.nowCanvas].imgData = this.imgData
    },
    toolId (val, oldVal) {
      this.selectToolObj.oldId = oldVal
      if (oldVal === 1) {
        this.putMoveData()
      }
      switch (this.tools[val].name) {
        case 'Select':
          this.strokeEvent = this.selectTool
          this.selectToolObj.imgData = this.imgData
          break
        case 'Move':
          this.strokeEvent = ''
          this.moveSelectTool()
          break
        case 'PaintBrush':
          this.strokeEvent = this.pen
          break
        case 'Eraser':
          this.strokeEvent = this.strokeSubber
          break
        case 'Line':
          this.strokeEvent = this.strokeLine
          break
        case 'Rectangle':
          this.strokeEvent = this.strokeRect
          break
        case 'Ellipse':
          this.strokeEvent = this.strokeEllipse
          break
        case 'Triangle':
          this.strokeEvent = this.strokeTriangular
          break
        default:
          this.strokeEvent = ''
          break
      }
    }
  }
}
</script>

<style lang="scss">
.sketchpad {
  background-color: White;
  border: 1px solid #95B8E7;
  box-shadow: 3px 3px 4px #95B8E7;
  cursor: crosshair;
  position: relative;
  canvas {
    vertical-align: top;
  }
  .rubber {
    cursor: url('../../src/assets/icons/rubber.png'), auto;
  }
  #temporaryCanvas {
    position: absolute;
    top: 0;
  }
  #moveBox {
    position: absolute;
    z-index: 100;
    border: 1px dashed #000;
    transform: translateX(-1px) translateY(-1px);
  }
  .cursorMove {
    cursor: Move;
  }
}
</style>
