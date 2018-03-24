<template>
  <div class="nav">
    <div>
      <span>文件</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/new.png" height="16" width="16">
          <span>新建</span>
        </div>
        <div class="navBox" @click="openImg">
          <img src="../../src/assets/icons/open.png" height="16" width="16">
          <span>打开</span>
          <span>Ctrl+G</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/fromCam.png" height="16" width="16">
          <span>获取</span>
          <span>Ctrl+M</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/cancel.png" height="16" width="16">
          <span>关闭</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/closeall.png" height="16" width="16">
          <span>关闭全部</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/filesave.png" height="16" width="16">
          <span>保存</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/saveall.png" height="16" width="16">
          <span>保存全部</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/saveas.png" height="16" width="16">
          <span>另存为</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/print.png" height="16" width="16">
          <span>打印</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/back.png" height="16" width="16">
          <span>退出</span>
        </div>
      </div>
    </div>
    <div>
      <span>编辑</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/undo.png" height="16" width="16">
          <span>撤销</span>
          <span>Ctrl+Z</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/redo.png" height="16" width="16">
          <span>重做</span>
          <span>Ctrl+Y</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/cut.png" height="16" width="16">
          <span>剪切</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/copy.png" height="16" width="16">
          <span>复制</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/paste.png" height="16" width="16">
          <span>粘贴</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/selectall.png" height="16" width="16">
          <span>选择所有</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/clear.png" height="16" width="16">
          <span>清空</span>
          <span>Ctrl+Q</span>
        </div>
      </div>
    </div>
    <div>
      <span>图像</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <span>调整</span>
          <span class="navBoxHide icon"></span>
          <div class="navHide">
            <div class="navLine"></div>
            <div class="navBox">
              <img src="../../src/assets/icons/autolevel.png" height="16" width="16">
              <span>色阶</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/colorpalettes.png" height="16" width="16">
              <span>色相/饱和度</span>
            </div>
          </div>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/imgsize.png" height="16" width="16">
          <span>图像大小</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/canvassize.png" height="16" width="16">
          <span>画布大小</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <span>旋转画布</span>
          <span class="navBoxHide icon"></span>
          <div class="navHide">
            <div class="navLine"></div>
            <div class="navBox">
              <img src="../../src/assets/icons/rotate180.png" height="16" width="16">
              <span>旋转180度</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/rotatew90.png" height="16" width="16">
              <span>顺时针旋转90度</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/rotatee90.png" height="16" width="16">
              <span>逆时针旋转90度</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/inputcc.png" height="16" width="16">
              <span>旋转任意角度</span>
            </div>
            <div class="navSep"></div>
            <div class="navBox">
              <img src="../../src/assets/icons/horizonrotate.png" height="16" width="16">
              <span>水平翻转</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/verticalrotate.png" height="16" width="16">
              <span>垂直翻转</span>
            </div>
          </div>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/tailor.png" height="16" width="16">
          <span>裁剪</span>
        </div>
      </div>
    </div>
    <div>
      <span>图层</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/newlevel.png" height="16" width="16">
          <span>新建图层</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/no.png" height="16" width="16">
          <span>删除图层</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/copylevel.png" height="16" width="16">
          <span>复制图层</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/uplevel.png" height="16" width="16">
          <span>向上移动图层</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/downlevel.png" height="16" width="16">
          <span>向下移动图层</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/levelinfo.png" height="16" width="16">
          <span>图层属性</span>
        </div>
      </div>
    </div>
    <div>
      <span>效果</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox" @click="selectGrayscale('黑白')">
          <img src="../../src/assets/icons/blackwhite.png" height="16" width="16">
          <span>黑白</span>
          <span>Ctrl+Shift+W</span>
        </div>
        <div class="navBox" @click="selectGrayscale('反色')">
          <img src="../../src/assets/icons/opsitecolor.png" height="16" width="16">
          <span>反色</span>
          <span>Ctrl+Shift+I</span>
        </div>
        <div class="navBox" @click="selectGrayscale('亮度/对比度')">
          <img src="../../src/assets/icons/light.png" height="16" width="16">
          <span>亮度/对比度</span>
        </div>
        <div class="navBox" @click="selectGrayscale('模糊')">
          <img src="../../src/assets/icons/blur.png" height="16" width="16">
          <span>模糊</span>
          <span>Ctrl+Shift+B</span>
        </div>
        <div class="navBox" @click="selectGrayscale('雾化')">
          <img src="../../src/assets/icons/cloud.png" height="16" width="16">
          <span>雾化</span>
          <span>Ctrl+Shift+M</span>
        </div>
        <div class="navBox" @click="selectGrayscale('锐化')">
          <img src="../../src/assets/icons/sharpen.png" height="16" width="16">
          <span>锐化</span>
          <span>Ctrl+Shift+S</span>
        </div>
        <div class="navBox" @click="selectGrayscale('浮雕')">
          <img src="../../src/assets/icons/float.png" height="16" width="16">
          <span>浮雕</span>
          <span>Ctrl+Shift+F</span>
        </div>
        <div class="navBox" @click="selectGrayscale('柔化')">
          <img src="../../src/assets/icons/soft.png" height="16" width="16">
          <span>柔化</span>
          <span>Ctrl+Shift+T</span>
        </div>
        <div class="navBox" @click="selectGrayscale('油画')">
          <img src="../../src/assets/icons/painting.png" height="16" width="16">
          <span>油画</span>
          <span>Ctrl+Shift+P</span>
        </div>
        <div class="navBox" @click="selectGrayscale('积木')">
          <img src="../../src/assets/icons/wood.png" height="16" width="16">
          <span>积木</span>
          <span>Ctrl+Shift+D</span>
        </div>
        <div class="navBox" @click="selectGrayscale('雕刻')">
          <img src="../../src/assets/icons/curve.png" height="16" width="16">
          <span>雕刻</span>
          <span>Ctrl+Shift+V</span>
        </div>
        <div class="navBox" @click="selectGrayscale('怀旧')">
          <img src="../../src/assets/icons/turnold.png" height="16" width="16">
          <span>怀旧</span>
          <span>Ctrl+Shift+O</span>
        </div>
        <div class="navBox">
          <span>蒙版</span>
          <span class="navBoxHide icon"></span>
          <div class="navHide">
            <div class="navLine"></div>
            <div class="navBox">
              <img src="../../src/assets/icons/turnred.png" height="16" width="16">
              <span>红色蒙版</span>
              <span>Ctrl+Shift</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/turngreen.png" height="16" width="16">
              <span>绿色蒙版</span>
              <span>Ctrl+Shift</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/turnblue.png" height="16" width="16">
              <span>蓝色蒙版</span>
              <span>Ctrl+Shift</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span>视图</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/zoomin.png" height="16" width="16">
          <span>放大</span>
          <span>Ctrl+Up</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/zoomout.png" height="16" width="16">
          <span>缩小</span>
          <span>Ctrl+Down</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/ruler.png" height="16" width="16">
          <span>标尺</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/grid.png" height="16" width="16">
          <span>网络</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/fullscreen.png" height="16" width="16">
          <span>全屏模式</span>
        </div>
        <div class="navBox">
          <span>皮肤设置</span>
          <span class="navBoxHide icon"></span>
          <div class="navHide">
            <div class="navLine"></div>
            <div class="navBox">
              <img src="../../src/assets/icons/default.png" height="16" width="16">
              <span>默认</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/bootstrap.png" height="16" width="16">
              <span>bootstrap</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/metro-blue.png" height="16" width="16">
              <span>metro-blue</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/metro-green.png" height="16" width="16">
              <span>metro-green</span>
            </div>
            <div class="navBox">
              <img src="../../src/assets/icons/metro-red.png" height="16" width="16">
              <span>metro-red</span>
            </div>
          </div>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/reset.png" height="16" width="16">
          <span>重置界面</span>
        </div>
      </div>
    </div>
    <div>
      <span>窗口</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/tools.png" height="16" width="16">
          <span>工具箱</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/history.png" height="16" width="16">
          <span>操作</span>
        </div>
      </div>
    </div>
    <div>
      <span>帮助</span>
      <div class="navHide">
        <div class="navLine"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/help.png" height="16" width="16">
          <span>帮助文档</span>
          <span>Ctrl+F1</span>
        </div>
        <div class="navBox">
          <img src="../../src/assets/icons/helpsite.png" height="16" width="16">
          <span>网站</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/send.png" height="16" width="16">
          <span>反馈或报告</span>
        </div>
        <div class="navSep"></div>
        <div class="navBox">
          <img src="../../src/assets/icons/about.png" height="16" width="16">
          <span>关于</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'nava',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'canvasArr'
    ])
  },
  methods: {
    openImg: function () {
      var inputObj = document.createElement('input')
      inputObj.addEventListener('change', readFile, false)
      inputObj.type = 'file'
      inputObj.accept = 'image/*'
      inputObj.click()
      var a = this
      function readFile () {
        var file = this.files[0]// 获取input输入的图片
        var reader = new FileReader()
        reader.readAsDataURL(file)// 转化成base64数据类型
        reader.onload = function (e) {
          var img = new Image()
          img.onload = function () {
            var canvas = document.createElement('canvas')
            canvas.setAttribute('width', img.width)
            canvas.setAttribute('height', img.height)
            var context = canvas.getContext('2d')
            context.drawImage(img, 0, 0)
            var data = context.getImageData(0, 0, img.width, img.height)
            var obj = {
              id: a.canvasArr.length,
              name: file.name,
              width: img.width,
              height: img.height,
              context: '',
              canvas: '',
              imgData: data
            }
            a.$store.commit('changeCanvasArr', obj)
          }
          img.src = this.result
        }
      }
    },
    selectGrayscale: function (string) {
      this.$store.commit('changeSelectGrayscale', string)
    }
  }
}
</script>

<style lang="scss">
  .nav {
    height: 27px;
    border: 1px solid #95B8E7;
    background-color: #EDF5FA;
    display: flex;
    font-size: 12px;
    &>div {
      position: relative;
      margin-right: 2px;
      cursor: pointer;
      &>span {
        display: inline-block;
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid transparent;
        &:hover {
          border: 1px solid #95BCFC;
          border-radius: 5px;
        }
      }
      .navHide {
        position: absolute;
        z-index: 1000;
        font-size: 12px;
        display: none;
        padding: 2px;
        top: 27px;
        width: 150px;
        border: 1px solid #ddd;
        background-color: #fafafa;
        box-shadow: 2px 2px 3px #cccccc;
        .navLine {
          position: absolute;
          left: 24px;
          top: -2px;
          border-right: 1px solid #ccc;
          height: 100%;
        }
        .navSep {
          width: 129px;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #fff;
          margin: 3px 0 3px 23px;
        }
        .navBox {
          height: 20px;
          border: 1px solid transparent;
          position: relative;
          img {
            margin: 2px 2px;
          }
          span:nth-of-type(1) {
            position: absolute;
            vertical-align: top;
            line-height: 20px;
            height: 20px;
            display: inline-block;
            left: 26px;
          }
          span:nth-of-type(2) {
            float: right;
            padding-right: 5px;
          }
          .navBoxHide {
            margin-top: 2px;
            background: url('../../src/assets/default/menu_arrows.png') no-repeat -32px center;
          }
          &>div {
            position: absolute;
            left: 150px;
            top: -4px;
            display: none;
          }
          &:hover {
            border-color: #95BCFC;
            border-radius: 5px;
            background-color: #D1DEF2;
            &>div {
              display: block;
            }
          }
        }
      }
      &:hover {
        .navHide {
          display: block;
        }
      }
    }
  }
</style>
