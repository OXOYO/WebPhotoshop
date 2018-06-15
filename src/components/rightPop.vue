<template>
  <div class="rightPop" v-show="isShow">
    <div class="rightPopTil">{{arr[1]}}</div>
    <!-- 色阶 -->
    <colorLevel></colorLevel>
    <!-- 亮度/对比度 -->
    <fieldSet :name="'light'"></fieldSet>
    <!-- 色相/饱和度 -->
    <fieldSet :name="'colorpalettes'"></fieldSet>
    <!-- 色彩曲线调整工具 -->
    <colorCurve></colorCurve>
    <div class="rightPopBtn">
      <button @click="close">取消</button>
      <button @click="save">确定</button>
    </div>
  </div>
</template>

<script>

import colorLevel from './colorLevel.vue'
import fieldSet from './selectmodules/fieldSet.vue'
import colorCurve from './colorCurve.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'rightpop',
  data () {
    return {
      arr: '',
      isShow: false
    }
  },
  components: {
    colorCurve,
    colorLevel,
    fieldSet
  },
  computed: {
    ...mapState([
      'mainPopKey'
    ]),
    ...mapGetters([
      'nowCanvasArr'
    ])
  },
  methods: {
    close () {
      this.nowCanvasArr.context.putImageData(this.nowCanvasArr.imgData, 0, 0)
      this.mainPopKey[this.arr[0]] = false
    },
    save () {
      let w = this.nowCanvasArr.width
      let h = this.nowCanvasArr.height
      let imgData = this.nowCanvasArr.context.getImageData(0, 0, w, h)
      this.nowCanvasArr.imgData = imgData
      var obj = {
        id: this.arr[2],
        imgData: imgData
      }
      this.$store.commit('changeDataArr', obj)
      this.mainPopKey[this.arr[0]] = false
    }
  },
  watch: {
    mainPopKey: {
      handler () {
        var a = false
        for (const key in this.mainPopKey) {
          if (this.mainPopKey[key]) {
            this.arr = key === 'colorLevel' ? ['colorLevel', '色阶', 28] : key === 'colorCurve' ? ['colorCurve', '曲线', 27] : key === 'light' ? ['light', '亮度/对比度', 26] : ['colorpalettes', '色相/饱和度', 25]
            a = true
            break
          }
        }
        this.isShow = a
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.rightPop {
  border: 1px solid #81ADE3;
  border-radius: 5px;
  .rightPopTil {
    height: 16px;
    border-bottom: 1px solid #81ADE3;
  }
  .rightPopBtn {
    height: 34px;
    border-top: 1px solid #81ADE3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      width: 80px;
      height: 24px;
      border: 1px solid #81ADE3;
      background-color: #fff;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 12px;
      outline: none;
    }
  }
}
</style>
