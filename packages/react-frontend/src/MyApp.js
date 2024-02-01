// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function updateList(person) {
      postUser(person)
        .then((response) => {
          if (response.status === 201) {
            console.log("User added successfully! Status code:", response.status);
            // Only attempt to parse JSON if the status is 201
            return response.json();
          } else {
            console.log("Failed to add user. Status code:", response.status);
            // Don't attempt to parse JSON if the status is not 201
            throw new Error("Failed to add user");
          }
        })
        .then((addedUser) => {
          console.log("Generated ID:", addedUser.id);
          // Only update characters if JSON parsing is successful
          setCharacters([...characters, addedUser]);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function removeOneCharacter(id, index) {
      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            console.log("User deleted successfully! Status code:", response.status);
          } 
          else if (response.status === 404) {
            console.log("User not found. Status code:", response.status);
            throw new Error("User not found");
          } 
          else {
            console.log("Failed to delete user. Status code:", response.status);
            throw new Error("Failed to delete user");
          }
        })
        .then((deletedUser) => {
          // Wait for the DELETE request to be successful on the backend before updating the frontend
          const updatedCharacters = characters.filter((_, i) => i !== index);
          setCharacters(updatedCharacters);
          console.log("Deleted User:", deletedUser);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }   
    
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );

    
}


export default MyApp;