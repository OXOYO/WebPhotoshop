<template>
  <div class="selectImg">
    &nbsp;&nbsp;
    <img :src="requireUrl(optionalObj.imgName[0])" height="16" width="16">
    <img :src="requireUrl(optionalObj.imgName[1])" height="16" width="16">
  </div>
</template>

<script>
export default {
  name: 'imgmodule',
  props: ['optionalObj'],
  methods: {
    requireUrl: function (name) {
      return require('../../../src/assets/icons/' + name + '.png')
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
