<template>
  <popSlot :name="'history'" :title="'操作'" :prop="'showRecord'">
    <div class="recordWrapper record">
      <div class="recordWrapperTle">
        <span v-bind:class="classObjectOne" @click="selectBox($event)">历史记录</span>
        <span v-bind:class="classObjectTwo" @click="selectBox($event)">图层管理</span>
      </div>
      <div class="historyList" v-show="selectspan=='历史记录'">
        <div class="recordWrapperCon">
          <div
            class="recordWrapperConList"
            v-for="(item, index) in repeatArr"
            :key="item.id" :title="item.title"
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
      <div class="levelList" v-show="selectspan=='图层管理'">
        <div class="recordWrapperCon">
          <div class="recordWrapperConList">
            <img src="../../src/assets/icons/background.png" height="16" width="16">
            <span>背景</span>
            <input type="checkbox" v-model="value" @click="!value">
          </div>
        </div>
        <div class="recordWrapperFot">
          <img src="../../src/assets/icons/newlevel.png" height="16" width="16" title="新建图层">
          <img src="../../src/assets/icons/no.png" height="16" width="16" title="删除图层">
          <img src="../../src/assets/icons/copylevel.png" height="16" width="16" title="复制图层">
          <img src="../../src/assets/icons/uplevel.png" height="16" width="16" title="向上移动图层">
          <img src="../../src/assets/icons/downlevel.png" height="16" width="16" title="向下移动图层">
          <img src="../../src/assets/icons/levelinfo.png" height="16" width="16" title="图层属性">
        </div>
      </div>
    </div>
  </popSlot>
</template>

<script>
import { mapState } from 'vuex'
import popSlot from './popSlot.vue'
export default {
  name: 'record',
  data () {
    return {
      selectspan: '历史记录',
      value: true
    }
  },
  components: {
    popSlot
  },
  computed: {
    repeatArr () {
      var arr = this.canvasArr[this.nowCanvas].dataArr
      var repArr = []
      this.effectArr.forEach(function (ele) {
        ele.src = require('../../src/assets/icons/' + ele.name + '.png')
      })
      var tollsArr = this.tools.concat(this.effectArr)
      arr.forEach(ele => {
        repArr.push(tollsArr[ele.id])
      })
      return repArr
    },
    ...mapState([
      'canvasArr',
      'nowCanvas',
      'tools',
      'effectArr',
      'showPops'
    ]),
    getArrIndex: {
      get () {
        return this.canvasArr[this.nowCanvas].index
      },
      set (val) {
        this.canvasArr[this.nowCanvas].index = val
      }
    },
    classObjectOne: function () {
      return {
        selectSpan: this.selectspan === '历史记录',
        title: this.selectspan === '历史记录'
      }
    },
    classObjectTwo: function () {
      return {
        selectSpan: this.selectspan === '图层管理',
        title: this.selectspan === '图层管理'
      }
    }
  },
  methods: {
    selectBox: function (event) {
      this.selectspan = event.target.innerText
    },
    hideRecord: function () {
      this.showPops.showRecord = false
    },
    changeIndex (str) {
      var length = this.canvasArr[this.nowCanvas].dataArr.length - 1
      var index = this.canvasArr[this.nowCanvas].index
      if (str === 'undo') {
        if (index) {
          this.canvasArr[this.nowCanvas].index = index - 1
        }
      } else if (str === 'redo') {
        if (index < length) {
          this.canvasArr[this.nowCanvas].index = index + 1
        }
      } else if (str === 'undoall') {
        this.canvasArr[this.nowCanvas].index = 0
      } else {
        this.canvasArr[this.nowCanvas].index = length
      }
    }
  }
}
</script>

<style lang="scss">
.recordWrapper {
  position: relative;
  width: 238px;
  height: 164px;
  .recordWrapperTle {
    height: 29px;
    background-color: #D3E3F2;
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
    .selectSpan {
      background: linear-gradient(to bottom,#EFF5FF 0,#ffffff 100%);
      border-bottom-color: #fff;
    }
  }
  .historyList, .levelList{
    position: absolute;
    top: 30px;
    width: 100%;
    .recordWrapperCon {
      height: 110px;
      overflow-y: auto;
      cursor: pointer;
      .recordWrapperConList {
        height: 24px;
        border: 1px solid #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        img {
          margin: 0 5px;
        }
      }
      .selectStyle {
        border-color: #95BCFC;
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
