$(function () {
  var app = new Vue({
    el: '#app',
    data: {
      inputValue: '',
      songList: [],
      commentList: [],
      songUrl: '',
      imgurl: '',
      flag: false,
      isplay: false,
      mvUrl: '',
      maskflag: false
    },
    methods: {
      searchMusic: function () {
        var that = this;
        // console.log(this.inputValue);
        // 获取歌曲列表
        axios.get('https://autumnfish.cn/search', { params: { keywords: that.inputValue } }).then(function (response) {
          // console.log(response);
          that.songList = response.data.result.songs;
          // console.log(that.songList);
        }, function (error) {
          console.log(error);
        });
        this.inputValue = '';
      },
      clickMusic: function (songid) {
        this.flag = true;
        var that = this;
        // 获取歌曲地址
        axios.get('https://autumnfish.cn/song/url?id=' + songid)
          .then(function (response) {
            // console.log(response.data.data[0].url);
            that.songUrl = response.data.data[0].url;
          }, function (error) {
            console.log(error);
          });
        // 获取歌曲详情
        axios.get('https://autumnfish.cn/song/detail?ids=' + songid).then(function (response) {
          console.log(response);
          that.imgurl = response.data.songs[0].al.picUrl
        }, function (error) {
          console.log(error);
        });
        // 获取歌曲评论
        axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + songid).then(function (response) {
          console.log(response.data.hotComments);
          that.commentList = response.data.hotComments;
        }, function (error) {
          console.log(error);
        });
      },
      // 监听音乐播放
      play: function () {
        console.log('播放中');
        this.isplay = true
      },
      // 监听音乐暂停
      pause: function () {
        console.log('暂停了');
        this.isplay = false
      },
      // 获取mv
      clickmv: function (mvid) {
        this.maskflag = true;
        var that = this;
        axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(function (response) {
          // console.log(response);
          that.mvUrl = response.data.data.url;
        }, function (error) {
          console.log(error);
        })
      },
      clickmask: function () {
        this.maskflag = false;
        this.$refs.vedio.pause();
      }
    }
  })
})