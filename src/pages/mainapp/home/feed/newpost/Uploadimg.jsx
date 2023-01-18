import React from 'react'
import { useState } from 'react'

function Uploadimg() {
    const [image, setImage] = useState("")
    const submitimg = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "utk7tsdj");
        data.append("cloud_name", "dbnqqpobe");
        fetch("https://api.cloudinary.com/v1_1/dbnqqpobe/image/upload",{
            method:"POST",
            body:data,
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div>
                <div>
                    <input type="file" name="" id="" onChange={(e) => setImage(e.target.files[0])} />
                    <button onClick={submitimg}>Upload</button>
                </div>
            </div>
        </>
    )
}

export default Uploadimg