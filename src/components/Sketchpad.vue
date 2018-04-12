<template>
	<div class="sketchpad">
		<div class="canvasBox"
      @mousedown="down()"
      @mousemove="move($event)"
      @mouseup="up"
    >
      <!-- 临时画板 -->
			<canvas
        v-bind:class="{rubber: toolId===9||toolId===8}"
        v-for="(item, index) in canvasArr"
        :key="index"
        :id="index"
        :width="item.width"
        :height="item.height"
        v-show="nowCanvas===index"
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
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Effect from '../js/effect.js'
export default {
  name: 'sketchpad',
  data () {
    return {
      wrapper: '',
      canvas: '',
      context: '',
      imgData: '',
      endContext: '',
      strokeEvent: this.pen,
      prtPoint: [100, 100],
      beginPoint: [0, 0],
      prvOffset: [0, 0],
      effect: '',
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
      }
    }
  },
  computed: {
    newIndex () {
      return this.canvasArr[this.nowCanvas].index
    },
    // 监听亮度/对比度变化
    newLight () {
      return [this.canvasArr[this.nowCanvas].lightObj.data[0].num, this.canvasArr[this.nowCanvas].lightObj.data[1].num]
    },
    ...mapState([
      // 映射 this.offset 为 store.state.offset
      'offset',
      'toolsArray',
      'toolId',
      'globalColor',
      'canvasArr',
      'nowCanvas',
      'selectGrayscale'
    ])
  },
  mounted () {
    this.init(0)
    this.effect = new Effect(this)
    this.wrapper = document.getElementsByClassName('canvasBox')[0]
  },
  methods: {
    init: function (id) {
      this.canvas = this.canvasArr[id].canvas = document.getElementById(id)
      this.context = this.canvasArr[id].context = this.canvas.getContext('2d')
      if (!this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData) {
        this.getImageData()
        this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData = this.imgData
      } else {
        this.imgData = this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData
        this.putImageData()
      }
    },
    move: function (event) {
      this.prvOffset = this.offset
      if (event.target.id === 'moveBox') {
        this.offset[0] = event.offsetX + document.getElementById('moveBox').offsetLeft
        this.offset[1] = event.offsetY + document.getElementById('moveBox').offsetTop
      } else {
        this.offset[0] = event.offsetX
        this.offset[1] = event.offsetY
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
        // a.selectToolObj.canvas.removeEventListener('mousedown', a.moveBox)
      })
      function boxMove () {
        a.selectToolObj.margin = [
          a.offset[0] - a.selectToolObj.beginPoint[0] + startPonit[0],
          a.offset[1] - a.selectToolObj.beginPoint[1] + startPonit[1]
        ]
      }
    },
    // 设置RGBA
    rgba: function (a) {
      return 'rgba(' + this.globalColor[0] + ',' + this.globalColor[1] + ',' + this.globalColor[2] + ',' + a + ')'
    },
    // 绘制图形
    stroke: function () {
      this.clear()
      this.putImageData()
      this.strokeEvent()
    },
    // 擦除
    clear: function () {
      this.context.clearRect(0, 0, 820, 520)
    },
    // 获取像素信息
    getImageData: function () {
      this.imgData = this.context.getImageData(0, 0, 820, 520)
    },
    // 像素重绘
    putImageData: function () {
      this.context.putImageData(this.imgData, 0, 0)
    },
    // 线条样式
    lineCap: function (string) {
      switch (string) {
        case '粗':
          return 'butt'
        case '圆':
          return 'round'
        case '平':
          return 'square'
      }
    },
    // 绘制直线
    strokeLine: function (obj) {
      this.context.beginPath()
      this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
      this.context.lineTo(this.offset[0], this.offset[1])
      if (!obj) {
        obj = {
          lineWidth: this.toolsArray[13][0].choose,
          alpha: parseInt(this.toolsArray[13][1].choose) / 100,
          lineCap: this.lineCap(this.toolsArray[13][2].choose),
          isFill: false
        }
      }
      this.changeStyle(obj)
    },
    // 绘制矩形
    strokeRect: function (obj) {
      this.context.beginPath()
      this.context.rect(this.beginPoint[0], this.beginPoint[1], this.offset[0] - this.beginPoint[0], this.offset[1] - this.beginPoint[1])
      if (!obj) {
        obj = {
          lineWidth: this.toolsArray[15][0].choose,
          alpha: parseInt(this.toolsArray[15][1].choose) / 100,
          isFill: this.toolsArray[15][3].isCheck
        }
      }
      this.changeStyle(obj)
    },
    // 绘制圆形
    strokeArc: function () {
      var r = Math.sqrt(Math.pow((this.offset[0] - this.beginPoint[0]), 2) + Math.pow((this.offset[1] - this.beginPoint[1]), 2))
      this.context.beginPath()
      this.context.arc(this.beginPoint[0], this.beginPoint[1], r, 0, 2 * Math.PI, true)
      this.context.stroke()
    },
    // 绘制三角形
    strokeTriangular: function () {
      this.context.beginPath()
      if (this.toolsArray[17][4].choose === '直角三角形') {
        this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
        this.context.lineTo(this.beginPoint[0], this.offset[1])
        this.context.lineTo(this.offset[0], this.offset[1])
      } else {
        this.context.moveTo(this.beginPoint[0], this.beginPoint[1])
        this.context.lineTo((2 * this.beginPoint[0] - this.offset[0]), this.offset[1])
        this.context.lineTo(this.offset[0], this.offset[1])
      }
      this.context.closePath()
      var obj = {
        lineWidth: this.toolsArray[17][0].choose,
        alpha: parseInt(this.toolsArray[17][1].choose) / 100,
        isFill: this.toolsArray[17][3].isCheck
      }
      this.changeStyle(obj)
    },
    // 绘制椭圆
    strokeEllipse: function () {
      var x = this.beginPoint[0]
      var y = this.beginPoint[1]
      var a = Math.abs(this.offset[0] - this.beginPoint[0])
      var b = Math.abs(this.offset[1] - this.beginPoint[1])
      this.context.save()
      // 选择a、b中的较大者作为arc方法的半径参数
      var r = (a > b) ? a : b
      var ratioX = a / r // 横轴缩放比率
      var ratioY = b / r // 纵轴缩放比率
      this.context.scale(ratioX, ratioY) // 进行缩放（均匀压缩）
      this.context.beginPath()
      // 从椭圆的左端点开始逆时针绘制
      this.context.moveTo((x + a) / ratioX, y / ratioY)
      this.context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI)
      this.context.closePath()
      var obj = {
        lineWidth: this.toolsArray[16][0].choose,
        alpha: parseInt(this.toolsArray[16][1].choose) / 100,
        isFill: this.toolsArray[16][3].isCheck
      }
      this.changeStyle(obj)
      this.context.restore()
    },
    // 画笔
    pen: function () {
      var obj = {
        lineWidth: this.toolsArray[8][0].choose,
        alpha: parseInt(this.toolsArray[8][1].choose) / 100,
        lineCap: this.lineCap(this.toolsArray[8][2].choose),
        isFill: false
      }
      this.strokeLine(obj)
      this.getImageData()
      this.beginPoint[0] = this.offset[0]
      this.beginPoint[1] = this.offset[1]
    },
    // 选择工具
    selectTool: function () {
      this.imgData = this.selectToolObj.imgData
      this.selectToolObj.isShow = true
      this.putImageData()
      if (this.toolsArray[0][0].choose === '矩形') {
        this.selectToolObj.margin = [
          this.beginPoint[0] < this.offset[0] ? this.beginPoint[0] : this.offset[0],
          this.beginPoint[1] < this.offset[1] ? this.beginPoint[1] : this.offset[1]
        ]
        this.selectToolObj.moveBoxLen = [
          Math.abs(this.offset[0] - this.beginPoint[0]),
          Math.abs(this.offset[1] - this.beginPoint[1])
        ]
      }
    },
    // 移动工具
    moveSelectTool: function () {
      // 更新canvas
      this.$nextTick(function () {
        this.selectToolObj.canvas = document.getElementById('moveBox')
        this.selectToolObj.context = this.selectToolObj.canvas.getContext('2d')
        this.getMoveData()
        this.selectToolObj.canvas.addEventListener('mousedown', this.moveBox)
      })
    },
    // 获取移动数据
    getMoveData: function () {
      var context = this.selectToolObj.context
      var imgData = this.imgData
      var w = imgData.width
      var moveBoxData = context.getImageData(0, 0, this.selectToolObj.moveBoxLen[0], this.selectToolObj.moveBoxLen[1])
      var data = imgData.data
      var x1 = document.getElementById('moveBox').offsetLeft
      var x2 = document.getElementById('moveBox').offsetLeft + this.selectToolObj.moveBoxLen[0]
      var y1 = document.getElementById('moveBox').offsetTop
      var y2 = document.getElementById('moveBox').offsetTop + this.selectToolObj.moveBoxLen[1]
      var j = 0
      for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
          var i = (w * y + x) * 4
          moveBoxData.data[j] = data[i]
          moveBoxData.data[j + 1] = data[i + 1]
          moveBoxData.data[j + 2] = data[i + 2]
          moveBoxData.data[j + 3] = data[i + 3]
          data[i] = data[i + 1] = data[i + 2] = 255
          j += 4
        }
      }
      this.selectToolObj.moveBoxData = moveBoxData
      this.putImageData()
      context.putImageData(moveBoxData, 0, 0)
    },
    putMoveData: function () {
      var moveBoxData = this.selectToolObj.moveBoxData.data
      var x1 = document.getElementById('moveBox').offsetLeft
      var x2 = document.getElementById('moveBox').offsetLeft + this.selectToolObj.moveBoxLen[0]
      var y1 = document.getElementById('moveBox').offsetTop
      var y2 = document.getElementById('moveBox').offsetTop + this.selectToolObj.moveBoxLen[1]
      var imgData = this.imgData
      var data = imgData.data
      var w = imgData.width
      var h = imgData.height
      var k = 0
      for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
          if (x > 0 && x < w && y > 0 && y < h) {
            var i = (w * y + x) * 4
            data[i] = moveBoxData[k] === 0 ? data[i] : moveBoxData[k]
            data[i + 1] = moveBoxData[k + 1] === 0 ? data[i + 1] : moveBoxData[k + 1]
            data[i + 2] = moveBoxData[k + 2] === 0 ? data[i + 2] : moveBoxData[k + 2]
            data[i + 3] = moveBoxData[k + 3] === 0 ? data[i + 3] : moveBoxData[k + 3]
          }
          k += 4
        }
      }
      this.putImageData()
      this.selectToolObj.isShow = false
      var obj = {
        id: 1,
        imgData: imgData
      }
      this.$store.commit('changeDataArr', obj)
    },
    // 绘制参数
    changeStyle: function (obj) {
      // obj内有lineWidth, alpha, blur, isFill等参数
      for (var prop in obj) {
        switch (prop) {
          case 'lineWidth':
            this.context.lineWidth = obj.lineWidth
            break
          case 'alpha':
            this.context.fillStyle = this.rgba(obj.alpha)
            this.context.strokeStyle = this.rgba(obj.alpha)
            break
          case 'lineCap':
            this.context.lineCap = obj.lineCap
            break
          case 'isFill':
            if (obj.isFill) {
              this.context.fill()
            } else {
              this.context.stroke()
            }
        }
      }
    },
    // 绘制橡皮擦
    strokeSubber: function () {
      this.context.globalCompositeOperation = 'destination-out'
      var obj = {
        lineWidth: this.toolsArray[9][0].choose,
        isFill: false
      }
      this.strokeLine(obj)
      this.getImageData()
      this.beginPoint[0] = this.offset[0]
      this.beginPoint[1] = this.offset[1]
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
    }
  },
  watch: {
    // 改变亮度/对比度
    newLight: {
      handler (val) {
        if (this.selectGrayscale === '亮度/对比度') {
          const Brightness = val[0]
          const Contrast = val[1]
          const data = this.prvImagaData
          this.imgData = this.effect.setLight(data, Brightness, Contrast)
          this.putImageData()
        }
      },
      deep: true
    },
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
          case '亮度/对比度':
            this.prvImagaData = this.canvasArr[this.nowCanvas].dataArr[this.newIndex].imgData
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
      switch (val) {
        case 0:
          this.strokeEvent = this.selectTool
          this.selectToolObj.imgData = this.imgData
          break
        case 1:
          this.strokeEvent = ''
          this.moveSelectTool()
          break
        case 8:
          this.strokeEvent = this.pen
          break
        case 9:
          this.strokeEvent = this.strokeSubber
          break
        case 13:
          this.strokeEvent = this.strokeLine
          break
        case 15:
          this.strokeEvent = this.strokeRect
          break
        case 16:
          this.strokeEvent = this.strokeEllipse
          break
        case 17:
          this.strokeEvent = this.strokeTriangular
          break
      }
    }
  }
}
</script>

<style lang="scss">
.sketchpad {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	&>div {
		background-color: White;
		border: 1px solid #95B8E7;
		box-shadow: 3px 3px 4px #95B8E7;
    position: relative;
    overflow: hidden;
    canvas {
      cursor: crosshair;
      vertical-align: top;
    }
    .rubber {
      cursor: url('../../src/assets/icons/rubber.png'), auto;
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
}
</style>
