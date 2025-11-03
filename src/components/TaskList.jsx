// src/components/TaskList.jsx

import { useState, useEffect } from "react"; // ⬅️ Importamos useEffect
import NewTaskModal from "./NewTaskModal";

// Definimos la clave de almacenamiento
const STORAGE_KEY = 'my_tasks_list';

export default function TaskList() {
    // 1. Cargar el estado desde localStorage al inicio
    const [tasks, setTasks] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            return savedTasks ? JSON.parse(savedTasks) : [];
        }
        return [];
    });
    const [showModal, setShowModal] = useState(false);

    // 2. Guardar el estado en localStorage cada vez que 'tasks' cambia
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

    // 3. Función para completar/eliminar una tarea
    const completeTask = (indexToRemove) => {
        setTasks(prevTasks => {
            // Crea una copia del array
            const newTasks = [...prevTasks]; 
            // Elimina la tarea por su índice
            newTasks.splice(indexToRemove, 1);
            return newTasks;
        });
        // Nota: El useEffect de arriba se encarga de guardar en localStorage.
    };

  const formatDate = (date) => {
    if (!date) return "Sin Fecha";
    return new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const fechaActual = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const subjectColor = (subject) => {
  switch (subject) {
    case "Matemáticas":
      return "from-sky-500 to-blue-500";
    case "Historia":
      return "from-amber-500 to-yellow-500";
    case "Lengua":
      return "from-rose-500 to-pink-500";
    case "Ciencias":
      return "from-emerald-500 to-green-500";
    default:
      return "from-indigo-500 to-purple-500";
  }
};

  
  return (
    <section className="px-6 pb-6 max-w-5xl mx-auto"> 
      <div className="flex justify-between items-start mb-6 pt-2"> 
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-white">Mis Tareas</h2>
          <p className="text-zinc-400 capitalize text-sm">
            {fechaActual}
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-lime-500 hover:text-neutral-950 px-5 py-2 rounded-xl text-white font-medium transition-all"
        >
          + Nueva Tarea
        </button>
      </div>

      <div id="tasks-list-container" className="flex flex-col gap-4">
  {tasks.length === 0 ? (
    <p className="text-zinc-400 text-center mt-8">No hay tareas todavía</p>
  ) : (
    tasks.map((t, i) => (
      <div
        key={i}
        className="relative bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-5 flex justify-between items-start hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Círculo decorativo de materia */}
          <div className={`w-3.5 h-3.5 mt-1 rounded-full bg-gradient-to-r ${subjectColor(t.subject)} shadow-md`}></div>

          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              {t.title}
            </h3>
            <p className="text-sm font-medium text-indigo-400">{t.subject}</p>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              {t.description.length > 80
                ? `${t.description.substring(0, 80)}...`
                : t.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <span className="text-xs font-medium text-zinc-400 mb-2">
            {formatDate(t.date)}
          </span>
          <button
                // 4. Llama a completeTask con el índice de la tarea
                onClick={() => completeTask(i)} 
            className="text-xs px-3 py-1 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white"
          >
            Completar
          </button>
        </div>
      </div>
    ))
  )}
</div>

      <NewTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={addTask}
      />
    </section>
  );
}
