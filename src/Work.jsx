/* eslint-disable react/prop-types */
const Work = ({ work: { title, start, deleted }, deleteHandler, removeHandler }) => {
    const text = `I start ${title} at ${start}.`;
    console.log(title);

    return (
        <div style={{ textAlign: "center", margin: "10px" }}>
            {deleted ? <del>{text}</del> : <span>{text}</span>}
            <button
                style={{ cursor: "pointer", marginLeft: "8px" }}
                onClick={deleteHandler}
            >
                delete
            </button>
            <button
                style={{ cursor: "pointer", marginLeft: "8px" }}
                onClick={removeHandler}
            >
                remove
            </button>
        </div>
    );
};

export default Work;
