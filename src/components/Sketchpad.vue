<template>
	<div class="sketchpad">
		<div @mousemove="move($event)">
      <!-- 临时画板 -->
			<canvas
        @mousedown="down($event)"
        @mouseup="up"
        v-bind:class="{rubber: toolId===9||toolId===8}"
        v-for="item in canvasArr"
        :key="item.id"
        :id="item.id"
        :width="item.width"
        :height="item.height"
        v-show="nowCanvas===item.id"
      ></canvas>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sketchpad',
  data () {
    return {
      canvas: '',
      context: '',
      endContext: '',
      prtPoint: [100, 100],
      beginPoint: [0, 0],
      prvOffset: [0, 0]
    }
  },
  computed: {
    strokeEvent: function () {
      switch (this.toolId) {
        case 0:
          return this.selectTool
        case 8:
          return this.pen
        case 9:
          return this.strokeSubber
        case 13:
          return this.strokeLine
        case 15:
          return this.strokeRect
        case 16:
          return this.strokeEllipse
        case 17:
          return this.strokeTriangular
      }
    },
    ...mapState([
      // 映射 this.offset 为 store.state.offset
      'offset',
      'toolsArray',
      'toolId',
      'globalColor',
      'canvasArr',
      'nowCanvas'
    ])
  },
  mounted () {
    this.init(0)
  },
  methods: {
    init: function (id) {
      this.canvas = document.getElementById(id)
      this.context = this.canvas.getContext('2d')
      this.context.translate(0.5, 0.5)
      if (this.canvasArr[this.nowCanvas].imgData) {
        this.putImageData()
      } else {
        this.getImageData()
      }
    },
    move: function (event) {
      this.prvOffset = this.offset
      this.offset[0] = event.offsetX
      this.offset[1] = event.offsetY
      this.$store.commit('changeOffset', this.offset)
    },
    down: function (event) {
      this.beginPoint[0] = event.offsetX
      this.beginPoint[1] = event.offsetY
      this.context.fillStyle = this.rgba(1)
      this.context.strokeStyle = this.rgba(1)
      this.context.lineWidth = 1
      this.context.setLineDash([0])
      this.context.globalCompositeOperation = 'source-over'
      this.context.lineCap = 'round'
      this.canvas.addEventListener('mousemove', this.stroke)
    },
    up: function () {
      this.canvas.removeEventListener('mousemove', this.stroke)
      if (this.toolId) this.getImageData()
      this.prtPoint = this.offset
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
      this.canvasArr[this.nowCanvas].imgData = this.context.getImageData(0, 0, 820, 520)
    },
    // 像素重绘
    putImageData: function () {
      this.context.putImageData(this.canvasArr[this.nowCanvas].imgData, 0, 0)
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
      } else {
        obj = {
          isFill: false
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
      this.context.setLineDash([3])
      if (this.toolsArray[0][0].choose === '矩形') {
        this.strokeRect()
      } else {
        this.strokeArc()
      }
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
    }
  },
  watch: {
    canvasArr: function () {
      this.$nextTick(function () {
        // DOM 更新了
        this.$store.commit('changeNowCanvas', this.canvasArr.length - 1)
      })
    },
    nowCanvas: function (val) {
      this.init(val)
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
    canvas {
      cursor: crosshair;
    }
    .rubber {
      cursor: url('../../src/assets/icons/rubber.png'), auto;
    }
	}
}
</style>
