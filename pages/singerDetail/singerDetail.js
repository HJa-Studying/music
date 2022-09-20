// pages/singerDetail/singerDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerInfo:'',    //歌手id
    singerDetail:'',  //歌手详情
    singerMusic:[]  //歌手热门歌曲
  },

  // 获取歌手详情
  getSingerDetail(){
    wx.request({
      url: 'https://autumnfish.cn/artist/desc?id='+this.data.singerInfo.id,
      method:"GET",
      success:(res)=>{
       this.setData({
        singerDetail : res.data.briefDesc
       })
      }
    })
  },
  // 获取歌手热门歌曲
  getSingerMusic(){
    wx.request({
      url: 'https://autumnfish.cn/artist/top/song?id='+this.data.singerInfo.id,
      success:(res)=>{
        this.setData({
          singerMusic:res.data.songs
        })
      }
    })
  },

  // 判断所点击的音乐是否可播放
  playMusic(e){
    const musicId = e.currentTarget.dataset.index   //获取所点击的歌曲id
    wx.request({
      url: 'https://autumnfish.cn/check/music?id='+musicId,
      complete:(res)=>{
        if(res.data.message==="ok"){
           wx.navigateTo({
             url: '/pages/play/play',
             success:(result)=>{
               result.eventChannel.emit("acceptDataFromOpenerPage",{data:musicId})
             }
           })

        }else{
          wx.showModal({
            content:'当前歌曲没有版权，无法播放',
            showCancel:true,
            title:'提示',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data =>{
      this.setData({
        singerInfo:data.data
      })
    })
    this.getSingerDetail()
    this.getSingerMusic()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})