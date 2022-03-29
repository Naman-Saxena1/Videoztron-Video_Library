import './VideoCard.css'
import sherlock from "../../Assets/images/sherlock1.webp"
import {
    MdAccessTime
} from "react-icons/md"

function VideoCard({ video })
{
    const {
        title,
        thumbnail,
        views
    } = video

    let videoViews;

    if(views>1000000)
    {
        videoViews = (views/1000000).toFixed(1) + "M"
    }
    else
    {
        if(views>1000)
        {
            videoViews = (views/1000).toFixed(1) + "K"
        }
        else
        {
            videoViews = views + ""
        }
    }

    return (
        <div className='video-card'>
            <img className="video-card-thumbnail-img" src={thumbnail} alt={`video-alternate-text`}></img>
            <h3 className="video-card-title">{title}</h3>
            <h5>{videoViews} views | 9 hours ago</h5>
            <div className="card-button">
                <button className="card-icon-btn add-to-wishlist-btn outline-card-secondary-btn">
                    <MdAccessTime style={{fontSize: "20px"}}/>
                </button>
            </div>
        </div>
    )
}

export { VideoCard }