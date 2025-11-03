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
        <div className="App">
            <div className="title">
                <p>To Do List With React.js</p>
            </div>
            <div className="to-do-card">
                <LocalList />
            </div>
        </div>
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

    return (
        <>
            {list.map((item) => (
                <div
                    key={item.id}
                    className={`el ${item.status ? 'active' : ''}`}
                    data-todo-id={item.id}
                >
                    <div className="to-do-name">
                        <p>{item.text}</p>
                    </div>
                    <ToDoCheckbox
                        id={item.id}
                        checked={item.status}
                        onToggle={handleToggle}
                    />
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
