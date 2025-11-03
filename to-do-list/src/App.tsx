import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

type ToDo = {
    id: string;
    text: string;
    status: boolean;
}

const defaultList: ToDo[] = [
    {
        id: '1',
        text: 'Learn React.js',
        status: false,
    },
    {
        id: '2',
        text: 'Learn Typescript',
        status: false,
    },
    {
        id: '3',
        text: 'Learn Next.js',
        status: false,
    },
    {
        id: '4',
        text: 'Learn Tailwind CSS',
        status: false,
    },
];

function App() {
    return (
        <>
            <div id="effect"></div>
            <div className="card">
                <div className="title">
                    <p>To Do List With React.js</p>
                </div>
                <div className="to-do-card">
                    <LocalList />
                </div>
            </div>
            <div id="add-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="#fdfdfd" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" />
                </svg>
            </div>
        </>
    );
}

function LocalList() {
    const [list, setList] = useState<ToDo[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('list');
        if (saved) {
            setList(JSON.parse(saved));
        } else {
            localStorage.setItem('list', JSON.stringify(defaultList));
            setList(defaultList);
        }
    }, []);

    const handleToggle = (id: string) => {
        const updated = list.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
        setList(updated);
        localStorage.setItem('list', JSON.stringify(updated));
    };

    const deleteEl = (id: string) => {
        const updated = list.filter(item => item.id !== id);
        setList(updated);
    }

    return (
        <>
            {list.map((item) => (
                <div
                    key={item.id}
                    className={`el ${item.status ? 'active' : ''}`}
                    data-todo-id={item.id}
                >
                    <div id="delete-el" onClick={() => { deleteEl(item.id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                            <path fill="none" stroke="#fdfdfd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5" />
                        </svg>
                    </div>
                    <div className="el-output">
                        <div className="to-do-name">
                            <p>{item.text}</p>
                        </div>
                        <ToDoCheckbox
                            id={item.id}
                            checked={item.status}
                            onToggle={handleToggle}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

function ToDoCheckbox({
    id,
    checked,
    onToggle,
}: {
    id: string;
    checked: boolean;
    onToggle: (id: string) => void;
}) {
    return (
        <div
            className={`to-do-checker ${checked ? 'active' : ''}`}
            onClick={() => onToggle(id)}
        ></div>
    );
}

export default App;
