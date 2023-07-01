import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function UserDetails(props) {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

   useEffect(() => {
    fetch("http://localhost:8080/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        if (data.data.userType === "Admin") {
          setAdmin(true);
          props.toggleadmin()
        }

        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        }
      });
  },
   [props]);

  return admin ? <AdminDashboard /> : <UserDashboard userData={userData} />;
}