import React from 'react';
import logo from './logo.svg';

function App() {
    return (
        <div className="App">
            <div className="title">
                <p>To Do List With React.js</p>
            </div>
            <div className="to-do-card">
                <div className="el" to-do-id="1">
                    <div className="to-do-name">
                        <p>Learn React.js</p>
                    </div>
                    <ToDoCheckbox id="1" />
                </div>
                <div className="el" to-do-id="2">
                    <div className="to-do-name">
                        <p>Learn Typescript</p>
                    </div>
                    <ToDoCheckbox id="2" />
                </div>
                <div className="el" to-do-id="3">
                    <div className="to-do-name">
                        <p>Learn Next.js</p>
                    </div>
                    <ToDoCheckbox id="3" />
                </div>
                <div className="el" to-do-id="4">
                    <div className="to-do-name">
                        <p>Learn Tailwind CSS</p>
                    </div>
                    <ToDoCheckbox id="4" />
                </div>
            </div>
        </div>
    );

}

function ToDoCheckbox({ id }: { id: string }) {
    function toDo() {
        const el = document.querySelector(`[to-do-id="${id}"]`);
        el?.classList.toggle('active');
    }

    return (
        <div className="to-do-checker" onClick={toDo}></div>
    );
}

export default App;
