'use client'
import { useRef, useState } from 'react'
import { confirmToDoList } from '../[id]/actions';

export default function TripToDo() {
  const inputRef = useRef(null);
  let [taskID, setTaskID] = useState(0)
  let [toDo, setToDo] = useState([]);

  function deleteTask(taskID) {
    setToDo(toDo.filter(task => task.id !== taskID))
  }

  async function addTask(taskToDO) {
    setToDo([
      ...toDo,
      {
        task: taskToDO,
        id: taskID
      }
    ]);
    setTaskID(taskID + 1)
    confirmToDoList(toDo)
  }

  // TODO move addTask to actions for server rendering

  return (
    <>
      <div>
        <input type='text' name='taskToDO' ref={inputRef} placeholder='Start typing a task...' />
        <button onClick={() => addTask(inputRef.current.value)}>Add Task</button>
      </div>
      <div>
        <ul>
          {toDo.map((toDo) => (
            <li key={toDo.id} onClick={() => deleteTask(toDo.id)}>{toDo.task}</li>
          ))}
        </ul>
        {/* <button onClick={() => confirmToDoList(toDo)}>Confirm Task List</button> */}
      </div>
    </>
  )
}
