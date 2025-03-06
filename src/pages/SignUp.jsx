import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [profile_image, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const sendData = async (event) => {
    event.preventDefault();

    let user_name =
      first_name && last_name ? `${first_name}.${last_name}`.toLowerCase() : "";
    if (!user_name && email) {
      user_name = email.split("@")[0];
    }

    if (!user_name.trim()) {
      alert("Username is required but not generated properly!");
      return;
    }

    console.log("Sending data:", {
      user_name,
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      profile_image,
    });

    const data = new FormData();
    data.append("user_name", user_name);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);
    if (profile_image) {
      data.append("profile_image", profile_image);
    }

    try {
      const response = await fetch("https://vica.website/api/register", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const res = await response.json();
      console.log("SignUp Response:", res);

      if (response.ok && res.data && res.data.token) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/login");
      } else {
        alert(res.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="auth">
        <div className="text">
          <h1>Sign Up</h1>
          <p>Create an account to continue</p>
        </div>
        <form onSubmit={sendData}>
          <div className="sec1">
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="sec2">
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation">Confirm</label>
              <input
                type="password"
                id="password_confirmation"
                placeholder="********"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            </div>
          </div>
          <div>
            <label>Profile Image</label>
            <label className="profile-image">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img src="/assets/img/Upload icon.svg" alt="Upload icon" />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
