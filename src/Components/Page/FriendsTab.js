import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";

const FriendsTab = ({currentUsername}) => {
    console.log(currentUsername);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
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
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
            <ListItemText primary="Friends" />
          </ListItemIcon>
        </ListItemButton>
        {loading ? <>
            <h3>Loading...</h3>      
             </>
        : ''}
        {!loading
          ? friends.map((friend) => {
              return (
                <>
                  <ListItemButton>
                    <ListItemText primary={friend.username} />
                    <ListItemText primary={friend.email} />
                  </ListItemButton>
                </>
              );
            })
          : ""}
      </>
    );
}

export default FriendsTab;