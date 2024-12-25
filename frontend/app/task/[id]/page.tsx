'use client';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function TaskDetailPage() {
  const { id } = useParams();  
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'pink', 'brown'];
  const [added, setAdded] = useState(false);
  const router = useRouter();

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
      };
    
    const handleEditTask = async() => {
      if (taskTitle && selectedColor) {
        alert(`Task: ${taskTitle}, Color: ${selectedColor}`);
        try {
          await axios.put(`http://localhost:4000/tasks/${id}`, {
            title: taskTitle,
            color: selectedColor,
            completed: false
          });
          setAdded(true);
        } catch (error) {
          console.error('Error editing task');
        }
        setTaskTitle('');
        setSelectedColor('');
      }
    };

    const returnHome = () => {
      router.push('/home');
    }

    useEffect(()=>{
        const storedMidpoint = localStorage.getItem("buttonMid");
        if (storedMidpoint) {
          document.documentElement.style.setProperty("--button-midpoint", storedMidpoint);
        }
        const getTask = async() => {
            try {
            const info = await axios.get(`http://localhost:4000/tasks/${id}`);
            setTaskTitle(info.data.title);
            setSelectedColor(info.data.color);
            } catch (error) {
                console.error(`Error fetching task for the ${id}`);
              }
        }
        getTask();
    },[])
    return (
        <div className="bg-custom-backdrop min-h-screen flex flex-col items-center bg-gray-900 text-white p-6 mb-20">
        <header className="max-w-3xl flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center">
                <span className="text-blue-500">\uD83D\uDE80</span> <span className="text-tasksColor mr-2">Todo </span> <span className="text-app">App</span>
            </h1>
        </header>
        <div style={{
             marginTop: `var(--button-midpoint)`
        }}
        className="relative">
            <div className="self-start mb-4">
              <button onClick={() => returnHome()} className="text-white hover:text-gray-300">
                ← Back
              </button>
            </div>
            <div className="mb-6 w-full max-w-3xl">
            <label htmlFor="title" className="text-textBlue block text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Ex. Brush your teeth"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
    
          <div className="mb-6 w-full max-w-3xl">
            <label className="text-textBlue block text-sm font-bold mb-2">Color</label>
            <div className="flex gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${
                    selectedColor === color ? 'ring-4 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                >
                </div>
              ))}
            </div>
          </div>
    
          <button
            onClick={handleEditTask}
            className={`w-full max-w-3xl items-center justify-center bg-customBlue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex 
            ${added ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {added? <span>Edited &#x2714;</span> : <span>Edit Task &#x2295; </span>}
          </button>
          </div>
        </div>
      );
}
