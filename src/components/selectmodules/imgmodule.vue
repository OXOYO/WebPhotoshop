<template>
  <div class="selectImg">
    &nbsp;&nbsp;
    <img :src="requireUrl(optionalObj.imgName[0])" height="16" width="16" @click="canvasScale('enlarge')">
    <img :src="requireUrl(optionalObj.imgName[1])" height="16" width="16" @click="canvasScale('narrow')">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'imgmodule',
  props: ['optionalObj'],
  computed: {
    ...mapState([
      'canvasArr',
      'nowCanvas'
    ])
  },
  methods: {
    requireUrl: function (name) {
      return require('../../../src/assets/icons/' + name + '.png')
    },
    canvasScale (string) {
      if (string === 'enlarge') {
        if (this.canvasArr[this.nowCanvas].scaleProportion >= 1) {
          this.canvasArr[this.nowCanvas].scaleProportion += 1
        } else {
          this.canvasArr[this.nowCanvas].scaleProportion += 1 / 3
        }
      } else {
        if (this.canvasArr[this.nowCanvas].scaleProportion > 1) {
          this.canvasArr[this.nowCanvas].scaleProportion -= 1
        } else if (this.canvasArr[this.nowCanvas].scaleProportion > 0.4) {
          this.canvasArr[this.nowCanvas].scaleProportion -= 1 / 3
        }
      }
    }
  }
}
</script>

<style lang="scss">
.selectImg {
  img {
    padding: 3px 6px;
    border: 1px solid #fff;
    margin: 0;
    cursor: pointer;
    &:hover {
      border-color: #95BCFC;
      background: #eaf2ff;
      border-radius: 5px;
    }
  }
}
</style>
