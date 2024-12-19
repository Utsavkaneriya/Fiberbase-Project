import { toast } from "react-toastify";
import { auth, db } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";

const ProFile = () => {
  const [userDeatils, setuserDeatils] = useState(null);
  const fetchUserDeatils = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          //   console.log(user);
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setuserDeatils(userSnap.data());
            // console.log(userSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch user details", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchUserDeatils();
  }, []);
  console.log(userDeatils);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      toast.success("User logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error("Failed to logout", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
      console.error(error);
    }
  }
  return (
    <>
      {userDeatils ? (
        <>
          <h1>Profile</h1>
          <p>First Name: {userDeatils.firstName}</p>
          <p>Last Name: {userDeatils.lastName}</p>
          <p>Email: {userDeatils.email}</p>
          <p>Contact: {userDeatils.contact}</p>
          <p>City: {userDeatils.city}</p>
          <p>Gender: {userDeatils.gender}</p>
          <p>Hobbies: {userDeatils.hobbies.join(", ")}</p>
          <p>Timestamp: {userDeatils.timestamp.toDate().toLocaleString()}</p>

          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProFile;