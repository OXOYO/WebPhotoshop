<template>
  <div>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;{{optionalObj.title}}：</span>
    <div class="spinner">
      <input class="spinnerInput spinnerInputMax" v-model="optionalObj.choose">
      <div class="spinnerArrow">
        <div class="spinnerArrowUp" @click="numberUp"></div>
        <div class="spinnerArrowDown" @click="numberDown"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectmodule',
  props: ['optionalObj'],
  methods: {
    numberUp: function () {
      if (typeof this.optionalObj.choose === 'number') {
        if (this.optionalObj.choose !== 100) {
          this.optionalObj.choose++
        }
      } else {
        if (parseInt(this.optionalObj.choose) !== 100) {
          this.optionalObj.choose = parseInt(this.optionalObj.choose) + 1 + '%'
        }
      }
    },
    numberDown: function () {
      if (typeof this.optionalObj.choose === 'number') {
        if (this.optionalObj.choose !== 1) {
          this.optionalObj.choose--
        }
      } else {
        if (parseInt(this.optionalObj.choose) !== 1) {
          this.optionalObj.choose = parseInt(this.optionalObj.choose) - 1 + '%'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.spinner {
  border: 1px solid #95B8E7;
  display: flex;
  align-items: center;
  .spinnerInput {
    border: none;
    padding: 0 2px;
    width: 30px;
    height: 20px;
  }
  .spinnerInputMax {
    width: 36px;
  }
  .spinnerArrow {
    width: 18px;
    height: 20px;
    background-color: #E0ECFF;
    div {
      height: 10px;
    }
    .spinnerArrowUp {
      background: url('../../../src/assets/default/spinner_arrows.png') no-repeat 1px center;
    }
    .spinnerArrowDown {
      background: url('../../../src/assets/default/spinner_arrows.png') no-repeat -15px center;
    }
  }
}
</style>
