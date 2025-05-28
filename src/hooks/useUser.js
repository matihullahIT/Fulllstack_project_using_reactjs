import { useState } from "react";

const useUser = (initialUser) => {
  const [user, setUser] = useState(initialUser);
  const updateUser = (newUser) => setUser(newUser);
  return [user, updateUser];
};

export default useUser;

// // Example usage:
// import React from "react";

// export function UserProfile() {
//   const [user, updateUser] = useUser({ name: "Alice", age: 25 });

//   const changeName = () => {
//     updateUser({ ...user, name: "Bob" });
//   };

//   return (
//     <div>
//       <p>Name: {user.name}</p>
//       <p>Age: {user.age}</p>
//       <button onClick={changeName}>Change Name</button>
//     </div>
//   );
// }
