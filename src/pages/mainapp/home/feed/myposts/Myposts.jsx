import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Post from '../Posts/Post'
import '../Posts/posts.css'
import Brar from '../../../../../images/Animaker-bear-unscreen.gif'
import NoPosts from '../../../../../components/noposts/NoPosts'
import Loading from '../../../../../components/noposts/Loading'
// import Post from '../Posts/Post'
function Myposts() {
    const [myPosts, setmyPosts] = useState();
    const [loading, setloading] = useState(false);
    const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

    useEffect(() => {
        const fetch_data = async () => {
            setloading(true)
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${mydetails._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const mydata = await mydata_raw.json();
            // console.log(mydata.posts)
            setmyPosts(mydata.posts)
            setloading(false)

            // console.log(myPosts);
            // console.log(myinfo);

        }
        fetch_data();


    }, [])


    return (


        loading === false ?
            <div>
                <div className="postbox">
                    {/* <h2 className="text-center text-primary">My Posts</h2> */}
                    {/* <button onClick={()=>{console.log(myPosts)}}>Click</button> */}
                    {
                        myPosts?.length === 0 ? <NoPosts /> :
                            myPosts?.map((post) => {
                                // console.log(post)
                                return <Post post={post} key={post._id} />
                            })
                    }




                </div>
            </div >
            : <Loading />





    )
}

export default Myposts