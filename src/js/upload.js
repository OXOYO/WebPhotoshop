import store from '../store'
// 上传图片到node服务器
function upload (vue, index) {
  var canvasArr = vue.canvasArr[index]
  var canvas = canvasArr.canvas
  var img = canvas.toDataURL('image/png')
  var name = canvasArr.name
  var params = {
    id: store.state.accountObj.id,
    name: name,
    img: img
  }
  vue.$http.post('/api/upload', params)
    .then((response) => {
      // 响应成功回调
      console.log(response)
    })
    .catch((reject) => {
      console.log(reject)
    })
}
export default upload
