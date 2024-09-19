import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, isActive, setActiveImageId} = props
  const {id, thumbnailUrl, thumbnailAltText} = imageDetails

  const thumbnailClassName = isActive ? 'thumbnail active' : 'thumbnail'

  const onClickThumbnail = () => {
    setActiveImageId(id)
  }

  return (
    <li className="thumbnail-item">
      <button
        type="button"
        className="thumbnail-btn"
        onClick={onClickThumbnail}
      >
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          className={`thumbnail-img-size ${thumbnailClassName}`}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
