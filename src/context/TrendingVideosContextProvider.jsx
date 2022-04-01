import { useState, useContext, createContext, useEffect} from 'react'
import axios from 'axios'

const TrendingVideosContext = createContext()

let TrendingVideosProvider = ({children}) => 
{
    const [ trendingVideosList, setTrendingVideosList ] = useState([])

    useEffect(() => {
        try {
          (async () => {
              const trendingVideosData = await axios.get('https://videoztron.herokuapp.com/api/home/trendingvideos')
              setTrendingVideosList([...trendingVideosData.data.trendingvideos])
          }) ()
        }
        catch(error) {
          console.log("Error : ", error)
        }
      },[])

    return (
        <TrendingVideosContext.Provider value={{
            trendingVideosList, 
            setTrendingVideosList
        }}>
            {children}
        </TrendingVideosContext.Provider>
    )
}

let useTrendingVideos = () => useContext(TrendingVideosContext)

export { TrendingVideosProvider, useTrendingVideos }