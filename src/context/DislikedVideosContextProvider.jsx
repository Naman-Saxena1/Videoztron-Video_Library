import { useReducer, createContext, useContext } from "react"

const DislikedVideosContext = createContext()

const updateDislikedVideosFunc = (state,action) => {
    switch(action.type)
    {
        case "UPDATE_DISLIKED_VIDEOS_LIST" : 
            {
                return [...action.payload]
            }
        default :
            {
                return [...state]
            }
    }
}

const DislikedVideosContextProvider = ({children}) => {
    const [ dislikedVideosList, dispatchDislikedVideosList ] = useReducer(updateDislikedVideosFunc,[])

    return (
        <DislikedVideosContext.Provider value={{ dislikedVideosList, dispatchDislikedVideosList}}>
            {children}
        </DislikedVideosContext.Provider>
    )
}

const useDislikedVideos = () => useContext(DislikedVideosContext)

export { DislikedVideosContextProvider, useDislikedVideos }