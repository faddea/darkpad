// src/components/DateInput.jsx

import React from 'react';

/**
 * Componente reutilizable para la entrada de fecha.
 * Muestra un input type="date" con un icono SVG de calendario a la derecha.
 * @param {string} date - El valor actual de la fecha.
 * @param {function} setDate - Función para actualizar el estado de la fecha.
 */
export default function DateInput({ date, setDate }) {
    return (
        <div className="relative">
            {/* 1. Campo de Entrada de Fecha */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                    p-3 pr-10 rounded-lg bg-zinc-800 text-white w-full text-base 
                    focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all
                    
                    /* Oculta el icono nativo del navegador */
                    appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 
                    /* Asegura que el texto y el icono de fecha del navegador (si aparece) no se solapen */
                    [&::-webkit-datetime-edit]:text-white 
                "
            />
            
            {/* 2. Icono de Calendario (SVG) posicionado a la derecha */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <svg
                    className="w-5 h-5 text-lime-400" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    {/* SVG de un icono de Calendario */}
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        </div>
    );
}