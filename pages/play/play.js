// pages/play/play.js
const innerAudioContext = wx.createInnerAudioContext({})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId: '', //播放歌曲id
    musicInfo: {}, //歌曲信息
    musicLength: '', //歌曲时长
    musicTime: '', //歌曲单前播放位置
    musicS: '', //歌曲已播放秒数
    lrc:[],   //歌词
    isPlay: false //播放状态
  },

  // 获取音乐详情
  getMusicDetail() {
    wx.request({
      url: 'https://autumnfish.cn/song/detail?ids=' + this.data.musicId,
      dataType: "json",
      success: (result) => {
        let musicTime = result.data.songs[0].dt
        let ss = Math.floor(musicTime / 1000 % 60);
        let mm = Math.floor(musicTime / (1000 * 60));
        if (ss < 10) {
          ss = '0' + ss
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        this.setData({
          musicInfo: result.data.songs[0],
          musicLength: mm + ":" + ss
        })
      }
    })
  },
  // 获得歌词
  getlrc(){
    wx.request({
      url: 'https://autumnfish.cn/lyric?id='+this.data.musicId,
      dataType:"json",
      success:(result)=>{
        let  lyric = result.data.lrc.lyric.split('\n')
        let l = []
        lyric.forEach(item=>{
            if(item){
              l.push(item.split(']')[1])                
            }
        })
        this.setData({
          lrc:l
        })
      }
    })
  },
  // 播放音乐功能
  playMusic() {
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.musicId}.mp3`
    this.setData({
      isPlay: true
    })
    innerAudioContext.play() // 播放
    this.getSliderValue()
  },
  pauseMusic() {
    this.setData({
      isPlay: false
    })
    innerAudioContext.pause() // 暂停
  },
  stopMusic() {
    innerAudioContext.stop() // 停止
  },
  // 进度条
  getSliderValue() {
    let s = 0
    const sTime = setInterval(() => {
      s = s + 1
      this.setData({
        musicS: s
      })
      this.getPlayingSite(s)
      if(s>=this.data.musicLength) clearInterval(sTime)

    }, 1000)
  },
  //当前播放位置
  getPlayingSite(s) {
    let ss = Math.floor(s % 60);
    let mm = Math.floor(s / 60 % 60);
    if (ss < 10) ss = '0' + ss
    if (mm < 10) mm = '0' + mm
    this.setData({
      musicTime: mm + ":" + ss
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        musicId: data.data
      })
    })
    this.getMusicDetail()
    this.playMusic()
    this.getlrc()
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
    this.stopMusic()
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