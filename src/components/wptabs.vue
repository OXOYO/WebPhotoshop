<template>
  <div class="tools">
    <ul>
      <li
        v-for="(item, index) in toolList"
        :key="item.id"
        v-bind:title="item.title"
        @click="selectTool(index)"
        :class="{selectBk: toolId==index}"
      >
        <img :src="item.src">
      </li>
    </ul>
    <div title="颜色选择器" class="colorSelect">
      <div class="color-one" @click="openColorPicker(1)" :style="{'z-index': zindex[0], 'background-color': doubleColor[0]}"></div>
      <div class="color-two" @click="openColorPicker(2)" :style="{'z-index': zindex[1], 'background-color': doubleColor[1]}"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popSlot from './popSlot.vue'
export default {
  name: 'wptabs',
  data () {
    return {
      colorkey: 1,
      doubleColor: ['#000', '#fff'],
      changeColor: [[0, 0, 0], [255, 255, 255]]
    }
  },
  components: {
    popSlot
  },
  computed: {
    zindex () {
      return this.colorkey === 1 ? [2, 1] : [1, 2]
    },
    toolList () {
      this.tools.forEach(function (ele) {
        ele.src = require('../../src/assets/tools/' + ele.name + '.png')
      })
      return this.tools
    },
    colorStyle () {
      return 'rgb(' + this.globalColor[0] + ',' + this.globalColor[1] + ',' + this.globalColor[2] + ')'
    },
    ...mapState([
      'tools',
      'toolId',
      'globalColor',
      'popUpsKey',
      'showPops'
    ])
  },
  watch: {
    colorStyle (val) {
      if (this.colorkey === 1) {
        this.changeColor[0] = [].concat(this.globalColor)
        this.doubleColor.splice(0, 1, val)
      } else {
        this.changeColor[1] = [].concat(this.globalColor)
        this.doubleColor.splice(1, 1, val)
      }
    }
  },
  methods: {
    openColorPicker (index) {
      this.$store.commit('changeglobalColor', this.changeColor[index - 1])
      if (index === this.colorkey) {
        this.popUpsKey.colorPicker = true
      } else {
        this.colorkey = index
      }
    },
    selectTool: function (index) {
      this.$store.commit('changeToolId', index)
    },
    hideTools: function () {
      this.showPops.showTools = false
    }
  }
}
</script>

<style lang="scss">
.tools {
  width: 40px;
  margin-top: 7px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      width: 28px;
      height: 22px;
      border: 1px solid #95B8E7;
      border-radius: 5px;
      margin: 5px 0;
      cursor: pointer;
      &:hover {
        background-color: #D3E3F2;
      }
      img {
        width: 16px;
        height: 16px;
        margin: 3px 6px;
      }
    }
    .selectBk {
      background-color: #D3E3F2;
    }
  }
  .colorSelect {
    margin: 0 auto;
    margin-top: 5px;
    width: 24px;
    height: 24px;
    position: relative;
    .color-one,
    .color-two {
      box-sizing: border-box;
      cursor: pointer;
      position: absolute;
      width: 16px;
      height: 16px;
      border: 1px solid #000;
    }
    .color-two {
      top: 8px;
      left: 8px;
    }
  }
}
</style>
