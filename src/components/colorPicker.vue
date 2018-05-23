<template>
  <div class="colorWrapper" v-show="popUpsKey.colorPicker">
    <div class="colorTitle">
      <span>颜色选择器</span>
      <span class="colorClose icon" @click="isShow"></span>
    </div>
    <div class="colorContent">
      <div class="colorMap">
        <h2>拖动圆圈选择颜色</h2>
        <div class="colorMapBox borderStyle" @mousedown="roundMove($event)">
          <img src="../../src/assets/images/mappoint.gif" draggable="false" :style="roundPosition">
        </div>
      </div>
      <div class="colorMapBar">
        <div class="colorBar borderStyle" @mousedown="barMove($event)">
          <img src="../../src/assets/images/rangearrows.gif" :style="{top: topNum}" draggable="false">
        </div>
      </div>
      <div class="colorActive">
        <div class="colorActiveTop">
          <div class="colorActiveBox borderStyle">
            <div :style="{backgroundColor: '#'+transleteArr[2].color}"></div>
            <div :style="{backgroundColor: 'rgb('+prvColor[0]+','+prvColor[1]+','+prvColor[2]+')'}"></div>
          </div>
        </div>
        <div class="colorActiveSelect">
          <div v-for="(item, k) in [transleteArr[0], transleteArr[1]]" :key="item.id" :class="{marginStyle: k === 1}">
            <div class="colorActiveSelectList" v-for="(value, key) in item" :key="value.id">
              <input type="radio" :id="key" :value="key" v-model="picked">
              <label :for="key" class="selectName">{{key}}:</label >
              <input
                type="text"
                class="selectInput"
                :value="transleteArr[k][key]"
                @input="changeInput($event.target.value, k, key)"
                @keydown.up="keydown('up', $event.target.value, k, key)"
                @keydown.down="keydown('down', $event.target.value, k, key)"
              >
              <span v-show="k === 0 && key !== 'H'">%</span>
              <span v-show="key === 'H'">°</span>
            </div>
          </div>
          <div class="colorActiveSelectList">
            <span class="selectName">#:</span>
            <input type="text" class="selectInput selectInputBottom" v-model="transleteArr[2].color">
          </div>
        </div>
      </div>
      <div class="colorButton">
        <div class="colorButtonTop">
          <button @click="isShow">确定</button>
          <button @click="closeBox">取消</button>
        </div>
        <div class="colorButtonGrid">
          <span v-for="(item, index) in colorListArr" :key="item.id" :title="'#'+item" :style="{backgroundColor: '#'+item}" @click="changeColorGrid(index)"></span>
          <span class="colorButtonGridDle"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import translateColorStyle from '../js/tranlateColorStyle'
export default {
  name: 'colorpicker',
  data () {
    return {
      prvColor: [],
      colorArr: [{
        H: 0,
        S: 0,
        V: 0
      }, {
        R: 0,
        G: 0,
        B: 0
      }, {
        color: '000000'
      }],
      picked: 'H',
      colorListArr: [
        'ffaaaa', 'ff5656', 'ff0000', 'bf0000', '7f0000', 'ffffff', 'ffd4aa', 'ffaa56', 'ff7f00', 'bf5f00', '7f3f00', 'e5e5e5',
        'ffffaa', 'ffff56', 'ffff00', 'bfbf00', '7f7f00', 'cccccc', 'd4ffaa', 'aaff56', '7fff00', '5fbf00', '3f7f00', 'b2b2b2',
        'aaffaa', '56ff56', '00ff00', '00bf00', '007f00', '999999', 'aaffd4', '56ffaa', '00ff7f', '00bf5f', '007f3f', '7f7f7f',
        'aaffff', '56ffff', '00ffff', '00bfbf', '007f7f', '666666', 'aad4ff', '56aaff', '007fff', '005fbf', '003f7f', '4c4c4c',
        'aaaaff', '5656ff', '0000ff', '0000bf', '00007f', '333333', 'd4aaff', 'aa56ff', '7f00ff', '5f00bf', '3f007f', '191919',
        'ffaaff', 'ff56ff', 'ff00ff', 'bf00bf', '7f007f', '000000', 'ffaad4', 'ff56aa', 'ff007f', 'bf005f', '7f003f'],
      barTop: 0,
      roundArr: [0, 0]
    }
  },
  mounted () {
    for (var prop in translateColorStyle) {
      this[prop] = translateColorStyle[prop]
    }
    this.barTop = document.getElementsByClassName('colorBar')[0].getBoundingClientRect().top
    this.roundArr[0] = document.getElementsByClassName('colorMapBox')[0].getBoundingClientRect().left
    this.roundArr[1] = document.getElementsByClassName('colorMapBox')[0].getBoundingClientRect().top
    var a = this
    document.body.addEventListener('mouseup', function () {
      document.body.removeEventListener('mousemove', a.moveBar)
      document.getElementsByClassName('colorMapBox')[0].removeEventListener('mousemove', a.moveRound)
    })
  },
  computed: {
    // 开关
    showColorPicker () {
      return this.popUpsKey.colorPicker
    },
    transleteArr () {
      return [{
        H: Math.round(this.colorArr[0].H),
        S: Math.round(this.colorArr[0].S * 100),
        V: Math.round(this.colorArr[0].V * 100)
      }, {
        R: Math.round(this.colorArr[1].R),
        G: Math.round(this.colorArr[1].G),
        B: Math.round(this.colorArr[1].B)
      }, {
        color: this.colorArr[2].color
      }]
    },
    newColorStyle () {
      return this.colorArr[2].color
    },
    topNum () {
      var a
      switch (this.picked) {
        case 'H':
          a = this.colorArr[0].H / 360
          break
        case 'S':
          a = this.colorArr[0].S
          break
        case 'V':
          a = this.colorArr[0].V
          break
        case 'R':
          a = this.colorArr[1].R / 255
          break
        case 'G':
          a = this.colorArr[1].G / 255
          break
        case 'B':
          a = this.colorArr[1].B / 255
          break
      }
      return (1 - a) * 256 + 'px'
    },
    roundPosition () {
      return {
        top: 256 - this.colorArr[0].V * 256 + 'px',
        left: this.colorArr[0].S * 256 + 'px'
      }
    },
    ...mapState([
      'globalColor',
      'popUpsKey'
    ])
  },
  methods: {
    isShow: function () {
      this.popUpsKey.colorPicker = false
    },
    closeBox: function () {
      this.$store.commit('changeglobalColor', this.prvColor)
      this.isShow()
    },
    changeColorGrid: function (index) {
      var col = this.colorListArr[index]
      var rgb = this.hexToRgb(col)
      var hsv = this.rgbTohsv(rgb)
      this.changeArr(hsv, rgb, col)
    },
    changeArr: function (hsv, rgb, col) {
      this.colorArr = [].concat([hsv, rgb, {color: col}])
    },
    changeInput: function (val, index, prop) {
      val = val.replace(/[^\d]/g, '')
      var rgb
      var hsv
      var col
      if (val < 0) val = 0
      if (index === 1) {
        if (val > 255) val = 255
        rgb = this.colorArr[1]
        rgb[prop] = parseInt(val)
        hsv = this.rgbTohsv(rgb)
        col = this.rgbToHex(rgb)
      } else {
        hsv = this.colorArr[0]
        if (prop !== 'H') {
          if (val > 100) val = 100
          hsv[prop] = val / 100
        } else {
          if (val > 360) {
            val = 360
          }
          hsv[prop] = parseInt(val)
        }
        rgb = this.hsvToRgb(hsv)
        col = this.rgbToHex(rgb)
      }
      this.changeArr(hsv, rgb, col)
    },
    keydown: function (code, val, index, prop) {
      if (code === 'up') {
        val++
      } else {
        val--
      }
      this.changeInput(String(val), index, prop)
    },
    barMove: function (event) {
      if (!this.barTop) this.barTop = document.getElementsByClassName('colorBar')[0].getBoundingClientRect().top
      this.moveBar(event)
      document.body.addEventListener('mousemove', this.moveBar)
    },
    moveBar: function (e) {
      var y = e.clientY - this.barTop
      if (y < 0) y = 0
      if (y > 256) y = 256
      var a = 1 - y / 256
      switch (this.picked) {
        case 'H':
          this.changeInput(String(Math.round(a * 360)), 0, 'H')
          break
        case 'S':
          this.changeInput(String(Math.round(a * 100)), 0, 'S')
          break
        case 'V':
          this.changeInput(String(Math.round(a * 100)), 0, 'V')
          break
        case 'R':
          this.changeInput(String(Math.round(a * 255)), 1, 'R')
          break
        case 'G':
          this.changeInput(String(Math.round(a * 255)), 1, 'G')
          break
        case 'B':
          this.changeInput(String(Math.round(a * 255)), 1, 'B')
          break
      }
    },
    roundMove: function (event) {
      if (!this.roundArr[0]) {
        this.roundArr[0] = document.getElementsByClassName('colorMapBox')[0].getBoundingClientRect().left
        this.roundArr[1] = document.getElementsByClassName('colorMapBox')[0].getBoundingClientRect().top
      }
      this.moveRound(event)
      document.getElementsByClassName('colorMapBox')[0].addEventListener('mousemove', this.moveRound)
    },
    moveRound: function (e) {
      var x = e.clientX - this.roundArr[0]
      var y = e.clientY - this.roundArr[1]
      this.changeInput(String(Math.round(x / 256 * 100)), 0, 'S')
      this.changeInput(String(Math.round((1 - y / 256) * 100)), 0, 'V')
    }
  },
  watch: {
    newColorStyle (val) {
      this.$store.commit('changeglobalColor', [Math.round(this.colorArr[1].R), Math.round(this.colorArr[1].G), Math.round(this.colorArr[1].B)])
    },
    showColorPicker (val) {
      if (val) {
        this.prvColor = [].concat(this.globalColor)
        var rgb = {
          R: this.prvColor[0],
          G: this.prvColor[1],
          B: this.prvColor[2]
        }
        var col = this.rgbToHex(rgb)
        var hsv = this.rgbTohsv(rgb)
        this.changeArr(hsv, rgb, col)
      }
    }
  }
}
</script>

<style lang="scss">
.colorWrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 540px;
  height: 320px;
  background-color: #efefef;
  border: 1px outset #95B8E7;
  font-family: Arial, Helvetica, Sans-Serif;
  border-radius: 5px;
  .colorTitle {
    background-color: #ECF3FF;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #95B8E7;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    .colorClose {
      background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
      cursor: pointer;
      margin-left: 454px;
    }
  }
  .colorContent {
    display: flex;
    .borderStyle {
      border-bottom: 2px solid #fff;
      border-left: 2px solid #9a9a9a;
      border-right: 2px solid #fff;
      border-top: 2px solid #9a9a9a;
    }
    .colorMap {
      margin-top: 15px;
      h2 {
        font-size: 10px;
        margin: 0;
        text-align: center;
      }
      .colorMapBox {
        position: relative;
        width: 256px;
        height: 256px;
        margin: 0 10px;
        overflow: hidden;
        background-color: rgb(255, 0, 0);
        background-image: url('../../src/assets/images/Maps.png');
        cursor: crosshair;
        img {
          position: absolute;
          width: 15px;
          height: 15px;
          transform: translateX(-50%) translateY(-50%);
        }
      }
    }
    .colorMapBar {
      .colorBar {
        position: relative;
        width: 20px;
        height: 256px;
        margin: 28px 10px 0 5px;
        overflow: hidden;
        background-image: url('../../src/assets/images/Bars.png');
        cursor: n-resize;
        img {
          position: absolute;
          width: 19px;
          height: 7px;
          transform: translateY(-50%);
        }
      }
    }
    .colorActive {
      width: 100px;
      .colorActiveTop {
        font-size: 9px;
        text-align: center;
        &:before {
          content: 'new'
        }
        &:after {
          content: 'current'
        }
        .colorActiveBox {
          margin: 0 auto;
          width: 60px;
          height: 60px;
          div {
            height: 30px;
          }
        }
      }
      .colorActiveSelect {
        .marginStyle {
          margin: 20px 0;
        }
        .colorActiveSelectList {
          display: flex;
          align-items: center;
          font-family: Microsoft YaHei;
          margin: 5px 0;
          .selectName {
            width: 12px;
          }
          .selectInput {
            width: 30px;
            height: 15px;
            outline: none;
            border: 1px solid #aaa;
            margin: 0 5px;
          }
          .selectInputBottom {
            width: 50px;
          }
        }
      }
    }
    .colorButton {
      width: 114.4px;
      .colorButtonTop {
        border-bottom: 1px solid #000;
        margin-top: 12px;
        button {
          box-sizing: content-box;
          width: 96px;
          height: 16.8px;
          padding: 2px 0;
          margin-bottom: 5px;
          margin-left: 7.2px;
        }
      }
      .colorButtonGrid {
        margin-top: 10px;
        span {
          float: left;
          width: 17px;
          height: 15px;
          border: 1px inset #aaa;
          cursor: pointer;
        }
        .colorButtonGridDle {
          background-image: url('../../src/assets/images/NoColor.png')
        }
      }
    }
  }
}
</style>
