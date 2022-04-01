import { useReducer, createContext, useContext } from "react"

const WatchLaterContext = createContext()

const updateWatchLaterFunc = (state,action) => {
    switch(action.type)
    {
        case "UPDATE_WATCH_LATER_LIST" : 
            {
                return [...action.payload]
            }
        default :
            {
                return [...state]
            }
    }
}

const WatchLaterContextProvider = ({children}) => {
    const [ watchLaterList, dispatchWatchLaterList ] = useReducer(updateWatchLaterFunc,[])

    return (
        <WatchLaterContext.Provider value={{watchLaterList, dispatchWatchLaterList}}>
            {children}
        </WatchLaterContext.Provider>
    )
}

const useWatchLater = () => useContext(WatchLaterContext)

export { WatchLaterContextProvider, useWatchLater }