import React from 'react'
import "./styles.css"
import { Task } from '../model'
import SingleTask from './SingleTask';
interface Props {
    allTasks: Task[];
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
}


const TaskList: React.FC<Props> = ({ allTasks, setAllTasks }) => {
  return (
    <div className='tasklist'>
        {allTasks.map((task) => (
            <SingleTask 
            task={task} 
            key={task.id}
            allTasks={allTasks}
            setAllTasks={setAllTasks}/>
        ))}
    </div>
  )
}

export default TaskList