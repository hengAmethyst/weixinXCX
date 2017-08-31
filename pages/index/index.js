//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //菜品种类的预算滚动高度
    catesScrollTop:[],
    //rpx和px的换算
    toPx:0,
    nowId:'',
    left:'',
    scrollTop:0,
    num:0,
    _num:1,
    headerName:'晶汉点餐',
    footerName:'购物车',
    catesList:['推荐','热菜','冷菜','汤','小吃','烧烤','饮料','水果','套餐','主食'],
    goodsList: [{ name: '青椒肉丝', price: '10', id: '1', count: 0 }, { name: '青椒肉丝', price: '10', id: '2', count: 0 }, { name: '红烧牛肉', price: '35', id: '3', count: 0 }, { name: '番茄炒蛋', price: '10', id: '4', count: 0}]
  },
  onLoad: function () {
      var that = this
      wx.getSystemInfo({
          success:function(res){
              that.setData({
                  toPx:res.screenWidth/750,
                //   计算预算滚动高度
                  catesScrollTop:function(){
                      let temp = [0]
                      for(let i=1;i<that.data.catesList.length;i++){
                      temp.push(
                        temp[i-1] + 60*that.data.toPx + 200*that.data.toPx*that.data.goodsList.length
                      )}
                      return temp 
                  }
              })
          }
      })
  },
//点击左边菜单栏
  menuClick: function (e) {
      this.setData({
          _num: e.target.dataset.num,
          nowId: e.target.id
      })
  }
  //   计算滚动高度
  ,
  scrollRight: function(e){
      this.setData({
          scrollTop: e.detail.scrollTop
      })
    //   对比滚动高度
      for (let i = 0; i < this.data.catesScrollTop().length;i++){
          if (Math.abs(this.data.catesScrollTop()[i] - this.data.scrollTop)<20){
              this.setData({
                  leftId: 'name'+i,
                  _num: i
              })
              
          }
      }
  },
//   加减菜品
    addFood:function(e){           
        let tempId = e.target.id
        for(let i=1;i<this.data.goodsList.length+1;i++){
            let tempFoodsId = 'food' + i
            if(tempId == tempFoodsId){
                this.data.goodsList[i-1].count = this.data.goodsList[i-1].count + 1
                let temp = this.data.goodsList
                this.setData({
                    goodsList: temp
                    })
            }
        }
    },
    deFood:function(e) {
        let tempId = e.target.id
        for(let i=1;i<this.data.goodsList.length+1;i++){
            let tempFoodsId = 'food' + i
            if(tempId == tempFoodsId){
                this.data.goodsList[i-1].count = this.data.goodsList[i-1].count - 1
                let temp = this.data.goodsList
                this.setData({
                    goodsList: temp
                    })
            }
        }
    },
//   点击跳转到affirm页面
    toAffirm:() => {
        wx.navigateTo({
            url: '../affirm/affirm'
        })
    }
})
