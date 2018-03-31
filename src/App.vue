<template>
	<div id="app">
		<div class="wrapper">
			<div class="header">
				<nava></nava>
			</div>
			<div class="main">
				<alloption></alloption>
				<div class="mainContent" :style="mainStyle">
					<wptabs></wptabs>
					<sketchpad></sketchpad>
          <record></record>
          <colorPicker></colorPicker>
				</div>
			</div>
			<bot></bot>
		</div>
	</div>
</template>

<script>
import Nava from './components/Nava.vue'
import alloption from './components/alloption.vue'
import wptabs from './components/wptabs.vue'
import Sketchpad from './components/Sketchpad.vue'
import Bot from './components/Bot.vue'
import record from './components/record.vue'
import colorPicker from './components/colorPicker.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      screenHeight: document.body.clientHeight
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  computed: {
    ...mapState([
      'tools',
      'toolId'
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
    colorPicker
  },
  methods: {}
}
</script>

<style>
* {
	font-family: Microsoft YaHei;
	color: #444;
	font-size: 12px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
html,body {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
}
#app {
	width: 100%;
	height: 100%;
}
.mainContent {
	position: relative;
	height: 100vh - 116px;
	background-color: rgb(201, 211, 226);
	border-bottom: 1px solid #95B8E7;
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
</style>
