import React, { useState } from "react";
import togglepagecontext from "./togglepagecontext";


const Togglepagestate = (props) => {
    const [pmppage , setpmppage] = useState(1);
    const [profileid , setprofile]= useState("")
    const setprofileid = (id)=>{
        setprofile(id)
    }
    const changepage = (num)=>{
        setpmppage(num);
        console.log(pmppage)
    }



    return (

        <togglepagecontext.Provider value={{  changepage , pmppage , setprofileid , profileid  }}>
            {props.children}                   
        </togglepagecontext.Provider>
    )

}

export default Togglepagestate;