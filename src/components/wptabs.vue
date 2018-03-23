<template>
  <div class="wptabs">
    <div class="toolsTittle">
      <img src="../../src/assets/icons/tools.png" height="16" width="16">
      <span class="title">工具箱</span>
      <span class="toolsCancle icon"></span>
    </div>
    <div class="tools">
      <ul>
        <li v-for="(item, index) in toolList" :key="item.id" v-bind:title="item.title" @click="selectTool(index)" :class="{selectBk: toolId==index}">
          <img :src="item.src">
        </li>
      </ul>
      <div title="颜色选择器" class="colorSelect"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'wptabs',
  data () {
    return {}
  },
  computed: {
    toolList () {
      this.tools.forEach(function (ele) {
        ele.src = require('../../src/assets/tools/' + ele.name + '.png')
      })
      return this.tools
    },
    ...mapState([
      'tools',
      'toolId'
    ])
  },
  methods: {
    selectTool: function (index) {
      this.$store.commit('changeToolId', index)
    }
  }
}
</script>

<style lang="scss">
.wptabs {
  position: absolute;
  top: 4px;
  left: 10px;
  display: inline-block;
  width: 75px;
  padding: 5px;
  background: linear-gradient(to bottom,#EFF5FF 0,#A7C4EA 20%);
  border: 1px solid #81ADE3;
  border-radius: 5px;
  .toolsTittle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .toolsCancle {
      background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
      cursor: pointer;
    }
  }
  .tools {
    background-color: #fff;
    border: 1px solid #5F98EA;
    margin-top: 7px;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        width: 28px;
        height: 22px;
        border: 1px solid #95B8E7;
        border-radius: 5px;
        margin: 3px;
        cursor: pointer;
        &:hover {
          background-color: #eaf2ff;
        }
        img {
          width: 16px;
          height: 16px;
          margin: 3px 6px;
        }
      }
      .selectBk {
        background-color: #eaf2ff;
      }
    }
    .colorSelect {
      height: 50px;
      border: 1px solid #41D0F7;
      border-radius: 8px;
      cursor: pointer;
      background-color: green;
      margin-top: 2px;
    }
  }
}
</style>
