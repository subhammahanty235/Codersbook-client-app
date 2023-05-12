import React , {useState , useEffect , useContext} from 'react'
import Loading from '../../../../../components/noposts/Loading';
import Post from './Post'
import './posts.css'
function Posts(props) {
  // const {setprofileid ,pmppage} = props
    const [loading , setloading] = useState(false);
    const [myPosts, setmyPosts] = useState();
    // const [myinfo, setmyInfo] = useState();
    // const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

    useEffect(() => {
        const fetch_data = async () => {
          setloading(true)
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}post/allposts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem('sclmdia_73sub67_token')
                }
            }
            )
            
            const mydata = await mydata_raw.json();
            // console.log(mydata.posts)
            setmyPosts(mydata)
            setloading(false)
            

        }
        fetch_data();
        

    }, [])

  return (
    loading === false ?
    <div>
      
        <div className="postbox">
            {
              myPosts?.map((post)=>{
                // console.log(post)
                return <Post post={post} key={post._id} />
              })
            }
            
        </div>
        
    </div>
  : <Loading/>
  )
}

export default Posts