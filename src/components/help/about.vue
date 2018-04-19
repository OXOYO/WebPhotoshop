<template>
  <div>
    <div align="center">
      <!-- <img src="../Images/log.ico" /> -->
      <span style="font-size: 30px;">WebPhotoshop</span>
    </div>
    <hr style="border: 0; background-color: #95B8E7; height: 1px;" />
    <div>
      <p>WebPhotoshop</p>
      <p>版本：1.0(精简版)</p>
      <p>发表日期：2018-04-19</p>
      <p>Create by 毕金风</p>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div style="float: right; margin-right: 30px;">
      <input type="button" value="确定" onclick="Sure();" style="width: 80px; border: 1px solid #95B8E7; height: 26px;" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Sure () {
      // 关闭窗体
      parent.closeMyWindow()
    }
  }
}
</script>

<style>
</style>
