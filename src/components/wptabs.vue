<template>
  <popSlot :name="'tools'" :title="'工具箱'" :prop="'showTools'">
    <div class="tools">
      <ul>
        <li v-for="(item, index) in toolList" :key="item.id" v-bind:title="item.title" @click="selectTool(index)" :class="{selectBk: toolId==index}">
          <img :src="item.src">
        </li>
      </ul>
      <div title="颜色选择器" class="colorSelect" :style="colorStyle" @click="isShow"></div>
    </div>
  </popSlot>
</template>

<script>
import { mapState } from 'vuex'
import popSlot from './popSlot.vue'
export default {
  name: 'wptabs',
  data () {
    return {}
  },
  components: {
    popSlot
  },
  computed: {
    toolList () {
      this.tools.forEach(function (ele) {
        ele.src = require('../../src/assets/tools/' + ele.name + '.png')
      })
      return this.tools
    },
    colorStyle () {
      var string = 'rgb(' + this.globalColor[0] + ',' + this.globalColor[1] + ',' + this.globalColor[2] + ')'
      return {
        'background-color': string
      }
    },
    ...mapState([
      'tools',
      'toolId',
      'globalColor',
      'showColorPicker',
      'showPops'
    ])
  },
  methods: {
    selectTool: function (index) {
      this.$store.commit('changeToolId', index)
    },
    hideTools: function () {
      this.showPops.showTools = false
    },
    isShow: function () {
      this.$store.commit('changeShowColorPicker', !this.showColorPicker)
    }
  }
}
</script>

<style lang="scss">
.tools {
  width: 75px;
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
    margin-top: 2px;
  }
}
</style>
