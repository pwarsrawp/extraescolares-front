
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LogoutButton from "../components/Logout";
import DeleteButton from "../components/Delete";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>{user.fullname}</h2>
      <p>{user.email}</p>
      <p>{user.memberNumber}</p>
      <Link to="/editProfile">
        Editar
      </Link>
      <div>
        <LogoutButton />
        <DeleteButton />
      </div>
    </div>
  )
};

export default Profile;
