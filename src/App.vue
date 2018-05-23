<template>
	<div id="app">
    <router-view></router-view>
		<mySvg></mySvg>
	</div>
</template>

<script>
import mySvg from './components/svg'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    mySvg
  }
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
}
</style>
