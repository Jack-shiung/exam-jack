import { useState, FC } from 'react'
import cx from 'classnames'

enum ActionMap {
  none = 0,
  liked = 1,
  disLiked = 2
}

const LikeDisLike: FC<{
  initLike?: number
  initDisLike?: number
}> = ({ initLike = 100, initDisLike = 25 }) => {
  const [action, setAction] = useState<ActionMap>(ActionMap.none)

  const likedStatus = action === ActionMap.liked
  const likeCountShow = (likedStatus ? 1 : 0) + initLike

  const disLikeStatus = action === ActionMap.disLiked
  const disLikeCountShow =(disLikeStatus ? 1 : 0) + initDisLike

  return (
    <>
      <button className={cx('like-button', likedStatus && 'liked')} onClick={setAction.bind(null, likedStatus ? ActionMap.none : ActionMap.liked)}>
        like | <span className='likes-counter' >{likeCountShow}</span>  
      </button>
      <button className={cx('dislike-button', disLikeStatus && 'disliked')} onClick={setAction.bind(null, disLikeStatus ? ActionMap.none : ActionMap.disLiked)}>
        dislike | <span className='dislikes-counter' >{disLikeCountShow}</span>  
      </button>
    </>
  )
}

export default LikeDisLike