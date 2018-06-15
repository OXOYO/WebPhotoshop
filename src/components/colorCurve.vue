<template>
  <div class="curveWrapper" v-show="mainPopKey.colorCurve">
    <div class="curvetool">
      <div class="curveSelect">
        <div class="selectOne" :class="{selectStyle: type==='rgb'}" @click="changeType('rgb')">RGB</div>
        <div class="selectTwo" :class="{selectStyle: type==='r'}" @click="changeType('r')">R</div>
        <div class="selectTwo" :class="{selectStyle: type==='g'}" @click="changeType('g')">G</div>
        <div class="selectTwo" :class="{selectStyle: type==='b'}" @click="changeType('b')">B</div>
      </div>
      <div class="curveBox">
        <div class="boxLeft">
          <input type="text" v-model="inputOutY">
          <input type="text" v-model="inputOutX">
        </div>
        <div class="boxRight">
          <div class="boxBackground">
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="bottom"></div>
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="bottom"></div>
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="right bottom"></div>
            <div class="bottom"></div>
            <div class="right"></div>
            <div class="right"></div>
            <div class="right"></div>
            <div></div>
          </div>
          <div class="canvasCurveBox" @mousedown="down">
            <div v-show="type==='r'">
              <canvas width="510" height="510" class="rCurve"></canvas>
            </div>
            <div v-show="type==='g'">
              <canvas width="510" height="510" class="gCurve"></canvas>
            </div>
            <div v-show="type==='b'">
              <canvas width="510" height="510" class="bCurve"></canvas>
            </div>
            <div v-show="type==='rgb'">
              <canvas width="510" height="510" class="rgbCurve"></canvas>
            </div>
            <div class="moveline" :class="boderColor">
              <!-- 上 -->
              <div class="horizontal"
                :style="{top: 255-inputOutY+'px'}"
                @mousedown="moveHorizontal($event, 'top')"
              >
                <div class="tran"></div>
                <div class="line"></div>
                <div class="tran"></div>
              </div>
              <!-- 下 -->
              <div class="horizontal"
                :style="{top: 255-inputOutX+'px'}"
                @mousedown="moveHorizontal($event, 'bottom')"
              >
                <div class="tran"></div>
                <div class="line"></div>
                <div class="tran"></div>
              </div>
              <!-- 左 -->
              <div class="vertical"
                :style="{left: inputInX+'px'}"
                @mousedown="moveHorizontal($event, 'left')"
              >
                <div class="tran"></div>
                <div class="line"></div>
                <div class="tran"></div>
              </div>
              <!-- 右 -->
              <div class="vertical"
                :style="{left: inputInY+'px'}"
                @mousedown="moveHorizontal($event, 'right')"
              >
                <div class="tran"></div>
                <div class="line"></div>
                <div class="tran"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxBelow">
          <input type="text" v-model="inputInX">
          <input type="text" v-model="inputInY">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popSlot from './popSlot.vue'
export default {
  name: 'colorcurve',
  data () {
    return {
      canvasBox: '',
      // 输入
      inputInX: 0,
      inputInY: 255,
      // 输出
      inputOutX: 0,
      inputOutY: 255,
      // RGB/R/G/B
      type: 'rgb',
      // 直方图数据
      histogramData: '',
      // RGB,R,G,B的关键点坐标和各个画布和曲线context
      allCanvasData: {
        rgb: {
          point: [[0, 510], [0, 510]],
          context: ''
        },
        r: {
          point: [[0, 510], [0, 510]],
          context: ''
        },
        g: {
          point: [[0, 510], [0, 510]],
          context: ''
        },
        b: {
          point: [[0, 510], [0, 510]],
          context: ''
        }
      },
      // 画布数据
      imgData: '',
      partImgData: '',
      // 是否修改
      isChange: false,
      key: false
    }
  },
  mounted () {
    this.canvasBox = document.getElementsByClassName('canvasCurveBox')[0]
    // RGB
    this.allCanvasData.rgb.context = document.getElementsByClassName('rgbCurve')[0].getContext('2d')
    this.allCanvasData.rgb.context.strokeStyle = 'rgb(0, 0, 0)'
    this.allCanvasData.rgb.context.fillStyle = 'rgba(0, 0, 0, 0.2)'
    // R
    this.allCanvasData.r.context = document.getElementsByClassName('rCurve')[0].getContext('2d')
    this.allCanvasData.r.context.strokeStyle = 'rgb(255, 0, 0)'
    this.allCanvasData.r.context.fillStyle = 'rgba(255, 0, 0, 0.2)'
    // G
    this.allCanvasData.g.context = document.getElementsByClassName('gCurve')[0].getContext('2d')
    this.allCanvasData.g.context.strokeStyle = 'rgb(0, 255, 0)'
    this.allCanvasData.g.context.fillStyle = 'rgba(0, 255, 0, 0.2)'
    // B
    this.allCanvasData.b.context = document.getElementsByClassName('bCurve')[0].getContext('2d')
    this.allCanvasData.b.context.strokeStyle = 'rgb(0, 0, 255)'
    this.allCanvasData.b.context.fillStyle = 'rgba(0, 0, 255, 0.2)'
  },
  components: {
    popSlot
  },
  computed: {
    // boder-color
    boderColor () {
      switch (this.type) {
        case 'r':
          return 'borderRed'
        case 'g':
          return 'borderGreen'
        case 'b':
          return 'borderBlue'
      }
    },
    // 当前画布数组
    nowCanvasArr () {
      return this.canvasArr[this.nowCanvas]
    },
    // 监听曲线调整工具的开启状况
    isColorCurve () {
      return this.mainPopKey.colorCurve
    },
    // 输入输出上下限
    inputArr () {
      return [this.inputInX, this.inputInY, this.inputOutX, this.inputOutY]
    },
    ...mapState([
      'canvasArr',
      'nowCanvas',
      'mainPopKey'
    ])
  },
  watch: {
    isColorCurve (val) {
      if (val) {
        this.init()
        // 将当前画布数据赋给imgData
        this.partImgData = this.imgData = this.nowCanvasArr.imgData
        // RGB
        this.stroke('rgb')
        // R
        this.stroke('r')
        // G
        this.stroke('g')
        // B
        this.stroke('b')
      } else if (!this.isChange) {
        this.nowCanvasArr.context.putImageData(this.nowCanvasArr.imgData, 0, 0)
      }
    },
    // 监听输入输出上下限变化
    inputArr: {
      handler (val) {
        if (!this.key) return
        // 改变曲线的起始点和终点
        var len = this.allCanvasData[this.type].point[0].length - 1
        this.allCanvasData[this.type].point[0][0] = val[0] * 2 // inputInX
        this.allCanvasData[this.type].point[0][len] = val[1] * 2 // inputInY
        this.allCanvasData[this.type].point[1][0] = val[2] * 2 // inputOutX
        this.allCanvasData[this.type].point[1][len] = val[3] * 2 // inputoutY
        // 绘制曲线，直方图，关键点
        this.stroke(this.type)
      },
      deep: true
    }
  },
  methods: {
    init () {
      this.allCanvasData.rgb.point = [[0, 510], [0, 510]]
      this.allCanvasData.r.point = [[0, 510], [0, 510]]
      this.allCanvasData.g.point = [[0, 510], [0, 510]]
      this.allCanvasData.b.point = [[0, 510], [0, 510]]
    },
    // stroke
    stroke (type) {
      var xAry = this.allCanvasData[type].point[0]
      var yAry = this.allCanvasData[type].point[1]
      var context = this.allCanvasData[type].context
      // 绘制曲线
      this.strokeCurve(xAry, yAry, context)
      // 绘制直方图
      this.rgbCurveChange(xAry, yAry, context, type)
      // 绘制关键点
      this.strokeAllPoint(xAry, yAry, context)
    },
    // 改变RGB/R/G/B
    changeType (type) {
      var xAry = this.allCanvasData[type].point[0]
      var yAry = this.allCanvasData[type].point[1]
      var len = xAry.length - 1
      this.type = type
      this.key = false
      this.inputInX = xAry[0] / 2
      this.inputInY = xAry[len] / 2
      this.inputOutX = yAry[0] / 2
      this.inputOutY = yAry[len] / 2
      this.imgData = this.partImgData
    },
    down (event) {
      var type = this.type
      var xAry = this.allCanvasData[type].point[0]
      var yAry = this.allCanvasData[type].point[1]
      var context = this.allCanvasData[type].context
      var a = this
      var x = event.offsetX * 2
      var y = event.offsetY * 2
      var curveY = this.getYpoint(x, xAry, yAry)
      var point // 要移动关键点的下标
      var prvXAry = JSON.parse(JSON.stringify(xAry))
      var prvYAry = JSON.parse(JSON.stringify(yAry))
      var laterXAry = xAry
      var laterYAry = yAry
      var prvKey = false
      if (Math.abs(curveY + y - 510) <= 10) {
        var key = this.isCoincide(x, curveY, xAry, yAry)
        if (key === false) {
          // 不重合
          this.strokeRect(x, 510 - curveY, context)
          point = this.spliceAry(x, curveY, xAry, yAry)
        } else {
          // 重合
          point = key
        }
        this.canvasBox.addEventListener('mousemove', move)
        this.canvasBox.addEventListener('mouseup', up)
      }
      function move (e) {
        let x = e.offsetX * 2
        let y = 510 - e.offsetY * 2
        if (x > laterXAry[point - 1] && x < laterXAry[point + 1]) {
          if (prvKey === false) {
            laterXAry = xAry
            laterYAry = yAry
          } else {
            xAry = laterXAry
            yAry = laterYAry
          }
          xAry[point] = x
          yAry[point] = y
          prvKey = false
          // 获取直方图数据, 绘制直方图, 关键点
          a.stroke(type)
        } else {
          xAry = prvXAry
          yAry = prvYAry
          if (!prvKey) {
            // 获取直方图数据, 绘制直方图, 关键点
            a.stroke(type)
          }
          prvKey = true
        }
      }
      function up () {
        a.canvasBox.removeEventListener('mousemove', move)
        a.canvasBox.removeEventListener('mouseup', up)
      }
    },
    // 重心拉格朗日插值法
    // getYpoint (x, xAry, yAry) {
    //   // Wj
    //   function getW (j) {
    //     var w = 1
    //     for (let i = 0, len = xAry.length; i < len; i++) {
    //       if (i !== j) {
    //         w *= xAry[j] - xAry[i]
    //       }
    //     }
    //     return 1 / w
    //   }
    //   // L(x)
    //   // l(X)
    //   var l = 1
    //   var L = 0
    //   for (let i = 0, len = xAry.length; i < len; i++) {
    //     l *= x - xAry[i]
    //     L += getW(i) / (x - xAry[i]) * yAry[i]
    //   }
    //   return l * L
    // },
    // 拉格朗日插值法在JS中的实现
    // 计算差值基函数的值
    // 获取y轴坐标
    getYpoint (x, xAry, yAry) {
      var L = 0
      for (let k = 0, len = yAry.length; k < len; k++) {
        var lk = getPolynomial(k)
        L += yAry[k] * lk
      }
      function getPolynomial (k) {
        var temp1 = 1
        var temp2 = 1
        for (let i = 0, len = xAry.length; i < len; i++) {
          if (i !== k) {
            temp1 *= xAry[k] - xAry[i]
            temp2 *= x - xAry[i]
          }
        }
        return temp2 / temp1
      }
      return L
    },
    // 绘制曲线
    strokeCurve (xAry, yAry, context) {
      var len = xAry.length - 1
      // 起点
      var x1 = xAry[0]
      var y1 = yAry[0]
      // 终点
      var x2 = xAry[len]
      var y2 = yAry[len]
      context.clearRect(0, 0, 510, 510)
      context.beginPath()
      context.moveTo(0, 510 - y1)
      context.lineTo(x1, 510 - y1)
      for (let i = 0; i <= 510; i++) {
        if (i >= x1 && i <= x2) {
          var y = this.getYpoint(i, xAry, yAry)
          y = y > y2 ? y2 : y
          y = y < y1 ? y1 : y
          context.lineTo(i, 510 - y)
        }
      }
      context.lineTo(510, 510 - y2)
      context.stroke()
      context.closePath()
    },
    // 绘制所有关键点
    strokeAllPoint (xAry, yAry, context) {
      // 循环关键点数组，绘制关键点
      for (let j = 0, len = xAry.length; j < len; j++) {
        this.strokeRect(xAry[j], 510 - yAry[j], context)
      }
    },
    // 绘制一个关键点
    strokeRect (x, y, context) {
      context.beginPath()
      context.strokeRect(x - 4, y - 4, 8, 8)
      context.closePath()
    },
    // 判断新增关键点是否重合已有关键点
    isCoincide (x, y, xAry, yAry) {
      var key = false
      for (let i = 0, len = xAry.length; i < len; i++) {
        if (Math.abs(x - xAry[i]) <= 10 && Math.abs(y - yAry[i]) <= 10) {
          // 重合
          key = i
          break
        }
      }
      return key
    },
    // 向数组中插入元素
    spliceAry (x, y, xAry, yAry) {
      for (let i = 0, len = xAry.length; i < len; i++) {
        if (x > xAry[i] && x < xAry[i + 1]) {
          xAry.splice(i + 1, 0, x)
          yAry.splice(i + 1, 0, y)
          return i + 1
        }
      }
    },
    // 绘制直方图
    strokeHistogram (data, context) {
      var maxHeight = Math.max.apply(null, data)
      // 画直方图
      context.beginPath()
      context.moveTo(0, 510)
      for (let i = 0; i <= 255; i++) {
        context.lineTo(i * 2, (1 - data[i] / maxHeight) * 510)
      }
      context.lineTo(510, 510)
      context.closePath()
      context.stroke()
      context.fill()
    },
    // 对画布imgData进行曲线调整, 获取直方图数据
    rgbCurveChange (xAry, yAry, context, type) {
      var len = xAry.length - 1
      // 起点
      var x1 = xAry[0] / 2
      var y1 = yAry[0] / 2
      // 终点
      var x2 = xAry[len] / 2
      var y2 = yAry[len] / 2
      var data = this.imgData.data
      if (!data) return
      var outData = this.nowCanvasArr.context.createImageData(this.imgData)
      var rgb = new Array(256).fill(0)
      var r = new Array(256).fill(0)
      var g = new Array(256).fill(0)
      var b = new Array(256).fill(0)
      for (let i = 0, n = data.length; i < n; i += 4) {
        if (type === 'rgb') {
          outData.data[i] = data[i] <= x1 ? y1 : (data[i] >= x2 ? y2 : this.getYpoint(data[i] * 2, xAry, yAry) / 2)
          outData.data[i + 1] = data[i + 1] <= x1 ? y1 : (data[i + 1] >= x2 ? y2 : this.getYpoint(data[i + 1] * 2, xAry, yAry) / 2)
          outData.data[i + 2] = data[i + 2] <= x1 ? y1 : (data[i + 2] >= x2 ? y2 : this.getYpoint(data[i + 2] * 2, xAry, yAry) / 2)
        } else if (type === 'r') {
          outData.data[i] = data[i] <= x1 ? y1 : (data[i] >= x2 ? y2 : this.getYpoint(data[i] * 2, xAry, yAry) / 2)
          outData.data[i + 1] = data[i + 1]
          outData.data[i + 2] = data[i + 2]
        } else if (type === 'g') {
          outData.data[i] = data[i]
          outData.data[i + 1] = data[i + 1] <= x1 ? y1 : (data[i + 1] >= x2 ? y2 : this.getYpoint(data[i + 1] * 2, xAry, yAry) / 2)
          outData.data[i + 2] = data[i + 2]
        } else {
          outData.data[i] = data[i]
          outData.data[i + 1] = data[i + 1]
          outData.data[i + 2] = data[i + 2] <= x1 ? y1 : (data[i + 2] >= x2 ? y2 : this.getYpoint(data[i + 2] * 2, xAry, yAry) / 2)
        }
        outData.data[i + 3] = data[i + 3]
        r[outData.data[i]]++
        g[outData.data[i + 1]]++
        b[outData.data[i + 2]]++
        var num = Math.round(outData.data[i] * 0.299 + outData.data[i + 1] * 0.587 + outData.data[i + 2] * 0.114)
        rgb[num]++
      }
      if (type === 'rgb') {
        this.strokeHistogram(rgb, context)
      } else if (type === 'r') {
        this.strokeHistogram(r, context)
      } else if (type === 'g') {
        this.strokeHistogram(g, context)
      } else {
        this.strokeHistogram(b, context)
      }
      this.partImgData = outData
      this.nowCanvasArr.context.putImageData(outData, 0, 0)
    },
    // 横竖线事件
    moveHorizontal (event, string) {
      this.key = true
      var a = this
      var curveWrapper = document.getElementsByClassName('curveWrapper')[0]
      var top = document.getElementsByClassName('moveline')[0].getBoundingClientRect().top
      var left = document.getElementsByClassName('moveline')[0].getBoundingClientRect().left
      this.canvasBox.addEventListener('mousemove', move)
      curveWrapper.addEventListener('mouseup', up)
      function move (e) {
        if (string === 'top') {
          var t = parseInt(255 - (e.clientY - top))
          let num = t <= a.inputOutX + 10 ? a.inputOutX + 10 : t
          a.inputOutY = num > 250 ? 255 : num
        } else if (string === 'bottom') {
          var b = parseInt(255 - (e.clientY - top))
          let num = b >= a.inputOutY - 10 ? a.inputOutY - 10 : b
          a.inputOutX = num < 5 ? 0 : num
        } else if (string === 'left') {
          var l = parseInt(e.clientX - left)
          let num = l >= a.inputInY - 10 ? a.inputInY - 10 : l
          a.inputInX = num < 5 ? 0 : num
        } else {
          var r = parseInt(e.clientX - left)
          let num = r <= a.inputInX + 10 ? a.inputInX + 10 : r
          a.inputInY = num > 250 ? 255 : num
        }
      }
      function up () {
        a.canvasBox.removeEventListener('mousemove', move)
        curveWrapper.removeEventListener('mouseup', up)
      }
    }
  }
}
</script>

<style lang="scss">
.curveWrapper {
  height: 315px;
  display: flex;
  .curvetool {
    padding: 10px;
    .curveSelect {
      padding-left: 24px;
      margin-bottom: 5px;
      display: flex;
      div {
        text-align: center;
        background-color: #E1E1E1;
        border: 1px solid #ADADAD;
        margin-right: 3px;
        &:hover {
          background-color: #CCE4F7;
          border-color: #005499;
        }
      }
      .selectStyle {
        background-color: #CCE4F7;
        border-color: #005499;
      }
      .selectOne {
        width: 88px;
        height: 15px;
      }
      .selectTwo {
        width: 17px;
        height: 15px;
      }
    }
    .curveBox {
      display: flex;
      width: 281px;
      flex-wrap: wrap;
      input {
        width: 20px;
        height: 12px;
        padding: 0;
        border: 1px solid #000;
        outline: none;
        font-size: 10px;
      }
      .boxLeft {
        width: 24px;
        height: 255px;
        input:nth-child(2) {
          margin-top: 227px;
        }
      }
      .boxRight {
        width: 255px;
        height: 255px;
        border: 1px solid #000;
        position: relative;
        overflow: hidden;
        .boxBackground {
          display: flex;
          flex-wrap: wrap;
          div {
            width: 63px;
            height: 63px;
            background-color: #ffffff;
          }
          .right {
            border-right: 1px dashed #CECECE;
          }
          .bottom {
            border-bottom: 1px dashed #CECECE;
          }
        }
        .canvasCurveBox {
          position: absolute;
          top: 0;
          font-size: 0;
          &>div, canvas {
            width: 255px;
            height: 255px;
            position: absolute;
            top: 0;
          }
          .canvasMask {
            background-color: rgba(255, 255, 255, 0.5);
          }
          .moveline {
            z-index: 1000;
            &>div {
              position: absolute;
              .tran {
                width: 8px;
                height: 8px;
                background-color: #fff;
                border: 1px solid #000;
                transform: rotateZ(45deg);
              }
            }
            .horizontal {
              display: flex;
              align-items: center;
              transform: translateX(-5px) translateY(-50%);
              cursor: n-resize;
              .line {
                width: 245px;
                height: 1px;
                background-color: #000;
              }
            }
            .vertical {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              width: 10px;
              transform: translateY(-5px) translateX(-50%);
              cursor: e-resize;
              .line {
                width: 1px;
                height: 245px;
                margin: 0 4.5px;
                background-color:  #000;
              }
            }
          }
          .borderRed {
            .tran {
              border-color:#ff0000 !important;
            }
            .line {
              background-color: #ff0000 !important;
            }
          }
          .borderGreen {
            .line {
              background-color: #00ff00 !important;
            }
            .tran {
              border-color: #00ff00 !important;
            }
          }
          .borderBlue {
            .line {
              background-color: #0000ff !important;
            }
            .tran {
              border-color: #0000ff !important;
            }
          }
        }
      }
      .boxBelow {
        height: 14px;
        margin-left: 25px;
        input:nth-child(2) {
          margin-left: 208px;
        }
      }
    }
  }
}
</style>
