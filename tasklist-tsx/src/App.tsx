import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task } from './model';

// React.FC means it is a function component.
const App:React.FC = () =>  {

  const [task, setTask] = useState<string>("")
  const [allTasks, setAllTasks] = useState<Task[]>([])

  /* e.preventDefault is to make sure we do not refresh the page
    on Change. To find the type of events or any other 
    non-intuitive types, google is your best friend!*/
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setAllTasks([...allTasks, {id: Date.now(), task, isDone: false}])
      setTask("")
    }
  }
  return (
    <div className="App">
      <span className='heading'>Task Listing</span>
      <InputField task={task} setTask={setTask} handleAdd={handleAdd}/>
      <TaskList allTasks={allTasks} setAllTasks={setAllTasks}/>
    </div>
  );
}

export default App;
