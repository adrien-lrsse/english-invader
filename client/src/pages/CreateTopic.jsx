import React from "react";
import { useState } from "react";
import '../static/style/main.css';
import Navbar from "../components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import '../static/style/topicCreate.css';

function CreateTopic(){

    const [index, setIndex] = useState(0);
    const [definitions, setDefinitions] = useState([]);


    const definition_section = ({ key, onDelete }) => (
        <div key={key} className="sectionDef">
            <input id={`word_${key}`} className="inputAnswer" placeholder="word" />
            <input id={`definition_${key}`} className="inputAnswer" placeholder="definition" />
            <button onClick={() => onDelete(key)} className="add_word">delete</button>
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
    }

    const saveTopic = () => {
        // Récupération des données concernant la table TOPICS
        const title = document.getElementById("topic").value;
        const description = document.getElementById("description").value;

        // Vérification sur les données (peut-être pas nécessaire ici, surtout car c'est côté client donc contournable, mais c'est une bonne pratique)
        // TODO : Des vérifiacations sont peut-être à ajouter
        if (!title || !description) {
            toast.error('Please fill in all fields');
            return;
        }

        const headers = {
            authorization: localStorage.getItem('token')
        };

        // Création de l'objet que l'on va envoyer à l'API
        const topicData = {
            title: title,
            description: description
        };

        axios.post('/api/topics', topicData, { headers })
        .then(response => {
            const topicId = response.data.idTopic;
            const words = [];
            for (let def of definitions) {
                const current = def.key;
                const word = document.getElementById(`word_${current}`).value;
                const definition = document.getElementById(`definition_${current}`).value;

                // Vérification sur les données et mise en forme
                // TODO : Des vérifiacations sont peut-être à ajouter
                if (word && definition) {
                    words.push({ word_en: word, word_fr: definition, idTopic: topicId });
                }
            }
            axios.post('/api/words', words, { headers })
            .then(response => {
                toast.success('Topic and words saved successfully');
            }
            )
            .catch(error => {
                console.error(error);
                toast.error('Failed to save words');
            }
            );
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to save topic');
        }
        );
    }

  
    return (
        <div className="createTopic">
            <Navbar />
            <div className="centering_horizontal centering_vertical vertical">
                <h1 className="topic_title">create a new topic</h1>
                <div className="horizontal centering_vertical">
                    <input id="topic" className="input_answer" placeholder="topic title" />
                    <input id="description" className="input_answer" placeholder="topic description" />
                </div>
                <button onClick={saveTopic} id="save" className="add_word">save</button>
                <p className="line"></p>                
                <div id="definition_section">
                    
                        <h2>write your topic words</h2>
                    {definitions.map((definition) => {
                        return definition;
                    })}
                </div>
                <button id="createTopic" className="add_word" onClick={addDefinition}>add a word</button>
            </div>
            <Toaster />
        </div>
    )
}

export default CreateTopic;