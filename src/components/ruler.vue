<template>
  <div class="ruler_wrapper" v-show="ruler.ruler">
    <div class="ruler_corner"></div>
    <div class="ruler_x">
      <canvas class="x_canvas" height="15" :width="w"></canvas>
      <div class="x_bar" :style="{left: offset[0]+l+'px'}"></div>
    </div>
    <div class="ruler_y">
      <canvas class="y_canvas" width="15" :height="h"></canvas>
      <div class="y_bar" :style="{top: offset[1]+t+'px'}"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ruler',
  data () {
    return {
      w: '',
      h: '',
      xContext: '',
      yContext: '',
      // 间隔
      interval: 50,
      // 画布左上角位置
      l: '',
      t: ''
    }
  },
  computed: {
    ...mapState([
      'offset',
      'nowCanvas',
      'showPops',
      'ruler'
    ])
  },
  mounted () {
    var a = this
    window.onresize = function () {
      if (this.ruler.ruler) a.init()
    }
    this.init()
  },
  methods: {
    init () {
      this.w = document.getElementsByClassName('main-box')[0].offsetWidth
      this.h = document.getElementsByClassName('main-box')[0].offsetHeight
      this.l = document.getElementsByClassName('sketchpad')[0].offsetLeft
      this.t = document.getElementsByClassName('sketchpad')[0].offsetTop
      var a = this
      setTimeout(function () {
        a.xContext = document.getElementsByClassName('x_canvas')[0].getContext('2d')
        a.yContext = document.getElementsByClassName('y_canvas')[0].getContext('2d')
        a.xContext.strokeStyle = '#95B8E7'
        a.yContext.strokeStyle = '#95B8E7'
        a.xContext.fillStyle = '#95B8E7'
        a.yContext.fillStyle = '#95B8E7'
        a.xContext.textBaseline = 'hanging'
        a.xContext.font = '10px Arial'
        a.yContext.textBaseline = 'hanging'
        a.yContext.font = '10px Arial'
        a.stroke()
      }, 1)
    },
    stroke () {
      this.xContext.clearRect(0, 0, this.w, 15)
      this.yContext.clearRect(0, 0, 15, this.h)
      for (let i = 0; i < this.w - this.l; i += this.interval) {
        this.strokeXPart(this.l + i + 0.5, this.interval / 10, i)
      }
      for (let i = 0; i < this.l + this.interval; i += this.interval) {
        this.strokeXPart(this.l - i + 0.5, this.interval / 10, -i)
      }
      for (let i = 0; i < this.h - this.t; i += this.interval) {
        this.strokeYPart(this.t + i + 0.5, this.interval / 10, i)
      }
      for (let i = 0; i < this.t + this.interval; i += this.interval) {
        this.strokeYPart(this.t - i + 0.5, this.interval / 10, -i)
      }
    },
    strokeXPart (s, l, n) {
      // s为起点位置
      // l为间隔
      // n为上标
      this.xContext.fillText(n, s + 2, 0)
      for (let i = 0; i < 10; i++) {
        s += l
        this.xContext.beginPath()
        this.xContext.moveTo(s, 15)
        if (i === 9) {
          this.xContext.lineTo(s, 0)
        } else if (i % 2 === 0) {
          this.xContext.lineTo(s, 12)
        } else if (i % 2 === 1) {
          this.xContext.lineTo(s, 10)
        }
        this.xContext.stroke()
      }
    },
    strokeYPart (s, l, n) {
      var arr = String(n).split('')
      for (let i = 0; i < arr.length; i++) {
        this.yContext.fillText(arr[i], 2, s + i * 9 + 2)
      }
      for (let i = 0; i < 10; i++) {
        s += l
        this.yContext.beginPath()
        this.yContext.moveTo(15, s)
        if (i === 9) {
          this.yContext.lineTo(0, s)
        } else if (i % 2 === 0) {
          this.yContext.lineTo(12, s)
        } else if (i % 2 === 1) {
          this.yContext.lineTo(10, s)
        }
        this.yContext.stroke()
      }
    }
  },
  watch: {
    nowCanvas () {
      var a = this
      setTimeout(function () {
        a.init()
      }, 100)
    },
    showPops: {
      handler () {
        this.init()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.ruler_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &>div {
    position: absolute;
    background-color: #EDF5FA;
    overflow: hidden;
    z-index: 1;
  }
  .ruler_corner {
    width: 15px;
    height: 15px;
    z-index: 2;
    border-bottom: 1px solid #95B8E7;
  }
  .ruler_x {
    height: 15px;
    width: 100%;
    border-bottom: 1px solid #95B8E7;
    .x_bar {
      top: 0;
      position: absolute;
      width: 2px;
      height: 10px;
      background-color: #95BCFC;
    }
  }
  .ruler_y {
    width: 15px;
    height: 100%;
    border-right: 1px solid #95B8E7;
    .y_bar {
      position: absolute;
      left: 0;
      width: 10px;
      height: 2px;
      background-color: #95BCFC;
    }
  }
}
</style>
