<template>
  <popSlot :name="name" :title="dataObj.title" :prop="name">
    <div class="recordWrapper fieldset">
      <div class="fieldsetTop">
        <fieldset class="fieldsetBox" v-for="(item, index) in dataObj.data" :key="item.id">
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
import { mapState } from 'vuex'
import buttonIcon from './buttonIcon.vue'
import popSlot from '../../components/popSlot.vue'
export default {
  name: 'field-set',
  data () {
    return {
      index: '',
      left: [130, 130],
      num: [0, 0]
    }
  },
  props: ['name'],
  components: {
    buttonIcon,
    popSlot
  },
  computed: {
    dataObj () {
      return this.canvasArr[this.nowCanvas][this.name]
    },
    ...mapState([
      'popUpsKey',
      'canvasArr',
      'nowCanvas'
    ])
  },
  methods: {
    close (prop) {
      if (prop === this.name) {
        // 取消
        this.dataObj.data[0].num = this.num[0]
        this.dataObj.data[1].num = this.num[1]
        this.left[0] = (this.num[0] + 50) / 100 * 260
        this.left[1] = (this.num[1] + 50) / 100 * 260
      } else {
        // 确定
        this.num[0] = this.dataObj.data[0].num
        this.num[1] = this.dataObj.data[1].num
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
      var arr = this.dataObj.data[this.index].len
      this.dataObj.data[this.index].num = Math.round(x / 260 * (arr[1] - arr[0]) + arr[0])
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
