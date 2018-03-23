<template>
  <div class="record">
    <div class="recordTitle">
      <span class="iconOne icon"></span>
      <span class="iconTle title">操作</span>
      <span class="iconTwo icon"></span>
    </div>
    <div class="recordWrapper">
      <div class="recordWrapperTle">
        <span v-bind:class="classObjectOne" @click="selectBox($event)">历史记录</span>
        <span v-bind:class="classObjectTwo" @click="selectBox($event)">图层管理</span>
      </div>
      <div class="historyList" v-show="selectspan=='历史记录'">
        <div class="recordWrapperCon">
          <div class="recordWrapperConList">
            <img src="../../src/assets/icons/new.png" height="16" width="16">
            <span>新建</span>
          </div>
          <div class="recordWrapperConList">
            <img src="../../src/assets/icons/new.png" height="16" width="16">
            <span>新建</span>
          </div>
        </div>
        <div class="recordWrapperFot">
          <img src="../../src/assets/icons/undoall.png" height="16" width="16" title="撤销所有">
          <img src="../../src/assets/icons/undo.png" height="16" width="16" title="撤销">
          <img src="../../src/assets/icons/redo.png" height="16" width="16" title="重做">
          <img src="../../src/assets/icons/redoall.png" height="16" width="16" title="重做所有">
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
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      selectspan: '历史记录',
      value: true
    }
  },
  computed: {
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
    }
  }
}
</script>

<style lang="scss">
.record {
  position: absolute;
  top: 4px;
  right: 10px;
  width: 238px;
  padding: 5px;
  border: 1px solid #81ADE3;
  border-radius: 5px;
  background: linear-gradient(to bottom,#EFF5FF 0,#A7C4EA 20%);
  .recordTitle {
    display: flex;
    .iconOne {
      background: url('../../src/assets/icons/history.png') no-repeat center center;
    }
    .iconTwo {
      background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
      margin-left: 182px;
      cursor: pointer;
    }
  }
  .recordWrapper {
    position: relative;
    height: 164px;
    margin-top: 5px;
    border: 1px solid #81ADE3;
    background-color: #ffffff;
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
        margin-top: 3px;
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
        .recordWrapperConList {
          height: 24px;
          border: 1px solid #fff;
          border-radius: 5px;
          display: flex;
          align-items: center;
          img {
            margin: 0 5px;
          }
          &:hover {
            border-color: #95BCFC;
            background-color: #eaf2ff;
          }
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
}
</style>
