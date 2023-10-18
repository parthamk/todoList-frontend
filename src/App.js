import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks,setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  }, []);

  const addTask = () => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input })
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setInput('');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='App'>
      <h1>Todo-list</h1>
      <div>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="result">
        {tasks && tasks.map((task, index) => <p key={index}>{task}</p>)}
      </div>
    </div>
  );
}

export default App;