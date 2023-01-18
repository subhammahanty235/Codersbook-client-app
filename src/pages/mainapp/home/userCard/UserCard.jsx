import React, { useEffect ,useState } from 'react'
import './usercard.css'
function UserCard(props) {
    const { id } = props
    const [myinfo, setmyInfo] = useState();

    useEffect(() => {
        // console.log(id)

        const fetch_data = async () => {
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${id}`, {
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

    return (
        <div className='usercardmain'>
            <img src={myinfo?.profilepic !== null ? myinfo?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" />

            {/* <img src={"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" /> */}

            <h3>{myinfo?.name}</h3>

        </div>
    )
}

export default UserCard