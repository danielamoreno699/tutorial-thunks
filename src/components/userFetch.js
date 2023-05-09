import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { fetchUser } from "../redux/user/userSlice";




const UserFetch = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUser());
    }, [dispatch]);
  
    const { users, isLoading, error } = useSelector((store) => store.user);
    const [loading, setLoading] = useState(isLoading);
    const [hasError, setError] = useState(!!error);
  
    useEffect(() => {
      setLoading(isLoading);
      setError(!!error);
    }, [isLoading, error]);
  
    if (loading === true) {
      return <p>Loading</p>;
    }
  
    if (hasError === true) {
      return <p>Error: {error}</p>;
    }

  return (
    <div className="users">
      {users.map((user) => (
        <ul className="user-ul" key={user.login.uuid}>
          <li>{user.name.first}</li>
          <li>{user.name.last}</li>
        </ul>
      ))}
    </div>
  );
};

export default UserFetch;