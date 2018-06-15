<template>
  <div class="record">
    <div class="recordWrapperTle">
      历史记录
    </div>
    <div class="historyList">
      <div class="recordWrapperCon" v-scrollBar>
        <div
          class="recordWrapperConList"
          v-for="(item, index) in repeatArr"
          :key="index"
          :title="item.title"
          :class="{selectStyle: index===getArrIndex}"
          @click="getArrIndex=index"
        >
          <img :src="item.src" height="16" width="16">
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="recordWrapperFot">
        <img src="../../src/assets/icons/undoall.png" height="16" width="16" title="撤销所有" @click="changeIndex('undoall')">
        <img src="../../src/assets/icons/undo.png" height="16" width="16" title="撤销" @click="changeIndex('undo')">
        <img src="../../src/assets/icons/redo.png" height="16" width="16" title="重做" @click="changeIndex('redo')">
        <img src="../../src/assets/icons/redoall.png" height="16" width="16" title="重做所有" @click="changeIndex('redoall')">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'record',
  data () {
    return {
      tollsArr: ''
    }
  },
  mounted () {
    this.effectArr.forEach(function (ele) {
      ele.src = require('../../src/assets/icons/' + ele.name + '.png')
    })
    this.tollsArr = this.tools.concat(this.effectArr)
  },
  computed: {
    repeatArr () {
      var arr = this.nowCanvasArr ? this.nowCanvasArr.dataArr : []
      var repArr = []
      arr.forEach(ele => {
        repArr.push(this.tollsArr[ele.id])
      })
      return repArr
    },
    ...mapState([
      'tools',
      'effectArr',
      'showPops'
    ]),
    ...mapGetters([
      'nowCanvasArr'
    ]),
    getArrIndex: {
      get () {
        return this.nowCanvasArr.index
      },
      set (val) {
        this.nowCanvasArr.index = val
      }
    }
  },
  methods: {
    changeIndex (str) {
      var length = this.nowCanvasArr.dataArr.length - 1
      var index = this.getArrIndex
      if (str === 'undo') {
        // 撤销
        if (index) {
          this.getArrIndex = index - 1
        }
      } else if (str === 'redo') {
        // 重做
        if (index < length) {
          this.getArrIndex = index + 1
        }
      } else if (str === 'undoall') {
        // 撤销所有
        this.getArrIndex = 0
      } else {
        // 重做所有
        this.getArrIndex = length
      }
      this.nowCanvasArr.imgData = this.nowCanvasArr.dataArr[this.getArrIndex].imgData
      this.nowCanvasArr.context.putImageData(this.nowCanvasArr.imgData, 0, 0)
    }
  }
}
</script>

<style lang="scss">
.record {
  border-radius: 5px;
  border: 1px solid #95B8E7;
  .recordWrapperTle {
    height: 16px;
    border-bottom: 1px solid #95B8E7;
    span {
      padding: 4.5px 10px;
      border: 1px solid #95B8E7;
      border-radius: 5px 5px 0 0;
      background: -webkit-linear-gradient(top,#EFF5FF 0,#D3E3F2 100%);
      float: left;
      margin-left: 5px;
      margin-top: 4px;
      cursor: pointer;
    }
  }
  .historyList {
    .recordWrapperCon {
      position: relative;
      height: 140px;
      overflow-y: auto;
      cursor: pointer;
      .recordWrapperConList {
        display: flex;
        align-items: center;
        height: 24px;
        box-sizing: border-box;
        img {
          margin: 0 5px;
        }
      }
      .selectStyle {
        border: 1px solid #95BCFC;
        background-color: #eaf2ff;
      }
    }
    .recordWrapperFot {
      height: 24px;
      border-top: 1px solid #95B8E7;
      display: flex;
      align-items: center;
      img {
        padding: 0px 6px;
        cursor: pointer;
      }
    }
  }
}
</style>
