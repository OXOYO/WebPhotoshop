<template>
  <popSlot :title="'曲线'" :prop="'colorCurve'">
    <div class="curveWrapper recordWrapper">
      <div class="curvetool">
        <div class="curveSelect">
          <div class="selectOne" :class="{selectStyle: type==='RGB'}" @click="type='RGB'">RGB</div>
          <div class="selectTwo" :class="{selectStyle: type==='R'}" @click="type='R'">R</div>
          <div class="selectTwo" :class="{selectStyle: type==='G'}" @click="type='G'">G</div>
          <div class="selectTwo" :class="{selectStyle: type==='B'}" @click="type='B'">B</div>
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
              <div :style="{'z-index': zIndex[0]}">
                <canvas width="510" height="510" class="rCurve"></canvas>
                <canvas width="510" height="510" class="rHistogram"></canvas>
              </div>
              <div :style="{'z-index': zIndex[2]}">
                <canvas width="510" height="510" class="gCurve"></canvas>
                <canvas width="510" height="510" class="gHistogram"></canvas>
              </div>
              <div class="canvasMask" v-show="type!=='RGB'" :style="{'z-index': zIndex[1]}"></div>
              <div :style="{'z-index': zIndex[3]}">
                <canvas width="510" height="510" class="bCurve"></canvas>
                <canvas width="510" height="510" class="bHistogram"></canvas>
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
              <canvas width="510" height="510" class="rgbCurve"></canvas>
            </div>
          </div>
          <div class="boxBelow">
            <input type="text" v-model="inputInX">
            <input type="text" v-model="inputInY">
          </div>
        </div>
      </div>
      <div class="curveButton">
        <div class="buttonBox">
          <button>确定</button>
          <button>取消</button>
        </div>
        <div class="lastCurve">
          <canvas
            class="littleCurve"
            :width="nowCanvasArr.width"
            :height="nowCanvasArr.height"
          ></canvas>
        </div>
      </div>
    </div>
  </popSlot>
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
      type: 'RGB',
      // 直方图数据
      histogramData: '',
      // 各个画布和曲线context
      colorCurveContext: {
        rgb: [],
        r: [],
        g: [],
        b: []
      },
      // RGB,R,G,B的关键点坐标
      xyAry: {
        rgb: [[0, 510], [0, 510]],
        r: [[0, 510], [0, 510]],
        g: [[0, 510], [0, 510]],
        b: [[0, 510], [0, 510]]
      },
      // 预览画布
      littleContext: ''
    }
  },
  mounted () {
    this.canvasBox = document.getElementsByClassName('canvasCurveBox')[0]
    // RGB
    this.colorCurveContext.rgb.push(document.getElementsByClassName('rgbCurve')[0].getContext('2d'))
    // R
    this.colorCurveContext.r.push(
      document.getElementsByClassName('rCurve')[0].getContext('2d'),
      document.getElementsByClassName('rHistogram')[0].getContext('2d')
    )
    this.colorCurveContext.r[0].strokeStyle = 'rgb(255, 0, 0)'
    this.colorCurveContext.r[1].strokeStyle = 'rgb(255, 0, 0)'
    this.colorCurveContext.r[1].fillStyle = 'rgba(255, 0, 0, 0.2)'
    // G
    this.colorCurveContext.g.push(
      document.getElementsByClassName('gCurve')[0].getContext('2d'),
      document.getElementsByClassName('gHistogram')[0].getContext('2d')
    )
    this.colorCurveContext.g[0].strokeStyle = 'rgb(0, 255, 0)'
    this.colorCurveContext.g[1].strokeStyle = 'rgb(0, 255, 0)'
    this.colorCurveContext.g[1].fillStyle = 'rgba(0, 255, 0, 0.2)'
    // B
    this.colorCurveContext.b.push(
      document.getElementsByClassName('bCurve')[0].getContext('2d'),
      document.getElementsByClassName('bHistogram')[0].getContext('2d')
    )
    this.colorCurveContext.b[0].strokeStyle = 'rgb(0, 0, 255)'
    this.colorCurveContext.b[1].strokeStyle = 'rgb(0, 0, 255)'
    this.colorCurveContext.b[1].fillStyle = 'rgba(0, 0, 255, 0.2)'
  },
  components: {
    popSlot
  },
  computed: {
    // z-index
    zIndex () {
      switch (this.type) {
        case 'RGB':
          return [100, 90, 80, 70]
        case 'R':
          return [100, 90, 80, 70]
        case 'G':
          return [80, 90, 100, 70]
        case 'B':
          return [80, 90, 70, 100]
      }
    },
    // boder-color
    boderColor () {
      switch (this.type) {
        case 'R':
          return 'borderRed'
        case 'G':
          return 'borderGreen'
        case 'B':
          return 'borderBlue'
      }
    },
    // 返回当前直方图X,Y关键点数组和canvas画布和直方图
    canvasArrayData () {
      switch (this.type) {
        case 'RGB':
          return this.xyAry.rgb.concat(this.colorCurveContext.rgb)
        case 'R':
          return this.xyAry.r.concat(this.colorCurveContext.r)
        case 'G':
          return this.xyAry.g.concat(this.colorCurveContext.g)
        case 'B':
          return this.xyAry.b.concat(this.colorCurveContext.b)
      }
    },
    // 当前画布数组
    nowCanvasArr () {
      return this.canvasArr[this.nowCanvas]
    },
    // 监听曲线调整工具的开启状况
    isColorCurve () {
      return this.popUpsKey.colorCurve
    },
    ...mapState([
      'canvasArr',
      'nowCanvas',
      'popUpsKey'
    ])
  },
  watch: {
    isColorCurve (val) {
      if (val) {
        // 初始化
        this.littleContext = document.getElementsByClassName('littleCurve')[0].getContext('2d')
        this.rgbCurveChange()
        this.strokeCurve(this.colorCurveContext.rgb[0])
        this.strokeCurve(this.colorCurveContext.r[0])
        this.strokeCurve(this.colorCurveContext.g[0])
        this.strokeCurve(this.colorCurveContext.b[0])
      }
    }
  },
  methods: {
    down (event) {
      var a = this
      var x = event.offsetX * 2
      var y = event.offsetY * 2
      var curveY = this.getYpoint(x)
      var point // 要移动关键点的下标
      var prvXAry = JSON.parse(JSON.stringify(this.canvasArrayData[0]))
      var prvYAry = JSON.parse(JSON.stringify(this.canvasArrayData[1]))
      var laterXAry = this.canvasArrayData[0]
      var laterYAry = this.canvasArrayData[1]
      var prvKey = false
      if (Math.abs(curveY + y - 510) <= 10) {
        var key = this.isCoincide(x, curveY)
        if (key === false) {
          // 不重合
          this.strokeRect(x, 510 - curveY, this.canvasArrayData[2])
          point = this.spliceAry(x, curveY)
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
            laterXAry = a.canvasArrayData[0]
            laterYAry = a.canvasArrayData[1]
          } else {
            a.canvasArrayData[0] = laterXAry
            a.canvasArrayData[1] = laterYAry
          }
          a.canvasArrayData[0][point] = x
          a.canvasArrayData[1][point] = y
          prvKey = false
          a.rgbCurveChange()
          a.strokeCurve(a.canvasArrayData[2])
        } else {
          a.canvasArrayData[0] = prvXAry
          a.canvasArrayData[1] = prvYAry
          if (!prvKey) {
            a.rgbCurveChange()
            a.strokeCurve(a.canvasArrayData[2])
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
    // getYpoint (x) {
    //   var xAry = this.canvasArrayData[0]
    //   var yAry = this.canvasArrayData[1]
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
    getPolynomial (x, k) {
      var temp1 = 1
      var temp2 = 1
      var xAry = this.canvasArrayData[0]
      for (let i = 0, len = xAry.length; i < len; i++) {
        if (i !== k) {
          temp1 *= xAry[k] - xAry[i]
          temp2 *= x - xAry[i]
        }
      }
      return temp2 / temp1
    },
    // 获取y轴坐标
    getYpoint (x) {
      var L = 0
      var yAry = this.canvasArrayData[1]
      for (let k = 0, len = yAry.length; k < len; k++) {
        var lk = this.getPolynomial(x, k)
        L += yAry[k] * lk
      }
      return L
    },
    // 绘制曲线
    strokeCurve (context) {
      // 获取直方图数据, 绘制直方图
      context.clearRect(0, 0, 510, 510)
      context.beginPath()
      context.moveTo(0, 510)
      for (let i = 0; i <= 510; i++) {
        var y = 510 - this.getYpoint(i)
        y = y > 510 ? 510 : y
        y = y < 0 ? 0 : y
        context.lineTo(i, y)
      }
      context.stroke()
      context.closePath()
      // 循环关键点数组，绘制关键点
      for (let j = 0, len = this.canvasArrayData[0].length; j < len; j++) {
        this.strokeRect(this.canvasArrayData[0][j], 510 - this.canvasArrayData[1][j], context)
      }
    },
    // 绘制关键点
    strokeRect (x, y, context) {
      context.beginPath()
      context.strokeRect(x - 4, y - 4, 8, 8)
      context.closePath()
    },
    // 判断新增关键点是否重合已有关键点
    isCoincide (x, y) {
      var key = false
      for (let i = 0, len = this.canvasArrayData[0].length; i < len; i++) {
        if (Math.abs(x - this.canvasArrayData[0][i]) <= 10 && Math.abs(y - this.canvasArrayData[1][i]) <= 10) {
          // 重合
          key = i
          break
        }
      }
      return key
    },
    // 向数组中插入元素
    spliceAry (x, y) {
      for (let i = 0, len = this.canvasArrayData[0].length; i < len; i++) {
        if (x > this.canvasArrayData[0][i] && x < this.canvasArrayData[0][i + 1]) {
          this.canvasArrayData[0].splice(i + 1, 0, x)
          this.canvasArrayData[1].splice(i + 1, 0, y)
          return i + 1
        }
      }
    },
    // 绘制直方图
    strokeHistogram (data, context) {
      var arr = []
      for (let j = 0, len = data.length; j < len; j += 2) {
        arr.push(data.shift() + data.shift())
      }
      var maxHeight = Math.max.apply(null, arr)
      // 画直方图
      context.clearRect(0, 0, 510, 510)
      context.beginPath()
      context.moveTo(0, 510)
      for (let i = 0; i <= 255; i += 2) {
        context.lineTo(i * 2, (1 - arr[i / 2] / maxHeight) * 510)
      }
      context.lineTo(510, 510)
      context.closePath()
      context.stroke()
      context.fill()
    },
    // 对画布imgData进行曲线调整, 获取直方图数据
    rgbCurveChange () {
      var data = this.nowCanvasArr.imgData.data
      if (!data) return
      var outData = this.nowCanvasArr.context.createImageData(this.nowCanvasArr.imgData)
      var r = new Array(256).fill(0)
      var g = new Array(256).fill(0)
      var b = new Array(256).fill(0)
      for (let i = 0, n = data.length; i < n; i += 4) {
        if (this.type === 'RGB') {
          outData.data[i] = this.getYpoint(data[i] * 2) / 2
          outData.data[i + 1] = this.getYpoint(data[i + 1] * 2) / 2
          outData.data[i + 2] = this.getYpoint(data[i + 2] * 2) / 2
        } else if (this.type === 'R') {
          outData.data[i] = this.getYpoint(data[i] * 2) / 2
          outData.data[i + 1] = data[i + 1]
          outData.data[i + 2] = data[i + 2]
        } else if (this.type === 'G') {
          outData.data[i] = data[i]
          outData.data[i + 1] = this.getYpoint(data[i + 1] * 2) / 2
          outData.data[i + 2] = data[i + 2]
        } else {
          outData.data[i] = data[i]
          outData.data[i + 1] = data[i + 1]
          outData.data[i + 2] = this.getYpoint(data[i + 2] * 2) / 2
        }
        outData.data[i + 3] = data[i + 3]
        r[outData.data[i]]++
        g[outData.data[i + 1]]++
        b[outData.data[i + 2]]++
      }
      if (this.type === 'RGB') {
        this.strokeHistogram(r, this.colorCurveContext.r[1])
        this.strokeHistogram(g, this.colorCurveContext.g[1])
        this.strokeHistogram(b, this.colorCurveContext.b[1])
      } else if (this.type === 'R') {
        this.strokeHistogram(r, this.colorCurveContext.r[1])
      } else if (this.type === 'G') {
        this.strokeHistogram(g, this.colorCurveContext.g[1])
      } else {
        this.strokeHistogram(b, this.colorCurveContext.b[1])
      }
      this.nowCanvasArr.context.putImageData(outData, 0, 0)
      this.littleContext.putImageData(outData, 0, 0)
    },
    // 横竖线事件
    moveHorizontal (event, string) {
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
  width: 430px;
  height: 315px;
  background-color: #efefef;
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
  .curveButton {
    padding: 10px;
    margin-top: 20px;
    .buttonBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      button {
        box-sizing: content-box;
        width: 96px;
        height: 16.8px;
        padding: 2px 0;
        margin-bottom: 15px;
      }
    }
    .lastCurve {
      height: 196px;
      display: flex;
      align-items: center;
      canvas {
        width: 100%;
      }
    }
  }
}
</style>
