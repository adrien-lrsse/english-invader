import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import '../static/style/topicCreate.css';


function EditTopic() {
    const { topicId } = useParams();
    const [topicDetails, setTopicDetails] = useState({
        title: "",
        description: "",
        words: [{ word_en: "", word_fr: "" }]
    }); 

    useEffect(() => {
        const fetchTopicDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/';
                    return;
                }
        
                const headers = {
                    authorization: token
                };
                
                if (!topicId) {
                    return;
                }
        
                const topicResponse = await axios.get(`/api/topics/topicdetail/${topicId}`, { headers });
        
                const wordsResponse = await axios.get(`/api/words/${topicId}`, { headers });
        
                setTopicDetails({
                    title: topicResponse.data.title,
                    description: topicResponse.data.description,
                    words: wordsResponse.data
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchTopicDetails();

    }, [topicId]);

    const addWord = () => {
        setTopicDetails(prevState => ({
            ...prevState,
            words: [...prevState.words, { word_en: "", word_fr: "" }]
        }));
    }; 

    const removeWord = (indexToRemove) => {
        setTopicDetails(prevState => ({
            ...prevState,
            words: prevState.words.filter((word, index) => index !== indexToRemove)
        }));
    };

    const saveTopic = () => {
        const title = topicDetails.title;
        const description = topicDetails.description;
    
        if (!title || !description) {
            toast.error('Please fill in all fields');
            return;
        }
    
        updateTopic(title, description, topicId, topicDetails.words);

    };

    const updateTopic = (title, description, idTopic, words) => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }

        const headers = {
            authorization: token
        };
        
        const data = {
            title: title,
            description: description,
            idTopic: idTopic,
            words: words
        };

        try {
            axios.post('/api/words/update', data, { headers })
            .then(() => {
                toast.success('Topic updated successfully');
            })
        }

        catch (error) {
            console.error(error);
        }
    }
    

    return (
        <div className="createTopic">
            <Navbar />
            <div className="centering_horizontal centering_vertical vertical">
                <h1 className="topic_title">edit topic</h1>
                <div className="centering_horizontal centering_vertical vertical">
                <div className="horizontal centering_vertical">
                    <input
                        id="topic"
                        className="input_answer"
                        placeholder="Topic"
                        value={topicDetails.title}
                        onChange={(e) => setTopicDetails({ ...topicDetails, title: e.target.value })}
                    />
                    <input
                        id="description"
                        className="input_answer"
                        placeholder="Description"
                        value={topicDetails.description}
                        onChange={(e) => setTopicDetails({ ...topicDetails, description: e.target.value })}
                    />
                    </div>
                    <button onClick={saveTopic} id="save" className="add_word">save</button>
                </div>
                <p className="line"></p>

                <div id="definition_section">
                <h2>write your topic words</h2>
                    {topicDetails.words.map((word, index) => (
                        <div key={index} className="sectionDef">
                            <input
                                className="inputAnswer"
                                placeholder="Word"
                                value={word.word_en || ""} // Assurez-vous qu'il est toujours défini ou définissez-le à une chaîne vide
                                onChange={(e) => {
                                    const updatedWords = [...topicDetails.words];
                                    updatedWords[index] = { ...updatedWords[index], word_en: e.target.value };
                                    setTopicDetails({ ...topicDetails, words: updatedWords });
                                }}
                            />
                            <input
                                className="inputAnswer"
                                placeholder="Definition"
                                value={word.word_fr || ""} // Assurez-vous qu'il est toujours défini ou définissez-le à une chaîne vide
                                onChange={(e) => {
                                    const updatedWords = [...topicDetails.words];
                                    updatedWords[index] = { ...updatedWords[index], word_fr: e.target.value };
                                    setTopicDetails({ ...topicDetails, words: updatedWords });
                                }}
                            />
                            <button onClick={() => removeWord(index)} className="add_word">
                                delete
                            </button>
                        </div>
                    ))}
                </div>
                <button className="add_word" onClick={addWord}>add a word</button>
            </div>
            <Toaster />
        </div>
    )
}

export default EditTopic;
