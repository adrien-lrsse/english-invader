import './topicList.css';

const TopicList = ({topics}) =>{
    return ( 
        <div className="topicList">
            { topics.map((topic) => (
                <div className="topic-preview" key={topic.idTopic}>
                    <h2>{topic.title}</h2>
                    <h3>{topic.description}</h3>
                    <div className='button-preview'>
                        <button onClick={() => window.location.href = ("game/"+topic.idTopic)} className="button">
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