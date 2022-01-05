import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";


const FriendsTab = ({currentUsername}) => {
    console.log(currentUsername);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true)
    const getAllFriends = async ()=> {
       const response = await APIQuery.get("/pages/friends/" + currentUsername, {
        headers: {
            Authorization: "Bearer " +localStorage.getItem("token"),
        },
        }). then((response)=>response.data);
        setFriends(response);
        setLoading(false)
    }
    console.log(friends)
    useEffect(()=>{
       getAllFriends();
    }, []);
        useEffect(() => {
        }, [friends]);


                            

    return (
      <>
        {!loading
          ?
          friends.map((friend) => {
              return (
                <>
                  <h3>Friend:</h3>
                  <h2>{friend.username}</h2>
                  <h2>{friend.email}</h2>
                </>
              );
            })
          : ""}
      </>
    );
}

export default FriendsTab;