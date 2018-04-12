<template>
	<div class="footer">
   <span class="footLeft">{{description}}</span>
   <span class="footRight">X:{{parseInt(offset[0])}},Y:{{parseInt(offset[1])}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'bot',
  computed: {
    description: function () {
      var obj = this.tools[this.toolId]
      var string = obj.title + ' ：' + obj.description
      return string
    },
    ...mapState([
      'tools',
      'toolId',
      'offset'
    ])
  }
}
</script>

<style lang="scss">
.footer {
	height: 20px;
  font-size: 13px;
  span {
    line-height: 20px;
  }
  .footLeft {
    float: left;
    margin-left: 20px;
  }
  .footRight {
    float: right;
    margin-right: 20px;
  }
}
</style>
