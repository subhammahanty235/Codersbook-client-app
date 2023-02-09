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

    const addNotification = async(no_data)=>{
        try {
           
            if(no_data.receiver !== localStorage.getItem('sclmdia_73sub67_details')._id ){
                let data = await fetch(`${process.env.REACT_APP_API_KEY}notification/newnotification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": localStorage.getItem('sclmdia_73sub67_token')
                    },
                    body:JSON.stringify(no_data)
                })
                data = await data.json();
                if(!data){
                    alert("Some technical error occured")
                }
            }
            else{

            }
            
        } catch (error) {
            alert("Error Occured")
        }
        

    }



    return (

        <togglepagecontext.Provider value={{  changepage , pmppage , setprofileid , profileid ,addNotification }}>
            {props.children}                   
        </togglepagecontext.Provider>
    )

}

export default Togglepagestate;