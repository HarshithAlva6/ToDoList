'use client'; 
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function HomePage () {
    const [tasks, setTasks] = useState<{ id: number; title: string; color: string; completed: boolean }[]>([]);
    const router = useRouter();

    const addTask = () => {
        router.push('/task');
      };

    const deleteTask = async (id: number) => {
      try{
        const response = await axios.delete(`http://localhost:4000/tasks/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        alert(`${response.data.title} has been deleted`)
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }

    const editTask = (id: number) => {
      router.push(`/task/${id}`);
    }

    const patchTasks = async (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (task === undefined) {
        console.error(`Task with id ${id} not found.`);
        return;
      }
      await axios.patch(`http://localhost:4000/tasks/${id}`, {
        completed: !task.completed
      });
      setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ))
    }
    useEffect (() => {
      const button = document.getElementById("create-task");
      if (button) {
        const rect = button.getBoundingClientRect();
        const midpoint = `${rect.top + rect.height / 2}px`;
        document.documentElement.style.setProperty("--button-midpoint", midpoint);
        localStorage.setItem("buttonMid", midpoint);
      }
      const fetchTasks = async() => {
        const response = await axios.get('http://localhost:4000/tasks');
        setTasks(response.data);
      }
      fetchTasks();
    }, []);
    return (
    <div className="bg-custom-backdrop min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="max-w-3xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-blue-500">\uD83D\uDE80</span> <span className="text-tasksColor mr-2">Todo </span> <span className="text-app">App</span>
        </h1>
      </header>

      <div className = "w-full max-w-3xl" onClick={addTask}>
        <button id="create-task"
        className="w-full flex justify-center items-center mb-6s bg-customBlue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
        >
          Create Task
        </button>
      </div>

      <div className="w-full max-w-3xl">
        <div className="flex flex-col mt-10 text-gray-500">
          <div className="flex justify-between text-sm text-gray-400 mb-4">
              <div className="text-tasksColor flex flex-row space-x-2">
                <span>Tasks</span> 
                <span className="bg-gray-600 text-white p-2 h-5 flex items-center justify-center rounded-lg">{tasks.length}</span>
              </div>
              <div className="text-completedColor flex flex-row space-x-4">
                <span>Completed</span> 
                <span className="bg-gray-600 text-white p-2 h-5 flex items-center justify-center rounded-lg">
                {tasks.length > 0 ? `${tasks.filter(task => task.completed).length} of ${tasks.length}` : tasks.length}
                </span>
              </div>
          </div>
        {tasks.length == 0?
        (<>
        <hr></hr>
        <div className="flex flex-col items-center mt-10">
            <div className="text-5xl mb-4">\uD83D\uDCC4</div>
             <p>You don&apos;t have any tasks registered yet.</p>
             <p>Create tasks and organize your to-do items.</p>
        </div></>):
        (<div>
            <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
                onClick={() => editTask(task.id)}
              >
                <input
                type="checkbox"
                checked={task.completed}
                onClick = {(e) => {e.stopPropagation()}}
                onChange={() => patchTasks(task.id)}
              className="mr-3 rounded-full ring-2 ring-blue-500 checked:bg-blue-500 checked:border-transparent appearance-none w-4 h-4 flex items-center justify-center"/>
                <span className={task.completed ? 'line-through text-gray-400' : ''} 
                      style={{ color: task.color, fontSize: 20, fontWeight: 700}}>
                  {task.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="text-gray-500 hover:text-white focus:outline-none text-2xl"
                >
                    &#x1F5D1;
                </button>
              </li>
            ))}
          </ul>
        </div>)}
        </div>
      </div>
    </div>
    );
}