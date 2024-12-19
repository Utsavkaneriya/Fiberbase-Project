import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          contact: contact,
          city: city,
          gender: gender,
          hobbies: hobbies,
          timestamp: new Date(),
        });
      }
      console.log(user);
      console.log("user regised successfully");
      toast.success("user regised successfully", {
        position: "top-center",
      });
      setEmail("");
      setPassword("");
      setFname("");
      setLname("");
      setContact("");
      setCity("");
      setGender("");
      setHobbies([]);
      setHobbyInput("");
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error("Error registering user: " + error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleAddHobby = () => {
    if (hobbyInput.trim()) {
      const cleanedHobby = hobbyInput
        .split(",") // Split by commas
        .map((hobbyItem) => hobbyItem.trim())
        .filter((hobbyItem) => hobbyItem);

      setHobbies([...hobbies, ...cleanedHobby]);
      setHobbyInput("");
    }
  };
  
  const handleRemoveHobby = (index) => {
    const updated = hobbies.filter((_, i) => i !== index);
    setHobbies(updated);
  };

  return (
    <form onSubmit={handleRegister}>
      <h3 style={{ marginTop: "45px" }}>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Contact</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Gender</label>
        <select
          className="form-control"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Hobbies</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter a hobby"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddHobby}
          >
            Add
          </button>
        </div>
        <ul className="list-group mt-2">
          {hobbies.map((hobby, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              {hobby}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveHobby(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;