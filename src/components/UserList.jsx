import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        const data = await res.data;
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsersData();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          User List
        </h1>
        <button className="border bg-teal-700 text-white rounded hover:bg-teal-800 p-1 mb-2">
          Add User
        </button>
        <div className="flex flex-col gap-2">
          {users.map((item, index) => (
            <div
              className="flex flex-col gap-1 border p-2 bg-gray-50"
              key={index}
            >
              <p>
                Name: {item.name.firstname} {item.name.lastname}
              </p>
              <p>Email: {item.email}</p>
              <button className="border bg-teal-700 text-white rounded hover:bg-teal-800">
                See detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
