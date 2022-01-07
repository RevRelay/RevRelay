import { useEffect, useState } from "react";
import APIQuery from "../../API/APIQuery";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";

const FriendsTab = ({currentUsername}) => {
  let history = createBrowserHistory()
    console.log(currentUsername);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
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
  

        const goToFriendsPage = (id) => {
          console.log('going to'+id);
          navigate(`/user/${id}`);
          history.go();
          setLoading(true)
          }
                            

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
                  <ListItemButton onClick={() => goToFriendsPage(friend.userID)}>
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