import Mock from 'mockjs'

export const ratings = Mock.mock({
  "status": 200,
  "message": "ok",
  "data|1-10": [
    {
      "username": "3******c",
      "rateTime": 1469281964000,
      "deliveryTime": 30,
      "score": 5,
      "rateType": 0,
      "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
      "recommend|2-5": [
        "南瓜粥",
        "皮蛋瘦肉粥",
        "扁豆焖面",
        "娃娃菜炖豆腐",
        "牛肉馅饼"
      ]
    }
  ]
})