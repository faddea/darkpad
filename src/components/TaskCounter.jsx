// src/components/TaskCounter.jsx

import { useState, useEffect } from 'react';

// CLAVE: El mismo nombre de la llave que usamos en TaskList
const STORAGE_KEY = 'my_tasks_list';

export default function TaskCounter() {
    const [taskCount, setTaskCount] = useState(0);

    useEffect(() => {
        // Esta función se ejecuta solo en el cliente
        const updateCount = () => {
            if (typeof window !== 'undefined') {
                const savedTasks = localStorage.getItem(STORAGE_KEY);
                try {
                    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
                    setTaskCount(tasks.length);
                } catch (e) {
                    console.error("Error al parsear tareas de localStorage", e);
                    setTaskCount(0);
                }
            }
        };

        // 1. Ejecutar al cargar
        updateCount();

        // 2. Agregar un listener para detectar cambios en localStorage (opcional, para tiempo real)
        // Aunque Astro/React ya re-hidrata al cargar, es una buena práctica.
        window.addEventListener('storage', updateCount);

        return () => {
            window.removeEventListener('storage', updateCount);
        };
    }, []);

    // Formato de texto
    const text = taskCount === 1 
        ? "Tienes 1 tarea pendiente." 
        : `Tienes ${taskCount} tareas pendientes.`;
    
    const countText = taskCount > 99 ? '99+' : taskCount;

    return (
        <div class="flex flex-col h-full justify-center items-start">
            <h3
                class="text-xl md:text-2xl font-bold text-white mb-2 mt-8 text-left"
            >
                Pendientes Hoy
            </h3>
            <p class="text-zinc-400 text-left">
                {text}
            </p>
            <div class="mt-4 text-left">
                <span class="text-5xl font-extrabold text-indigo-400">
                    {countText}
                </span>
            </div>
        </div>
    );
}
