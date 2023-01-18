import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Post from '../Posts/Post'
import '../Posts/posts.css'
import Brar  from '../../../../../images/Animaker-bear-unscreen.gif'
import NoPosts from '../../../../../components/noposts/NoPosts'
// import Post from '../Posts/Post'
function Myposts() {
    const [myPosts, setmyPosts] = useState();
    
    const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

    useEffect(() => {
        const fetch_data = async () => {
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${mydetails._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
    
            const mydata = await mydata_raw.json();
            // console.log(mydata.posts)
            setmyPosts(mydata.posts)
           
            // console.log(myPosts);
            // console.log(myinfo);

        }
        fetch_data();
        
        
    }, [])


    return (
        <div>

            <div className="postbox">
                {/* <h2 className="text-center text-primary">My Posts</h2> */}
                {/* <button onClick={()=>{console.log(myPosts)}}>Click</button> */}
                {
                   myPosts?.length === 0?<NoPosts/> :
                   myPosts?.map((post)=>{
                        // console.log(post)
                        return <Post post={post} key={post._id}/>
                    })
                }

                


            </div>

        </div >

    )
}

export default Myposts