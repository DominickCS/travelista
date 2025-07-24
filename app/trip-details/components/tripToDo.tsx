'use client'
import { useRef, useState } from 'react'

export default function TripToDo() {
  const inputRef = useRef(null);
  let [taskID, setTaskID] = useState(0)
  let [toDo, setToDo] = useState([]);

  function deleteTask(taskID) {
    setToDo(toDo.filter(task => task.id !== taskID))
  }

  function addTask(taskToDO) {
    setToDo([
      ...toDo,
      {
        task: taskToDO,
        id: taskID
      }
    ]);
    setTaskID(taskID + 1)
    console.log(toDo)
  }

  return (
    <>
      <div>
        <h3>TRIP TO-DO:</h3>
        <input type='text' name='taskToDO' ref={inputRef} />
        <button onClick={() => addTask(inputRef.current.value)}>Add Task</button>
      </div>
      <div>
        <ul>
          {toDo.map((toDo) => (
            <li key={toDo.id} onClick={() => deleteTask(toDo.id)}>{toDo.task}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
