import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";
  
function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    
        return promise;
    }

    function updateList(person) { 
        postUser(person)
        .then((res) => {
            if(res.status === 201) {
                return res.json(); 
            } else {
                throw new Error('Failed to fetch users');
            }   
        })
        .then((personWithID) => setCharacters([...characters, personWithID]))
        .catch((error) => {
            console.log(error);
        })
    }

    /*
    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
    }
   

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
    }
     */

    function deleteCharacter(id) {
        // Send DELETE request to backend to delete user with specified id
        console.log("DELETE");
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        })
        .then((res) => {
            if (res.status === 200) {
                // If successful, remove character from state
                setCharacters(characters.filter(character => character.id !== id));
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
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
                removeCharacter={deleteCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
        
    );
}



export default MyApp;