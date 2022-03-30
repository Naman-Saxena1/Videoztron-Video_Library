import "./RecommendationCard.css"
import {
    AiOutlineCheckCircle
} from "react-icons/ai"
import { Link } from "react-router-dom"

function RecommendationCard({ video })
{
    const {
        _id,
        thumbnail,
        title,
        owner,
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
        <Link to={`/video/${_id}`} state={{videoDetails:video}}>
            <div className='recommendation-item'>
                <img className="recommendation-thumbnail" src={thumbnail} alt={title}/>
                <div className="recommendation-item-details">
                    <h4 className="recommendation-item-title">{title}</h4>
                    <h5>
                        {owner} 
                        <AiOutlineCheckCircle className="owner-verified-icon"/>
                    </h5>
                    <h5>{videoViews} &#183; 9 hours ago</h5>
                </div>
            </div>
        </Link>
    )
}

export { RecommendationCard }