import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { toUnicode } from 'punycode';

type Props = {
  task: Task;
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const SingleTask = ({ task, allTasks, setAllTasks}:Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>(task.task)

 
  const handleDone = (id: number) => {
    setAllTasks(allTasks.map((t) => t.id ===id?
    {...t, isDone: !t.isDone}:t))
  }
  const handleDelete = (id: number) => {
    setAllTasks(allTasks.filter((t) => t.id !== id &&
    {...t}))
  }
  const handleEdit = (e:React.FormEvent, id: number) => {
    e.preventDefault();

    setAllTasks(allTasks.map((t) => 
      t.id === id ?{...t, task: editedTask}:
      t))
    setEdit(false);
  }
  const focusRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    focusRef.current?.focus();
  }, [edit])


  return (
    <form className='task__single' onSubmit={(e) => handleEdit(e, task.id)}>
      {edit ? (
        <input 
          ref={focusRef}
          value={editedTask} onChange={(e) => 
          {setEditedTask(e.target.value)}} 
          className='task_single--text'/>
      ) :
        task.isDone ? (
          <s className='task__single--text'>{task.task}</s>
        ): 
          (<span className='task__single--text'>{task.task}</span>)
        
      }

      <div>
        <span className="icon" onClick={() => {
          if (!edit && !task.isDone) {
              setEdit(!edit)
          }
        }
        }>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(task.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(task.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTask