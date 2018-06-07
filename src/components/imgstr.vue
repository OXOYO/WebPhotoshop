<template>
  <div class="img-storage" v-show="recent.item">
    <div class="img-wrapper">
      <div class="img-left">
        <div>最近使用项</div>
        <button @click="popUpsKey.newCanvas=true">新建</button>
        <button @click="open">打开</button>
      </div>
      <div class="img-right">
        <div class="img-box">
          <div class="img-border" v-for="(item, index) in accountObj.imgUrl" :key="index" @click="openOlineImg(item)">
            <div class="img-content">
              <img :src="item" alt="" srcset="">
            </div>
            <div class="img-title">{{/[^/+]+\.\w+/.exec(item)[0]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import openImg from '../js/openImg'
export default {
  name: 'imgstr',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'recent',
      'accountObj',
      'popUpsKey'
    ])
  },
  methods: {
    open () {
      openImg.openLocalImg()
    },
    openOlineImg (src) {
      openImg.openOnlineImg(src)
    }
  }
}
</script>

<style lang="scss">
.img-storage {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #c9d3e2;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-wrapper {
    display: flex;
    background-color: #EDF5FA;
    width: 984px;
    height: 90%;
    .img-left {
      width: 100px;
      padding: 10px;
      div {
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        color: #95B8E7;
        margin-bottom: 20px;
      }
      button {
        width: 100px;
        height: 30px;
        color: #95B8E7;
        background-color: #EDF5FA;
        border: 1px solid #95B8E7;
        outline: 0;
        cursor: pointer;
        border-radius: 15px;
        margin-bottom: 10px;
        &:hover {
          background-color: #fff;
        }
      }
    }
    .img-right {
      flex: 1;
      .img-box {
        display: flex;
        flex-wrap: wrap;
        .img-border {
          width: 180px;
          height: 160px;
          padding: 0 10px;
          border: 1px solid #95B8E7;
          border-radius: 5px;
          margin: 7px;
          cursor: pointer;
          &:hover {
            background-color: #fff;
          }
          .img-content {
            height: 140px;
            img {
              margin-left: 50%;
              transform: translateX(-50%);
              max-width: 100%;
              max-height: 100%;
            }
          }
          .img-title {
            text-align: center;
            color: #95B8E7;
            // 单行文字溢出打点
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
