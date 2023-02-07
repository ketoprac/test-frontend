import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("jwt", res.data.token);
      console.log(res.data);
      navigate("/")
    } catch (err) {
      console.error(err.response.data);
      Swal.fire("Error", err.response.data, "error");
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate("/");
    }
    
  }, []);

  return (
    <Layout>
      <div>
        <form
          onSubmit={handleLogin}
          className="border h-72 w-72 flex flex-col justify-center gap-2 p-5 bg-gray-50 rounded shadow"
        >
          <label className="text-gray-700">Username</label>
          <input
            className="p-1 rounded-sm border"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label className="text-gray-700">Password</label>
          <input
            className="p-1 rounded-sm border"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className="bg-teal-700 text-white font-semibold p-1 rounded-sm hover:bg-teal-800"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginCard;
