import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import GetData from "../utils/common";
import Avatar from "@mui/material/Avatar";
import invalidImage from "../assets/invalidImage.svg";

function UserDetail() {
  const location = useLocation();
  const [details, setDetails] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("userName", location.state?.data);
    const userName = localStorage.getItem("userName");
    GetData(`https://api.github.com/users/${userName}`, "GET")
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (details?.name) {
      const com = details?.name.split(" ");
      setIsInvalid(false);
      setFirstName(com[0]);
      setLastName(com[1]);
    } else {
      setIsInvalid(true);
    }
  }, [details]);
  return (
    <div>
      {!isInvalid && <h1 className="heading">GitHub Users Detail</h1>}
      {details && !isLoding && !isInvalid && (
        <>
          <Avatar
            alt={"avatar image"}
            sx={{ width: "150px", height: "150px", margin: "auto" }}
            src={details.avatar_url}
          />
          <div className="detail-body">
            <div className="d-flex">
              <div className="content-head">First Name </div>
              <div className="bw-class">:</div>
              <div className="content-body">{firstName}</div>
            </div>
            <div className="d-flex">
              <div className="content-head">Last Name </div>
              <div className="bw-class">:</div>
              <div className="content-body">{lastName}</div>
            </div>
            <div className="d-flex">
              <div className="content-head"> Company </div>
              <div className="bw-class">:</div>
              <div className="content-body">
                {details.company ? details.company : "NA"}
              </div>
            </div>
            <div className="d-flex">
              <div className="content-head"> Location </div>
              <div className="bw-class">:</div>
              <div className="content-body">
                {details.location ? details.location : "NA"}
              </div>
            </div>
          </div>
        </>
      )}
      {isInvalid && !isLoding && (
        <div className="invalid-container">
          <img
            alt="Invalid-image"
            className="invalid-image"
            src={invalidImage}
          />
          <h3 className="invalid-text">Invalid User!!</h3>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
