import React from 'react'
import './postnew.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
function Postnew(props) {
    const { userdata } = props;
    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const upload = async () => {
        let data_to_upload = {};
        if (image !== "" || text !== "") {
            if (image !== "") {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "utk7tsdj");
                data.append("cloud_name", "dbnqqpobe");
                await fetch(process.env.REACT_APP_CLOUDINARY_API, {
                    method: "POST",
                    body: data,
                }).then((res) => res.json())
                    .then((data) => {
                        // console.log(data.url)
                        // data_to_upload.push({"image":data.url})
                        data_to_upload.media = data.url
                    }).catch((err) => {
                        console.log(err)
                    })
            }
            if (text !== "") {
                data_to_upload.content = text
            }

            let data = await fetch(`${process.env.REACT_APP_API_KEY}post/addpost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem('sclmdia_73sub67_token')
                },
                body:JSON.stringify(data_to_upload)
            })
            data =await data.json();
            console.log(data)
            // console.log(data_to_upload.image)
            // console.log(JSON.stringify(data_to_upload))
        }
        else {
            alert("Can't be empty")
        }




    }
    const style2 = { color: "#1ba94c", fontSize: "1.5em", "margin": "0px 3px" }
    return (
        <div className='newpostarea'>
            <div className="container my-2" >
                <div className="dpandinput">
                    <img src={userdata.user?.profilepic !== null ? userdata?.user?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" />
                    <input type="text" className="postinput" placeholder="Share , What's happening in your life" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                </div>
                <hr className="posthr mt-2" />
                <div className="photoandvideo">
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal"><FontAwesomeIcon icon={faImages} style={style2} />Photo</button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal"> <FontAwesomeIcon icon={faVideoCamera} style={style2} />Video</button>
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <textarea className="form-control textarea shadow-none" placeholder="Leave a comment here" name='text' value={text} id="floatingTextarea" onChange={(e) => { setText(e.target.value) }}></textarea>
                                <label htmlFor="floatingTextarea">Express what's in your heart</label>
                            </div>

                            <div className="mb-3 mt-2">
                                <label htmlFor="formFile" className="form-label">Choose a File</label>
                                <input className="form-control" type="file" id="formFile" onChange={(e) => { setImage(e.target.files[0]) }} />
                            </div>
                        </div>
                        <div className="modal-footer postnewfooter">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={upload}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Postnew