<template>
  <div class="img-storage">
    <div class="img-wrapper">
      <div class="img-left">
        <div>最近使用项</div>
        <button>新建</button>
        <button>打开</button>
      </div>
      <div class="img-right">
        <div class="img-box">
          <div class="img-border" v-for="(item, index) in imgArr" :key="index">
            <div class="img-content">
              <img :src="item.url" alt="" srcset="">
            </div>
            <div class="img-title">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgstr',
  data () {
    return {
      imgArr: [{
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/b.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/c.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }, {
        title: '新建画布1.png',
        url: require('../../src/assets/files/a.jpg')
      }]
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
              max-width: 100%;
            }
          }
          .img-title {
            text-align: center;
            color: #95B8E7;
          }
        }
      }
    }
  }
}
</style>
