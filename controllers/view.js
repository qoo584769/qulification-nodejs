const userModel = require('../models/user')
const viewModel = require('../models/view')

const getView = async (req, res) => {
  const getRes = await viewModel.find()

  return res.status(200).json({
    message: '資料庫景點取得成功',
    getRes,
  })
}
const createView = async (req, res) => {
  const { title, body, pictureUrl } = req.body
  const viewData = {
    title,
    body,
    pictureUrl,
    userId: req.user._id,
  }

  const createRes = await viewModel.create(viewData)

  if (!createRes) {
    return res.status(400).json({
      message: '資料庫景點新增失敗',
    })
  }

  return res.status(200).json({
    message: '資料庫景點新增成功',
    createRes,
  })
}
const updateView = async (req, res) => {
  const { title, body, pictureUrl } = req.body
  const viewId = req.params.viewId
  const updateDate = {
    title,
    body,
    pictureUrl,
  }
  const updateRes = await viewModel.findByIdAndUpdate(viewId, updateDate, {
    new: true,
  })

  if (!updateRes) {
    return res.status(400).json({
      message: '資料庫更新景點失敗',
    })
  }
  return res.status(200).json({
    message: '資料庫更新景點成功',
    updateRes,
  })
}
const deleteView = async (req, res) => {
  const viewId = req.params.viewId
  const deleteRes = await viewModel.findByIdAndDelete(viewId)
  if (!deleteRes) {
    return res.status(400).json({
      message: '欲刪除的資料不存在資料庫',
    })
  }
  return res.status(200).json({
    message: '刪除成功',
    deleteRes,
  })
}

const updateLike = async (req, res) => {
  const { title, body, pictureUrl } = req.body
  const userId = req.user._id
  const viewId = req.params.viewId
  const userRes = await userModel.findOne({ 'likes.viewId': { $in: [viewId] } })
  if (!userRes) {
    const result = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          likes: {
            viewId: viewId,
            title: title,
            body: body,
            pictureUrl: pictureUrl,
          },
        },
      },
      { new: true }
    )
    return res.status(200).json({
      message: '加入收藏成功',
      result,
    })
  } else {
    const result = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { likes: { viewId: viewId } },
      },
      { new: true }
    )
    return res.status(200).json({
      message: '移除收藏成功',
      result,
    })
  }
}

module.exports = { getView, createView, updateView, deleteView, updateLike }
