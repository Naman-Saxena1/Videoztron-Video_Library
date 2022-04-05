import { useState, createContext, useContext } from "react"

const HistoryContext = createContext()

const HistoryContextProvider = ({children}) => {
    const [userHistoryList, setUserHistoryList ] = useState([])

    return (
        <HistoryContext.Provider value={{userHistoryList, setUserHistoryList}}>
            {children}
        </HistoryContext.Provider>
    )
}

const useHistory = () => useContext(HistoryContext)

export { useHistory, HistoryContextProvider }