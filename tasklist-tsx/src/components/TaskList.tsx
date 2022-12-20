import React from 'react'
import "./styles.css"
import { Task } from '../model'
import SingleTask from './SingleTask';
import { Droppable } from 'react-beautiful-dnd';
interface Props {
    allTasks: Task[];
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
    completedTasks: Task[]
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>
}


const TaskList: React.FC<Props> = ({ 
    allTasks, 
    setAllTasks, 
    completedTasks, 
    setCompletedTasks }) => {
  return (
    // <div className='tasklist'>
    //     {allTasks.map((task) => (
    //         <SingleTask 
    //         task={task} 
    //         key={task.id}
    //         allTasks={allTasks}
    //         setAllTasks={setAllTasks}/>
    //     ))}
    // </div>
    <div className='container'>
      <Droppable droppableId='TaskArea'>
        {(provided) => (
          <div className='tasklist'
            ref={provided.innerRef}
            {...provided.droppableProps}
            >
          <span className="tasklist__heading">
            Active Tasks
          </span>
          {
            allTasks.map((task, index) => (
              <SingleTask 
                index={index}
                task={task}
                allTasks={allTasks}
                key={task.id}
                setAllTasks={setAllTasks}
                />
            ))}
            {provided.placeholder}
          </div>
        )
        }
          
      </Droppable>
      <Droppable droppableId='FinishedArea'>
        {(provided) => (
            <div className='tasklist remove'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
            <span className="tasklist__heading">
              Completed Tasks
            </span>
            {
              completedTasks.map((task, index) => (
                <SingleTask 
                  index={index}
                  task={task}
                  allTasks={completedTasks}
                  key={task.id}
                  setAllTasks={setCompletedTasks}
                  />
              ))
            }
              {provided.placeholder}
            </div>
        )}
      </Droppable>

    </div>
  )
}

export default TaskList