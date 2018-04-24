<template>
  <div class="popSlot" :class="name + prop" v-show="isShow" :style="popStyle">
    <div class="popSlotTitle">
      <img :src="requireUrl" alt="">
      <div class="title" @mousedown="movePopSlot($event)">{{title}}</div>
      <span class="iconTwo icon" @click="close()"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'popSlot',
  data () {
    return {
      left: 0,
      top: 0,
      num: 0
    }
  },
  props: ['name', 'title', 'prop'],
  mounted () {
    if (this.prop === 'showRecord' || this.prop === 'showTools') {
      this.top = 4
    }
  },
  computed: {
    ...mapState([
      'popUpsKey',
      'showPops'
    ]),
    popStyle () {
      if (this.num) {
        return {
          left: this.left + 'px',
          top: this.top + 'px'
        }
      } else {
        if (this.prop === 'showRecord') {
          return {
            right: '10px',
            top: this.top + 'px'
          }
        } else if (this.prop === 'showTools') {
          return {
            left: '10px',
            top: this.top + 'px'
          }
        }
      }
    },
    requireUrl () {
      if (this.name) return require('../../src/assets/icons/' + this.name + '.png')
    },
    isShow () {
      if (this.prop === 'showRecord' || this.prop === 'showTools') {
        return this.showPops[this.prop]
      } else {
        return this.popUpsKey[this.prop]
      }
    }
  },
  methods: {
    close () {
      if (this.prop === 'showRecord' || this.prop === 'showTools') {
        this.showPops[this.prop] = false
      } else {
        this.popUpsKey[this.prop] = false
      }
    },
    movePopSlot (event) {
      const X = event.pageX - document.getElementsByClassName(this.name + this.prop)[0].offsetLeft
      const Y = event.pageY - document.getElementsByClassName(this.name + this.prop)[0].offsetTop
      const a = this
      document.body.addEventListener('mousemove', move)
      document.body.addEventListener('mouseup', up)
      function move (e) {
        a.left = e.pageX - X
        a.top = e.pageY - Y
        a.num++
      }
      function up () {
        document.body.removeEventListener('mousemove', move)
        document.body.removeEventListener('mouseup', up)
      }
    }
  }
}
</script>

<style lang="scss">
.popSlot {
  position: absolute;
  padding: 5px;
  border: 1px solid #81ADE3;
  border-radius: 5px;
  background: linear-gradient(to bottom,#EFF5FF 0,#A7C4EA 20%);
  .popSlotTitle {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      margin-right: 5px;
    }
    .iconTwo {
      background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
      cursor: pointer;
    }
    .title {
      flex: 1;
      cursor: move;
    }
  }
}
</style>
