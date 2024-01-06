/* eslint-disable react/prop-types */
import { useState } from "react";
import Work from "./Work";

const Works = () => {
    const [showWorks, setShowWorks] = useState(false);
    const [works, setWorks] = useState([
        {
            id: 0,
            title: "Programming",
            start: "8:30 am",
            deleted: false,
        },
        {
            id: 1,
            title: "Gamming",
            start: "1:30 pm",
            deleted: false,
        },
    ]);

    const [ids, setIds] = useState([0, 1]);
    const [removedIds, setremovedIds] = useState([]);

    const [newWork, setNewWork] = useState({
        title: "",
        start: "",
    });
    const { title, start } = newWork;

    const addHandler = () => {
        let idsCopy = [...ids];
        let removedIdsCopy = [...removedIds];
        let newId;
        if (removedIdsCopy.length) {
            newId = removedIdsCopy.shift();
            setremovedIds(removedIdsCopy);
            idsCopy.push(newId);
            idsCopy.sort();
        } else {
            newId = idsCopy[idsCopy.length - 1] + 1;
            idsCopy.push(newId);
        }
        const work = {
            id: newId,
            title: title,
            start: start,
            deleted: false,
        };
        setWorks(works => [...works, work]);
        setNewWork({ title: "", start: "" });
        setIds(idsCopy);
    };

    const deleteHandler = id => {
        setWorks(works =>
            works.map(work =>
                work.id === id ? { ...work, deleted: !work.deleted } : work
            )
        );
    };

    const removeHandler = id => {
        let idsCopy = [...ids];
        let removedIdsCopy = [...removedIds];
        setWorks(works => works.filter(work => work.id !== id));
        idsCopy.splice(idsCopy.indexOf(id), 1);
        removedIdsCopy.push(id);
        removedIdsCopy.sort();
        setIds(idsCopy);
        setremovedIds(removedIdsCopy);
    };

    const newWorkHandler = event => {
        const name = event.target.name;
        const newValue = event.target.value;

        setNewWork(newWork => ({ ...newWork, [name]: newValue }));
    };

    return (
        <div>
            <button
                onClick={() => setShowWorks(showWorks => !showWorks)}
                style={{
                    cursor: "pointer",
                    color: "black",
                    backgroundColor: showWorks ? "darkcyan" : "aquamarine",
                    margin: "20px",
                }}
            >
                Show Works
            </button>
            {showWorks && (
                <>
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            onChange={newWorkHandler}
                            value={title}
                        />

                        <br />

                        <input
                            type="text"
                            name="start"
                            placeholder="start"
                            onChange={newWorkHandler}
                            value={start}
                            style={{ marginTop: "2px" }}
                        />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <button
                            onClick={addHandler}
                            style={{ cursor: "pointer", color: "black" }}
                        >
                            add work
                        </button>
                    </div>
                    {works.map(work => (
                        <Work
                            key={work.id}
                            work={work}
                            deleteHandler={() => deleteHandler(work.id)}
                            removeHandler={() => removeHandler(work.id)}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Works;
