<template>
  <div class="borderBox">
    <div class="wrapper">
			<div class="header">
				<nava></nava>
			</div>
			<div class="main">
				<alloption></alloption>
				<div class="mainContent" :style="mainStyle">
					<sketchpad></sketchpad>
          <wptabs></wptabs>
          <record></record>
          <colorPicker></colorPicker>
				</div>
			</div>
			<bot></bot>
		</div>
    <popUps></popUps>
  </div>
</template>

<script>
import Nava from './Nava.vue'
import alloption from './alloption.vue'
import wptabs from './wptabs.vue'
import Sketchpad from './Sketchpad.vue'
import Bot from './Bot.vue'
import record from './record.vue'
import colorPicker from './colorPicker.vue'
import popUps from './popUps.vue'
import { mapState } from 'vuex'
export default {
  name: 'wrapper',
  data () {
    return {
      screenHeight: document.body.clientHeight
    }
  },
  mounted () {
    const that = this
    this.sketchpadOffset.width = document.getElementsByClassName('sketchpad')[0].offsetWidth
    this.sketchpadOffset.height = document.getElementsByClassName('sketchpad')[0].offsetHeight
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
        this.sketchpadOffset.width = document.getElementsByClassName('sketchpad')[0].offsetWidth
        this.sketchpadOffset.height = document.getElementsByClassName('sketchpad')[0].offsetHeight
      })()
    }
  },
  computed: {
    ...mapState([
      'tools',
      'toolId',
      'sketchpadOffset'
    ]),
    mainStyle: function () {
      var h = this.screenHeight - 117 + 'px'
      return {height: h}
    }
  },
  components: {
    Nava,
    alloption,
    wptabs,
    Sketchpad,
    Bot,
    record,
    colorPicker,
    popUps
  },
  methods: {}
}
</script>

<style>
.mainContent {
	position: relative;
	background-color: rgb(201, 211, 226);
	border-bottom: 1px solid #95B8E7;
  overflow: hidden;
}
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.title {
  font-weight: bold;
  color: #0E2D5F;
}
.popStyle {
  padding: 5px;
  border: 1px solid #81ADE3;
  border-radius: 5px;
  background: linear-gradient(to bottom,#EFF5FF 0,#A7C4EA 20%);
}
.recordTitle {
  margin-bottom: 5px;
}
.recordWrapper {
  border: 1px solid #81ADE3;
  background-color: #ffffff;
}
.iconOne {
  float: left;
}
.iconTwo {
  float: right;
  background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
  cursor: pointer;
}
.iconTle {
  vertical-align: top;
  padding-left: 18px;
}
</style>
