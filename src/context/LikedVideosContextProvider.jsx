import { useReducer, createContext, useContext } from "react"

const LikedVideosContext = createContext()

const updateLikedVideosFunc = (state,{type,payload}) => {
    switch(type)
    {
        case "UPDATE_LIKED_VIDEOS_LIST" : 
            {
                return [...payload]
            }
        default :
            {
                return [...state]
            }
    }
}

const LikedVideosContextProvider = ({children}) => {
    const [ likedVideosList, dispatchLikedVideosList ] = useReducer(updateLikedVideosFunc,[])

    return (
        <LikedVideosContext.Provider value={{ likedVideosList, dispatchLikedVideosList}}>
            {children}
        </LikedVideosContext.Provider>
    )
}

const useLikedVideos = () => useContext(LikedVideosContext)

export { LikedVideosContextProvider, useLikedVideos }