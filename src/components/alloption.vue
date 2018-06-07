<template>
  <div class="alloption">
    <ul class="toolsDetail">
      <li>
        <img :src="tools[toolId].src">
        <span>{{tools[toolId].title}}</span>
      </li>
      <li v-for="item in tools[toolId].parameter" :key="item.id">
        <dropmodule v-if="item.key == 0" :optional-obj="item"></dropmodule>
        <selectmodule v-else-if="item.key == 3" :optional-obj="item"></selectmodule>
        <checkmodule v-else-if="item.key == 1" :optional-obj="item"></checkmodule>
        <imgmodule v-else :optional-obj="item"></imgmodule>
      </li>
    </ul>
    <div class="tabs">
      <div class="tabsInner" v-for="(item, index) in canvasArr" :key="index" :class="{tabsInnerSelect: index===nowCanvas}">
        <div @click="changeNowCanvas(index)">
          <img src="../../src/assets/icons/log.png" height="16" width="16">
          <span class="tabsInnerName title">{{item.name}}</span>
          <span class="tabsInnerDel icon" @click.stop="popCanvas(index)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkmodule from '../components/selectmodules/checkmodule.vue'
import dropmodule from '../components/selectmodules/dropmodule.vue'
import imgmodule from '../components/selectmodules/imgmodule.vue'
import selectmodule from '../components/selectmodules/selectmodule.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'alloption',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'tools',
      'toolId',
      'canvasArr',
      'nowCanvas',
      'popUpsKey'
    ]),
    ...mapGetters([
      'nowCanvasArr'
    ])
  },
  components: {
    checkmodule,
    dropmodule,
    imgmodule,
    selectmodule
  },
  methods: {
    changeNowCanvas: function (index) {
      this.$store.commit('changeNowCanvas', index)
    },
    popCanvas: function (index) {
      // 如果图片未做改变，直接关闭，如果有更改，打开关闭确认框
      if (this.nowCanvasArr.dataArr.length === 1) {
        this.$store.commit('popCanvasArr', index)
      } else {
        this.popUpsKey.closeCanvas = true
      }
    }
  }
}
</script>

<style lang="scss">
  .toolsDetail {
    height: 35px;
    margin: 0;
    padding: 0 0 0 8px;
    display: flex;
    align-items: center;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      &>img {
        margin-right: 8px;
      }
    }
    li>div {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
      span {
        font-size: 13px;
      }
    }
  }
  .tabs {
    height: 30px;
    background-color: #EDF5FA;
    border: 1px solid #95B8E7;
    .tabsInner {
      cursor: pointer;
      display: inline-block;
      height: 25px;
      background: -webkit-linear-gradient(top,#EFF5FF 0,#D3E3F2 100%);
      border: 1px solid #95B8E7;
      margin-top: 4px;
      margin-left: 5px;
      border-radius: 5px 5px 0 0;
      text-align: center;
      &>div {
        display: inline-block;
        margin-top: 3px;
        height: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-left: 5px;
          margin-right: 4px;
        }
        .tabsInnerDel {
          background: url('../../src/assets/default/tabs_icons.png') no-repeat -34px center;
        }
      }
    }
    .tabsInnerSelect {
      background: linear-gradient(to bottom,#EFF5FF 0,#ffffff 100%);
    }
  }
</style>
