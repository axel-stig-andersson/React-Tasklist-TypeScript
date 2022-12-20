import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task } from './model';

// React.FC means it is a function component.
const App:React.FC = () =>  {

  const [task, setTask] = useState<string>("")
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])

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

  const onDragEnd = (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId &&
         destination.index === source.index) return;
      let add, 
        active = allTasks,
        complete = completedTasks;

      if(source.droppableId === 'TaskArea') {
        add = active[source.index];
        active.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }

      if(destination.droppableId === 'FinishedArea') {
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add)
      }
      setCompletedTasks(complete)
      setAllTasks(active)


  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Task Listing</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd}/>
        <TaskList allTasks={allTasks} 
          setAllTasks={setAllTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}/>
      </div>
    </DragDropContext>
  );
}

export default App;
