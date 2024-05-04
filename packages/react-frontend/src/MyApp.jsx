import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";
  
function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    // POST User
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
        .then((personWithID) => {
            setCharacters([...characters, personWithID])
            console.log(personWithID);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // DELETE User
    function deleteCharacter(id) {
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        })
        .then((res) => {
            if (res.status === 204) {
                setCharacters(characters.filter(character => character._id !== id));
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // FETCH Users
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