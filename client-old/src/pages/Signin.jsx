import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      const response = await axios.post(
        "http://localhost:3001/paytm/v1/user/signin",
        { username: email, password: password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("sigin successful");
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-sm text-white">
        <Heading label={"Sign In"} />
        <Subheading label={"Enter your information to login"} />
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <Inputbox
              label={"Email"}
              placeholder={"example@gmail.com"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Inputbox
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button label={"Submit"} />
        </form>
        <Subheading label={"Don't have an account ?"}>
          <a href="/signin" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </Subheading>
      </div>
    </div>
  );
};

export default Signin;

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Heading from "../components/Heading";
// import Subheading from "../components/Subheading";
// import Inputbox from "../components/Inputbox";
// import Button from "../components/Button";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // Error handling state
//   const navigate = useNavigate();

//   const handleSignin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/paytm/v1/user/signin",
//         { username: email, password: password }
//       );
//       console.log(response);
//       const token = response.data.token;
//       localStorage.setItem("token", token); // Fixed token assignment
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Sign-in error:", error);
//       setError("Invalid email or password. Please try again."); // Show user-friendly error message
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
//       <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-sm text-white">
//         <Heading label={"Sign In"} />
//         <Subheading label={"Enter your information to login"} />
//         {error && <p className="text-red-400 mb-4">{error}</p>}{" "}
//         {/* Error message */}
//         <form>
//           <div className="mb-4">
//             <Inputbox
//               label={"Email"}
//               placeholder={"example@gmail.com"}
//               onChange={(e) => setEmail(e.target.value)}
//               value={email} // Controlled input
//             />
//           </div>
//           <div className="mb-6">
//             <Inputbox
//               label={"Password"}
//               placeholder={"Password"}
//               type="password" // Secure password input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password} // Controlled input
//             />
//           </div>
//           <Button
//             label={"Submit"}
//             type="submit"
//             onClick={async () => {
//               const response = await axios.post(
//                 "http://localhost:3000/paytm/v1/user/signin",
//                 {
//                   username: email,
//                   password: password,
//                 }
//               );
//               localStorage.setItem("token", response.data.token);
//               navigate("/dashboard");
//             }}
//           />{" "}
//           {/* Added type="submit" */}
//         </form>
//         <Subheading label={"Don't have an account?"}>
//           <a href="/signup" className="text-blue-400 hover:underline">
//             Sign Up
//           </a>
//         </Subheading>
//       </div>
//     </div>
//   );
// };

// export default Signin;
