// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      indexImages:[],    //轮播图
      singers:[],   //热门歌手
      musics:[]      //热门歌曲
  },

  //获取banner图片
  getBanner(){
    wx.request({
      url: "https://autumnfish.cn/banner",
      dataType:"json",
      success:(result)=>{
        this.setData({
          indexImages : result.data.banners
        })
      }
    })
  },
  //获取热门歌手
  getSinger(){
    wx.request({
      url:"https://autumnfish.cn/top/artists",
      dataType:"json",
      success:(result)=>{
        this.setData({
          singers:result.data.artists
        })
      }
    })
  },
  //获取热门歌手信息
  hotlink(e){
    const item = e.currentTarget.dataset.item   //获取所点击的歌手信息
    wx.navigateTo({
      url: '/pages/singerDetail/singerDetail',
      success:(res)=>{
        res.eventChannel.emit('acceptDataFromOpenerPage',{data:item})
      }
    })
  },

  // 获取最新音乐
  getMusic(){
    wx.request({
      url: 'https://autumnfish.cn/personalized/newsong?limit=30',
      dataType:"json",
      success:(result)=>{
        this.setData({
          musics:result.data.result
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
    this.getBanner(),
    this.getSinger(),
    this.getMusic()

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