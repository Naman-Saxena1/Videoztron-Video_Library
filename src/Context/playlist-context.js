import { useState, createContext, useContext } from "react"

const PlaylistContext = createContext()

const PlaylistContextProvider = ({children}) => {
    const [ allPlaylists, setAllPlaylists ] = useState([])

    return (
        <PlaylistContext.Provider value={{ allPlaylists, setAllPlaylists }}>
            {children}
        </PlaylistContext.Provider>
    )
}

const usePlaylist = () => useContext(PlaylistContext)

export { PlaylistContextProvider, usePlaylist }