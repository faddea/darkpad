import React, { useState, useEffect } from 'react';

// Función para formatear la fecha a un string simple para la clave de almacenamiento (YYYY-MM-DD)
const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
};

// Función para formatear la fecha para mostrar (Ej: Lunes, 30 de Octubre de 2025)
const formatDisplayDate = (date) => {
    return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const STORAGE_KEY_PREFIX = 'journal_entry_';

export default function JournalEntry() {
    const todayKey = getTodayKey();
    const displayDate = formatDisplayDate(new Date());

    // Cargar la entrada de hoy al inicio
    const [entry, setEntry] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(STORAGE_KEY_PREFIX + todayKey) || '';
        }
        return '';
    });
    const [saveStatus, setSaveStatus] = useState(''); // Para mostrar un mensaje de guardado

    // Función para guardar la entrada en localStorage
    const handleSave = (textToSave) => {
        if (typeof window !== 'undefined') {
            if (textToSave.trim()) {
                localStorage.setItem(STORAGE_KEY_PREFIX + todayKey, textToSave);
                setSaveStatus('✅ Guardado automáticamente');
            } else {
                // Si el texto está vacío, elimina la entrada
                localStorage.removeItem(STORAGE_KEY_PREFIX + todayKey);
                setSaveStatus('🗑️ Entrada eliminada');
            }
        }
    };

    // Efecto para el guardado automático (debounced)
    useEffect(() => {
        // Establecer un temporizador para guardar automáticamente después de que el usuario deja de escribir
        const handler = setTimeout(() => {
            if (entry !== localStorage.getItem(STORAGE_KEY_PREFIX + todayKey)) {
                handleSave(entry);
            }
        }, 1500); // Guarda después de 1.5 segundos de inactividad

        // Limpieza: borra el temporizador si el componente se desmonta o el texto cambia
        return () => {
            clearTimeout(handler);
            setSaveStatus(''); // Limpia el estado de guardado al escribir
        };
    }, [entry, todayKey]);


    return (
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-2xl w-full">
            {/* Encabezado con Fecha y Estado */}
            <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-3">
                <h3 className="text-xl font-semibold text-white capitalize">
                    {displayDate}
                </h3>
                <p className={`text-sm font-medium ${saveStatus.includes('✅') ? 'text-lime-400' : 'text-zinc-500'} transition-opacity duration-500`}>
                    {saveStatus || 'Escribiendo...'}
                </p>
            </div>

            {/* Área de texto para la entrada del diario */}
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="¿Qué tienes en mente hoy? ¿Cómo te fue el día?..."
                rows="15"
                className="
                    w-full min-h-[300px] p-4 text-base rounded-lg bg-zinc-800 text-white 
                    focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all
                    resize-y
                "
            />
            
            {/* Opcional: Botón de guardado manual, aunque el guardado es automático */}
            {/* <div className="mt-4 text-right">
                <button 
                    onClick={() => handleSave(entry)}
                    className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl text-white font-medium transition-all"
                >
                    Guardar Ahora
                </button>
            </div> */}
        </div>
    );
}