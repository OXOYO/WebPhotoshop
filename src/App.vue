<template>
	<div id="app">
    <router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
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
	width: 100%;
	height: 100%;
}
#app {
	width: 100%;
	height: 100%;
}
</style>
