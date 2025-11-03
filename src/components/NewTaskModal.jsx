import { useState } from "react";

import CustomSelect from "./CustomSelect";

import DateInput from './DateInput'; 


// Lista de materias para el desplegable
const SUBJECTS = [
  "Matemáticas",
  "Proyecto Tecnológico",
  "Software",
  "Lengua",
  "Inglés",
  "Programación II", // ¡Añadí esta!
  "Formación ética",
  "Organización y gestión",
  "Redes",
  "Practicas Profesionalizantes",
  "Hardware",
  "General" 
];

export default function NewTaskModal({ onAddTask, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  // Establecemos el valor inicial del select al primer elemento del array, o "General" si está vacío.
  const [subject, setSubject] = useState(SUBJECTS[0] || "General"); 
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Si no hay título y no hay descripción, no hacemos nada.
    if (!title.trim() && !description.trim()) return;

    const newTask = {
      title: title.trim() || "Tarea sin título",
      // El subject ya viene seleccionado del estado.
      subject: subject, 
      date: date || null,
      description: description.trim(),
    };

    onAddTask(newTask);
    setTitle("");
    // Se resetea al valor inicial después de guardar.
    setSubject(SUBJECTS[0] || "General"); 
    setDate("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-xl border border-zinc-800">
        <h2 className="text-2xl font-semibold text-lime-400 border-b border-zinc-700 pb-2">
          Nueva Tarea
        </h2>

        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800 text-white w-full text-base placeholder-zinc-500 focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all"
          />

          {/* ¡Aquí está el cambio! Usamos un <select> en lugar del <input> de materia.
            Reutilizamos las mismas clases de Tailwind para mantener el estilo.
          */}
          <CustomSelect
  subject={subject}
  setSubject={setSubject}
  SUBJECTS={SUBJECTS}
/>





          <DateInput date={date} setDate={setDate} />

          <textarea
            placeholder="Descripción detallada"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 rounded-lg bg-zinc-800 text-white w-full text-base placeholder-zinc-500 focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-sm font-medium text-white transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-sm font-semibold text-black shadow-md shadow-lime-500/30 transition-all"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}