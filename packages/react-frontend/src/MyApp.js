// src/MyApp.js
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
    const [characters, setCharacters] = useState([
        {
          name: "Charlie",
          job: "Janitor" // the rest of the data
        }
      ]);

      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
        </div>
      );

function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
}

export default MyApp;