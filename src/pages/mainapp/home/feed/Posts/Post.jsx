import React, { useState, useEffect, useContext ,useRef } from 'react'
import { GrLike } from 'react-icons/gr'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import togglepagecontext from '../../../../../context/pagestoggle/togglepagecontext'
import Comment from './Comment'
import sound from '../../../../../audio/likesound.mp3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function  Post(props) {
    const audioref = useRef(null);
    const content_page = useContext(togglepagecontext)
    const { pmppage, changepage, setprofileid , addNotification } = content_page
    const { post } = props;
    let myid = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'))._id;
    let myname = JSON.parse(localStorage.getItem('sclmdia_73sub67_details')).name;
    const [numlikes, setnumLikes] = useState(0)
    const [liked, setliked] = useState(post.likes.includes(myid) ? true : false)
    const [uploadedBy, setUpoadedBy] = useState({})
    const [commenttext, setCommentText] = useState({ comment: "" })
    const likepost = async () => {
        // console.log(myid)
        console.log(post.likes)
        if (liked === true) {
            // alert('already liked ')
            // console.log(" already liked")
            // todo : dislike functionality

        }
        else {
            let statusdata = await fetch(`${process.env.REACT_APP_API_KEY}post/likepost/${post._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem('sclmdia_73sub67_token')
                }
            })
            statusdata = await statusdata.json();
            if (statusdata.flag === true) {
                audioref.current.play();
                let data = {
                    type:`${myname} liked your post`,
                    receiver:uploadedBy._id,
                    post:post._id,
                }
                try {
                    addNotification(data);
                    
                } catch (error) {
                    console.log(error)
                    console.log("Can't send notification , error occured")
                }
                setliked(true);
                // toast("Liked")
                setnumLikes(numlikes + 1)

            }
            else {
                alert(statusdata.message)
            }
            // alert("liked")
        }

        //     const statusdata = await fetch(`http://localhost:5000/api/post/likepost/${post._id}`)
    }

    const commentonPost = async () => {
        if (commenttext.comment !== "") {
            let resp = await fetch(`${process.env.REACT_APP_API_KEY}post/comment/${post._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem('sclmdia_73sub67_token')
                }
                ,
                body: JSON.stringify(commenttext)


            })

            resp = await resp.json();
            if (resp.flag === true) {
                let data = {
                    type:`${myname} Commented your post`,
                    receiver:uploadedBy._id,
                    post:post._id,
                }
                try {
                    addNotification(data);
                    
                } catch (error) {
                    console.log(error)
                    console.log("Can't send notification , error occured")
                }
                console.log("Comment Added")
                audioref.current.play();
                setCommentText({comment:""})
                toast("Comment Posted")


            }
            else {
                console.log("Error error occured")
            }

        }
        else {

            alert("Please Enter a comment")
        }

    }


    useEffect(() => {
        myid = localStorage.getItem('sclmdia_73sub67_details')

        // console.log(myid)

        const fetch_data = async () => {
            const userdata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${post.uploadedBy}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const userdata = await userdata_raw.json();
            setUpoadedBy(userdata.user)
            // console.log(mydata.posts)



        }
        fetch_data()
        setnumLikes(post.likes.length);
    }, [])
    const style = { color: "#38ef7d", fontSize: "1.5em", "margin": "0px 3px" }
    const style2 = { color: "grey", fontSize: "1.5em", "margin": "0px 3px" }
    // const btn = () => [
    //     console.log(numlikes)
    // ]

    const ooc = (id) => {
        setprofileid(id)
        changepage(2)

    }
    return (
        <div>

            <audio ref={audioref} src={sound}></audio>
            <div className='post'>
                <div className="postbyinfo">
                    <img onClick={() => ooc(uploadedBy._id)} src={uploadedBy?.profilepic !== null ? uploadedBy?.profilepic : "https://res.cloudinary.com/dbnqqpobe/image/upload/v1683888315/removal.ai__5c5595dd-bcec-47ef-9403-c6e5317ac359_uiregk.png"} alt="image" />
                    <div className="nameanddate">
                        <p>{uploadedBy?.name}</p>
                        <small className="timeline">
                            {moment(post?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </small>

                    </div>

                </div>
                <hr className='posthr' />
                <div className="content">
                    {
                        <div className="container">
                            {
                                post?.content ? <p dangerouslySetInnerHTML={{ __html: post?.content?.replace(/\n/g, "<br/>") }} /> : ""
                            }
                            

                        </div>

                    }

                    {
                        <div className="conimage">
                            {
                                post?.media ? <img src={post.media} alt="image" /> : ""

                            }



                        </div>}


                </div>
                {/* <hr className='posthr' /> */}
                <div className="landcmts">
                    <p> {numlikes} Likes</p>
                    <p>{post.comments?.length} Comments</p>
                    <p> </p>

                </div>
                <hr className='posthr' />
                <div className="postbuttons">
                    <button onClick={() => likepost()} ><FontAwesomeIcon icon={faThumbsUp} style={liked === true ? style : style2} />{liked == true ? "Liked" : "like"}</button>
                    <button data-bs-toggle="modal" data-bs-target={`#post${post._id}`}> <FontAwesomeIcon icon={faCommentDots} style={style2} />Comment</button>
                    <button> <FontAwesomeIcon icon={faShare} style={style2} /> Save</button>

                </div>
                {/* <!-- Modal --> */}

            </div>
            <div class="modal fade" id={`post${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fs-5 text-center" id="exampleModalLabel">Comments</h5>

                        </div>
                        <div class="modal-body cmtmdl">
                            {
                                post.comments?.map((data) => {
                                    return <Comment key={data.comment} cmt={data} />
                                })
                            }
                        </div>
                        <div class="modal-footer">

                            <div className="inputandbutton">
                                <input type="text" name="comment" id="" placeholder='Write Your Comment' value={commenttext.comment} onChange={(e) => { setCommentText({ comment: e.target.value }) }} />
                                <button onClick={commentonPost}>Send</button>
                            </div>

                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
            
        </div>
    )
}

export default Post