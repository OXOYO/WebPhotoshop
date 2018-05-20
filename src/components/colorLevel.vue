<template>
  <popSlot :title="'色阶'" :prop="'colorLevel'">
    <div class="levelWrapper">
      <div class="levelLeft">
        <div class="aisleSelect">
          <div class="selectOne" :class="{selectBox: type==='rgb'}" @click="changeType('rgb')">RGB</div>
          <div :class="{selectBox: type==='r'}" @click="changeType('r')">R</div>
          <div :class="{selectBox: type==='g'}" @click="changeType('g')">G</div>
          <div :class="{selectBox: type==='b'}" @click="changeType('b')">B</div>
        </div>
        <div class="histogramBox">
          <div class="enterLevelBox">
            <div class="histogramTitle">输入色阶：</div>
            <div class="histogram">
              <canvas width="510" height="256" v-show="type==='rgb'" class="levelHistogram"></canvas>
              <canvas width="510" height="256" v-show="type==='r'" class="levelHistogram"></canvas>
              <canvas width="510" height="256" v-show="type==='g'" class="levelHistogram"></canvas>
              <canvas width="510" height="256" v-show="type==='b'" class="levelHistogram"></canvas>
            </div>
            <div class="histogramBar" @mousedown="dowm($event, 0)">
              <svg :style="{left: inputarr[0][0]+'px'}">
                <use xlink:href="#black"></use>
              </svg>
              <svg :style="{left: inputarr[0][1]+'px'}">
                <use xlink:href="#gray"></use>
              </svg>
              <svg :style="{left: inputarr[0][2]+'px'}">
                <use xlink:href="#white"></use>
              </svg>
            </div>
            <div class="histogramInput">
              <input type="text" v-model="inputarr[0][0]">
              <input type="text" v-model="inputarr[0][1]">
              <input type="text" v-model="inputarr[0][2]">
            </div>
          </div>
          <div class="outputLevelBox">
            <div class="outTitle">输出色阶</div>
            <div class="outSelect">
              <div class="outList"></div>
              <div class="outBar" @mousedown="dowm($event, 1)">
                <svg :style="{left: inputarr[1][0]+'px'}">
                  <use xlink:href="#black"></use>
                </svg>
                <svg :style="{left: inputarr[1][1]+'px'}">
                  <use xlink:href="#white"></use>
                </svg>
              </div>
            </div>
            <div class="outInput">
              <input type="text" v-model="inputarr[1][0]">
              <input type="text" v-model="inputarr[1][1]">
            </div>
          </div>
        </div>
      </div>
      <div class="levelRight">
        <button>确定</button>
        <button>取消</button>
      </div>
    </div>
  </popSlot>
</template>

<script>
import { mapState } from 'vuex'
import popSlot from './popSlot.vue'
export default {
  name: 'colorlevel',
  data () {
    return {
      type: 'rgb',
      inputObj: {
        rgb: [[0, 128, 255], [0, 255]],
        r: [[0, 128, 255], [0, 255]],
        g: [[0, 128, 255], [0, 255]],
        b: [[0, 128, 255], [0, 255]]
      }
    }
  },
  components: {
    popSlot
  },
  computed: {
    ...mapState([
      'canvasArr',
      'nowCanvas',
      'popUpsKey'
    ]),
    inputarr () {
      return this.inputObj[this.type]
    },
    isShow () {
      return this.popUpsKey.colorLevel
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      var dom = document.getElementsByClassName('levelHistogram')
      var rgbContext = dom[0].getContext('2d')
      var rContext = dom[1].getContext('2d')
      var gContext = dom[2].getContext('2d')
      var bContext = dom[3].getContext('2d')
      var imgData = this.canvasArr[this.nowCanvas].imgData.data
      // 统计像素信息
      var rgb = new Array(256).fill(0)
      var r = new Array(256).fill(0)
      var g = new Array(256).fill(0)
      var b = new Array(256).fill(0)
      for (let i = 0; i < imgData.length; i += 4) {
        var gray = Math.round(imgData[i] * 0.299 + imgData[i + 1] * 0.587 + imgData[i + 2] * 0.114)
        rgb[gray]++
        r[imgData[i]]++
        g[imgData[i + 1]]++
        b[imgData[i + 2]]++
      }
      // 画直方图
      stroke(rgbContext, rgb)
      stroke(rContext, r)
      stroke(gContext, g)
      stroke(bContext, b)
      function stroke (context, data) {
        var maxHeight = Math.max.apply(null, data)
        context.strokeWidth = 2
        context.clearRect(0, 0, 510, 256)
        for (let i = 0; i <= 255; i++) {
          context.beginPath()
          context.moveTo(i * 2, 257)
          context.lineTo(i * 2, (1 - data[i] / maxHeight) * 256)
          context.stroke()
          context.closePath()
        }
      }
    },
    changeType (type) {
      this.type = type
    },
    // bar拖拽事件
    dowm (event, l) {
      var startX = document.getElementsByClassName('histogram')[0].getBoundingClientRect().left
      var x = Math.round(event.clientX - startX)
      var inputArr = this.inputObj[this.type][l]
      var index = rt()
      inputArr.splice(index, 1, x)
      document.body.addEventListener('mousemove', move)
      document.body.addEventListener('mouseup', up)
      function move (e) {
        let x = Math.round(e.clientX - startX)
        x = x > 255 ? 255 : (x < 0 ? 0 : x)
        inputArr.splice(index, 1, x)
      }
      function up () {
        document.body.removeEventListener('mousemove', move)
        document.body.removeEventListener('mouseup', up)
      }
      function rt () {
        // 判断应该移动那个点
        if (l === 0) {
          var x1 = Math.abs(x - inputArr[0])
          var x2 = Math.abs(x - inputArr[1])
          var x3 = Math.abs(x - inputArr[2])
          var min = Math.min.apply(null, [x1, x2, x3])
          switch (min) {
            case x1:
              return 0
            case x2:
              return 1
            case x3:
              return 2
          }
        } else {
          var k = (inputArr[0] + inputArr[1]) / 2
          if (x > k) {
            return 1
          } else {
            return 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.levelWrapper {
  padding: 10px;
  border: 1px solid #81ADE3;
  background-color: #efefef;
  display: flex;
  .levelLeft {
    .aisleSelect {
      display: flex;
      div {
        width: 17px;
        height: 15px;
        text-align: center;
        background-color: #E1E1E1;
        border: 1px solid #ADADAD;
        margin-right: 3px;
        &:hover {
          background-color: #CCE4F7;
          border-color: #005499;
        }
      }
      .selectBox {
        background-color: #CCE4F7;
          border-color: #005499;
      }
      .selectOne {
        width: 88px;
      }
    }
    .histogramBox {
      input {
        width: 53px;
        height: 18px;
        padding: 0;
        border: 1px solid #000;
      }
      svg {
        transform: translateX(-4px);
      }
      .enterLevelBox {
        .histogramTitle {
          font-size: 13px;
          margin: 10px 0 5px 0;
        }
        .histogram {
          border: 1px solid #000;
          background-color: #fff;
          width: 255px;
          height: 128px;
          position: relative;
          canvas {
            vertical-align: top;
            width: 255px;
            position: absolute;
          }
        }
        .histogramBar {
          position: relative;
          height: 10px;
        }
        .histogramInput {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
      .outputLevelBox {
        .outTitle {
          font-size: 13px;
          margin: 10px 0 5px 0;
        }
        .outSelect {
          .outList {
            height: 15px;
            background: linear-gradient(to right, #000, #fff);
          }
          .outBar {
            position: relative;
            height: 10px;
          }
        }
        .outInput {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .levelRight {
    width: 100px;
    margin-top: 10px;
    margin-left: 10px;
    button {
      box-sizing: content-box;
      width: 96px;
      height: 16.8px;
      padding: 2px 0;
      margin-bottom: 15px;
    }
  }
}
</style>
