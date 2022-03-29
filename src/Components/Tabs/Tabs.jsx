import { useState } from "react"
import './Tabs.css'
import { useAllVideos } from "../../index"

function Tabs()
{
    const { toggleTab, setToggleTab } = useAllVideos()

    function toggleTabHandler(index)
    {
        setToggleTab(toggleTab=>index)
    }

    return (
        <div className="tabs">  
            <button 
                onClick={()=>toggleTabHandler("all")} 
                className={toggleTab==="all" ? "tab-buttons active-tab" : "tab-buttons"}>
                    All
            </button>
            <button 
                onClick={()=>toggleTabHandler("anime")} 
                className={toggleTab==="anime" ? "tab-buttons active-tab" : "tab-buttons"}>
                    Anime
            </button>
            <button 
                onClick={()=>toggleTabHandler("thriller")} 
                className={toggleTab==="thriller" ? "tab-buttons active-tab" : "tab-buttons"}>
                    Thriller
            </button>
            <button 
                onClick={()=>toggleTabHandler("crime")} 
                className={toggleTab==="crime" ? "tab-buttons active-tab" : "tab-buttons"}>
                    Crime
            </button>
            <button 
                onClick={()=>toggleTabHandler("superhero")} 
                className={toggleTab==="superhero" ? "tab-buttons active-tab" : "tab-buttons"}>
                    Super Hero
            </button>
            <button 
                onClick={()=>toggleTabHandler("medievalFantasy")} 
                className={toggleTab==="medievalFantasy" ? "tab-buttons active-tab" : "tab-buttons"}>
                    Medieval Fantasy
            </button>
        </div>
    )
}

export { Tabs }