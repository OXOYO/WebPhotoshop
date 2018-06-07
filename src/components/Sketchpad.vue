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
import { mapState, mapGetters } from 'vuex'
import stroke from '../js/stroke.js'
export default {
  name: 'sketchpad',
  data () {
    return {
      wrapper: '',
      endContext: '',
      strokeEvent: this.pen,
      prtPoint: [100, 100],
      beginPoint: [0, 0],
      prvOffset: [0, 0],
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
      length: 0,
      // HSV
      hsvArr: []
    }
  },
  computed: {
    imgData: {
      get () {
        return this.nowCanvasArr.imgData
      },
      set (val) {
        this.nowCanvasArr.imgData = val
      }
    },
    canvas: {
      get () {
        return this.nowCanvasArr.canvas
      },
      set (val) {
        this.nowCanvasArr.canvas = val
      }
    },
    context: {
      get () {
        return this.nowCanvasArr.context
      },
      set (val) {
        this.nowCanvasArr.context = val
      }
    },
    // 当前画布的宽高
    canvasLen () {
      return [
        this.nowCanvasArr.width,
        this.nowCanvasArr.height
      ]
    },
    // 当前画布缩放比例
    scaleProportion () {
      return this.nowCanvasArr.scaleProportion
    },
    // 缩放画布
    scaleCanvas () {
      return {width: this.nowCanvasArr.width * this.scaleProportion + 'px'}
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
      'popUpsKey',
      'tools',
      'recent'
    ]),
    ...mapGetters([
      'nowCanvasArr'
    ])
  },
  mounted () {
    this.wrapper = document.getElementsByClassName('sketchpad')[0]
    for (var prop in stroke) {
      this[prop] = stroke[prop]
    }
    this.strokeEvent = this.pen
  },
  methods: {
    init: function () {
      this.canvas = document.getElementById(0)
      this.context = this.canvas.getContext('2d')
      this.getImageData()
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
    }
  },
  watch: {
    // 监听添加canvasArr元素
    canvasArr: function (val) {
      if (this.canvasArr.length > 0) {
        this.recent.item = false
      } else {
        this.recent.item = true
      }
      if (val.length > this.length) {
        this.$store.commit('changeNowCanvas', this.canvasArr.length - 1)
        this.$nextTick(function () {
          // DOM 更新了
          if (!this.canvas) {
            this.canvas = document.getElementById(this.nowCanvas)
            this.context = this.canvas.getContext('2d')
            this.putImageData()
          }
        })
      }
      this.length = val.length
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
        case 'Pencil':
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
