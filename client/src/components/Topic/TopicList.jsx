import './topicList.css';

const TopicList = (props) => {
    const topics = props.topics;
    return ( 
        <div className="topicList">
            { topics.map((topic) => (
                    <div className="topic-preview" key={topic.id}>
                        <h2>{topic.title}</h2>
                        <h3>{topic.description}</h3>
                        <div className='button-preview'>
                            <button onClick={() => window.location.href = "/game"} className="button">
                                <span>Play</span>
                            </button>
                            <button onClick={() => window.location.href = "/topic"} className="button">
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
            ))}
        </div>
     );
}
 
export default TopicList;