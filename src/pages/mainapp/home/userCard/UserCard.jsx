import React, { useEffect ,useState,useContext } from 'react'
import './usercard.css'
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
function UserCard(props) {
    const content_page = useContext(togglepagecontext)
    const {changepage, setprofileid } = content_page

    const { id } = props
    const [myinfo, setmyInfo] = useState();

    useEffect(() => {
        // console.log(id)

        const fetch_data = async () => {
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const mydata = await mydata_raw.json();
            
            setmyInfo(mydata.user)
        }
        fetch_data();

    }, [])
    const ooc = (id) => {
        setprofileid(id)
        changepage(2)

    }
    return (
        <div className='usercardmain'>
            <img onClick={()=>{ooc(myinfo?._id)}} src={myinfo?.profilepic !== null ? myinfo?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" />

            {/* <img src={"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" /> */}

            <h3>{myinfo?.name}</h3>

        </div>
    )
}

export default UserCard