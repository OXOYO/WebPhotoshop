<template>
  <div>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;{{optionalObj.title}}：</span>
    <input class="selectCheckbox" type="checkbox" v-model="optionalObj.isCheck" @click="!optionalObj.isCheck">
  </div>
</template>

<script>
export default {
  name: 'checkmodule',
  props: ['optionalObj']
}
</script>

<style lang="scss">
.selectCheckbox {
  margin: 0;
  margin-top: 2px;
}
</style>
