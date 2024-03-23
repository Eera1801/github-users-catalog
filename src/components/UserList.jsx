import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import GetData from "../utils/common";
import pageNotFound from "../assets/pageNotFound.svg";

function UserList() {
  const [userData, setUserData] = useState(null);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    GetData("https://api.github.com/users", "GET")
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {userData && !isLoding && <h1 className="heading">GitHub Users List</h1>}
      <div className="row">
        {userData
          ? userData?.map((data) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 260,
                  bgcolor: "background.paper",
                  margin: "1rem",
                  borderRadius: "5px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
                key={data.id}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={"avatar image"} src={data.avatar_url} />
                  </ListItemAvatar>
                  <div>
                    <ListItemText
                      sx={{ textTransform: "capitalize" }}
                      primary={data.login}
                    />
                    <Link
                      className="link"
                      to={"/user-detail"}
                      state={{ data: data.login }}
                    >
                      See Details
                    </Link>
                  </div>
                </ListItem>
              </List>
            ))
          : !isLoding && (
              <div className="invalid-container">
                <img
                  alt="Invalid-image"
                  className="invalid-image"
                  src={pageNotFound}
                />
                <h3 className="invalid-text">API Failure</h3>
              </div>
            )}
      </div>
    </>
  );
}

export default UserList;
