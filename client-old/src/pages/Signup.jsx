import axios from "axios";
import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import Inputbox from "../components/Inputbox";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/paytm/v1/user/signup",
        {
          username: email,
          password,
          firstName,
          lastName,
        }
      );
      localStorage.setItem("token", response.token);
      console.log(response.token);
    } catch (error) {
      console.log("Error signing up", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-sm text-white">
        <Heading label={"Sign Up"} />
        <Subheading label={"Enter your information to create an account"} />
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Inputbox
              label={"First Name"}
              placeholder={"First Name"}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Inputbox
              label={"Last Name"}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Inputbox
              label={"Email"}
              placeholder={"example@gmail.com"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Inputbox
              label={"Password"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button label={"Sign Up"} />
        </form>
        <Subheading label={"Already have an account ?"}>
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </Subheading>
      </div>
    </div>
  );
};

export default Signup;
