import React from "react";
import { useState } from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";

function CreateTopic(){

    const [index, setIndex] = useState(0);
    const [definitions, setDefinitions] = useState([]);


    const definition_section = ({ key, onDelete }) => (
        <div key={key}>
            <input id={`word_${key}`} className="input_answer" placeholder="word" />
            <input id={`definition_${key}`} className="input_answer" placeholder="definition" />
            <button onClick={() => onDelete(key)} className="deleteButton">
                <span className="deleteButtonSpan">CONFIRM DELETE</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>

        </div>
    );

    const deleteDefinition = (keyToDelete) => {
        setDefinitions(prevDefinitions => {
            return prevDefinitions.filter(definition => definition.key !== String(keyToDelete));
        });
    }


    const addDefinition = () => {
        setDefinitions([...definitions, definition_section({ key: index, onDelete: deleteDefinition })]);
        setIndex(index + 1);
        console.log(index);
    }


    const saveTopic = () => {
        // Récupération des données concernant la table TOPICS
        const title = document.getElementById("topic").value;
        const description = document.getElementById("description").value;
    
        // Vérification sur les données (peut-être pas nécessaire ici, surtout car c'est côté client donc contournable, mais c'est une bonne pratique)
        // TODO : Des vérifiacations sont peut-être à ajouter
        if (!title || !description) {
            console.error('Title and description are required');
            return;
        }

        // Création de l'objet que l'on va envoyer à l'API
        const topicData = {
            title: title,
            description: description
        };

        // Envoi des données à l'API
        fetch('/api/topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topicData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save topic');
            }
            return response.json();
        })
        .then(data => {
            // Récupération des données concernant la table WORDS
            const topicId = data.id;
            const words = [];
            for (let definition of definitions) {
                const current = definition.key;
                const word = document.getElementById(`word_${current}`).value;
                const definition = document.getElementById(`definition_${current}`).value;
                
                // Vérification sur les données et mise en forme
                // TODO : Des vérifiacations sont peut-être à ajouter
                if (word && definition) {
                    words.push({ wordEn: word, wordFr: definition, idTopic: topicId });
                }
            }

            // Envoi des données à l'API
            fetch('/api/words', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wordsDefinitions)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save words');
                }
                console.log('Words saved successfully');
            })
            .catch(error => {
                console.error('Error saving words:', error);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
  
    return (
        <div className="createTopic">
            <Navbar />
            <div className="centering_horizontal centering_vertical vertical">
                <h1>Create a new topic</h1>
                <div className="horizontal centering_vertical">
                    <input id="topic" className="input_answer" placeholder="topic" />
                    <input id="description" className="input_answer" placeholder="description" />
                    <button onClick={saveTopic} id="save" className="saveButton">
                        <span>SAVE</span>
                    </button>
                </div>
                
                {/* <input id="description" className="input_answer" placeholder="description" /> */}
                
                <div id="definition_section">
                <div className="horizontal">
                    <h2 style={{'marginLeft' : '1em', 'width' : '480px'}}>Word</h2>
                    <h2 style={{'marginLeft' : '3em', 'width' : '480px'}}>Definition</h2>
                </div>
                    {definitions.map((definition) => {
                        return definition;
                    })}
                </div>
                <button id="createTopic" className="button" onClick={addDefinition}>Add a word</button>
            </div>
        </div>
    )
}

export default CreateTopic;