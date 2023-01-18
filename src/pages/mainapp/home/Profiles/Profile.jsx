import React, { useState, useEffect ,useContext } from 'react'
import NoPosts from '../../../../components/noposts/NoPosts';
import Post from '../feed/Posts/Post';
import './profile.css'
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
// import Tempimage from '../../../../images/tempimage.png'
function Profile(props) {
    const { id } = props;
    const context_page = useContext(togglepagecontext);
    const {profileid , changepage} = context_page
    const [myPosts, setmyPosts] = useState();
    const [myinfo, setmyInfo] = useState();

    const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

    useEffect(() => {
        // console.log(id)
        const fetch_data = async () => {
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${profileid}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const mydata = await mydata_raw.json();
            setmyPosts(mydata.posts)
            setmyInfo(mydata.user)
        }
        fetch_data();


    }, [])


    return (



        <div className="mainbox">
            <div className="innermainbox">
                <div className="name-dp-id">
                    <img className='dp987' src={myinfo?.profilepic !== null ? myinfo?.profilepic : "https://th.bing.com/th/id/OIP.D-1rllcf24AeFq9hvmSHSQHaHa?w=183&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="image" />
                    {/* <img className="dp987" src="data:image/jpeg;base64,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" alt="" /> */}
                    <div className="name-id">
                        <h3 className="pname">{myinfo?.name}</h3>
                        <h5 className="pid">@subham_292</h5>
                    </div>
                </div>
                <div className="follow-unfollow-buttons">
                    <div className='follow-editprofile'>
                        {
                            mydetails?._id === myinfo?._id ? <button data-bs-toggle="modal" data-bs-target="#editprofilemodal" onClick={()=>{changepage(5)}}>Edit Profile</button> : (myinfo?.following.includes(mydetails?._id) ? <button>Follow Back</button> : <button>Follow</button>)
                        }
                        {/* <button>Follow</button> */}

                    </div>
                    <div className='profiledetails'>
                        <button>Followers <span>{myinfo?.followers?.length}</span></button>
                        <button>Followings <span>{myinfo?.following?.length}</span></button>
                        <button>Posts <span>{myinfo?.totalposts}</span></button>
                    </div>

                </div>
                <hr className="posthr" />
                <div className="bio">
                    {/* <h4>Bio:</h4> */}
                    <p dangerouslySetInnerHTML={{ __html: myinfo?.bio?.replace(/\n/g, "<br/>") }} />
                    {/* {myinfo?.bio} */}
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tempora quae illo officiis autem maxime? Ratione, placeat. Architecto, maxime. Quia, repellendus similique eos perferendis quas facere suscipit ex eveniet sunt nostrum illo saepe culpa fugit? Minima labore sapiente ipsa nemo? Ullam suscipit nemo odit non officia alias excepturi consectetur reprehenderit quas laborum nostrum distinctio quos nam rerum velit sit quidem maiores, illum nisi facilis voluptatibus saepe? Commodi earum, ullam maiores similique cum ipsam quos omnis nostrum officiis tempora non excepturi voluptatem illum! Incidunt blanditiis, sit aliquid ipsum dicta commodi, recusandae velit quisquam vel quis fugit rem, sunt distinctio amet! Unde. */}
                </div>
                {/* <hr className="posthr" /> */}
                <div className="posts">
                    <div className="container">
                        {
                            myPosts?.length === 0 ? < NoPosts /> :
                                myPosts?.map((post) => {
                                    // console.log(post)
                                    return <Post post={post} key={post._id} />

                                })
                        }

                    </div>
                </div>
            </div>

           {/*  */}
           

            {/* // edit profile or create profile modal  */}
            {/* <div class="modal fade" id="editprofilemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen-md-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Followings</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container profile">
                                <div class="row gutters">
                                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="account-settings">
                                                    <div class="user-profile">
                                                        <div class="user-avatar">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                                        </div>
                                                        <h5 class="user-name">Yuki Hayashi</h5>
                                                        <h6 class="user-email">yuki@Maxwell.com</h6>
                                                    </div>
                                                    <div class="about">
                                                        <h5>About</h5>
                                                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="row gutters">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 class="mb-2 text-primary">Personal Details</h6>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="fullName">Full Name</label>
                                                            <input type="text" class="form-control" id="fullName" placeholder="Enter full name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="eMail">Email</label>
                                                            <input type="email" class="form-control" id="eMail" placeholder="Enter email ID" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="phone">Phone</label>
                                                            <input type="text" class="form-control" id="phone" placeholder="Enter phone number" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="website">Website URL</label>
                                                            <input type="url" class="form-control" id="website" placeholder="Website url" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row gutters">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="Street">Street</label>
                                                            <input type="name" class="form-control" id="Street" placeholder="Enter Street" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="ciTy">City</label>
                                                            <input type="name" class="form-control" id="ciTy" placeholder="Enter City" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="sTate">State</label>
                                                            <input type="text" class="form-control" id="sTate" placeholder="Enter State" />
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div class="form-group">
                                                            <label for="zIp">Zip Code</label>
                                                            <input type="text" class="form-control" id="zIp" placeholder="Zip Code" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row gutters">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="text-right">
                                                            <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                                                            <button type="button" id="submit" name="submit" class="btn btn-primary">Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                       
                    </div>
                </div>
            </div> */}

        </div>



    )
}

export default Profile