import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

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
                console.log(topicResponse.data);
        
                const wordsResponse = await axios.get(`/api/words/${topicId}`, { headers });
                console.log(wordsResponse.data);
        
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
    
        const headers = {
            authorization: localStorage.getItem('token')
        };
    
        deleteTopic(topicId, headers)
            .then(() => {
                createNewTopic({ title, description }, topicDetails.words, headers);
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to update topic');
            });
    };
    

    const createNewTopic = (topicData, words, headers) => {
        axios.post('/api/topics', topicData, { headers })
        .then(response => {
            const topicId = response.data.idTopic;
            
            const wordsWithTopicId = words.map(word => ({ ...word, idTopic: topicId }));
        
            axios.post('/api/words', wordsWithTopicId, { headers })
            .then(response => {
                console.log(response.data);
                toast.success('Topic and words saved successfully');
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to save words');
            });
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to save topic');
        });
    };    

    const deleteTopic = (topicId, headers) => {
        return axios.delete(`/api/topics/topicdetail/${topicId}`, { headers })
        .catch(error => {
            console.error(error);
            toast.error('Failed to delete existing topic');
            throw error;
        });
    };

    return (
        <div className="createTopic">
            <Navbar />
            <div className="centering_horizontal centering_vertical vertical">
                <h1>Edit topic</h1>
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
                    <button onClick={saveTopic} id="save" className="saveButton">
                        <span>SAVE</span>
                    </button>
                </div>
                
                <div id="definition_section">
                    <div className="horizontal">
                        <h2 style={{ marginLeft: '1em', width: '480px' }}>Word</h2>
                        <h2 style={{ marginLeft: '3em', width: '480px' }}>Definition</h2>
                    </div>
                    {topicDetails.words.map((word, index) => (
                        console.log('Word:', word),
                        <div key={index} className="word_definition">
                            <input
                                className="input_answer"
                                placeholder="Word"
                                value={word.word_en || ""} // Assurez-vous qu'il est toujours défini ou définissez-le à une chaîne vide
                                onChange={(e) => {
                                    const updatedWords = [...topicDetails.words];
                                    updatedWords[index] = { ...updatedWords[index], word_en: e.target.value };
                                    setTopicDetails({ ...topicDetails, words: updatedWords });
                                }}
                            />
                            <input
                                className="input_answer"
                                placeholder="Definition"
                                value={word.word_fr || ""} // Assurez-vous qu'il est toujours défini ou définissez-le à une chaîne vide
                                onChange={(e) => {
                                    const updatedWords = [...topicDetails.words];
                                    updatedWords[index] = { ...updatedWords[index], word_fr: e.target.value };
                                    setTopicDetails({ ...topicDetails, words: updatedWords });
                                }}
                            />
                            <button onClick={() => removeWord(index)} className="deleteButton">
                                <span className="deleteButtonSpan">CONFIRM DELETE</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button className="button" onClick={addWord}>Add Word</button>
            </div>
            <Toaster />
        </div>
    )
}

export default EditTopic;
