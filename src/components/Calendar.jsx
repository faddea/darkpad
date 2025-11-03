import React, { useState } from 'react';

// Nombres de los días de la semana y meses
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Función utilitaria para obtener la información del mes (simplificada)
const getMonthInfo = (year, month) => {
    // Para simplificar, obtenemos el primer día del mes y el número de días
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // getDay() retorna 0 para Domingo, 1 para Lunes, etc. Lo ajustamos para que Lunes sea 0
    const startDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); 

    // Creamos un array simple de días para la cuadrícula
    const calendarDays = [];
    
    // Rellenar días vacíos al inicio (ej: si el mes empieza un miércoles)
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
    }

    // Rellenar con los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }
    
    // Devolvemos la información necesaria para el renderizado
    return { daysInMonth, startDay, calendarDays };
};

export default function BigCalendar() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const { calendarDays } = getMonthInfo(currentYear, currentMonth);

    // Lógica para avanzar/retroceder mes
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <div className="bg-neutral-950 rounded-3xl p-6 shadow-2xl w-full border border-lime-600">
            {/* Encabezado del Calendario */}
            <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-4">
                <button 
                    onClick={goToPreviousMonth}
                    className="text-lime-600 hover:text-white transition-colors p-2 rounded-full"
                    aria-label="Mes anterior"
                >
                    &larr;
                </button>
                <h3 className="text-2xl font-bold text-lime-500 tracking-wide">
                    {MONTHS[currentMonth]} {currentYear}
                </h3>
                <button 
                    onClick={goToNextMonth}
                    className="text-lime-600 hover:text-white transition-colors p-2 rounded-full"
                    aria-label="Mes siguiente"
                >
                    &rarr;
                </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm text-zinc-500 mb-2">
                {DAYS.map(day => (
                    <div key={day} className="py-2 border-b border-zinc-800">
                        {day}
                    </div>
                ))}
            </div>

            {/* Cuadrícula de días del mes */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                    <div 
                        key={index} 
                        className={`
                            h-24 p-2 rounded-lg transition-colors duration-200
                            ${day 
                                ? 'bg-neutral-900 hover:bg-neutral-950 cursor-pointer' 
                                : 'bg-transparent'
                            }
                            ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                                ? 'border border-lime-400/50 ring-2 ring-lime-400/20' // Día actual resaltado
                                : ''
                            }
                        `}
                    >
                        {day && (
                            <div className={`text-right font-bold text-sm ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'text-lime-400' : 'text-white'}`}>
                                {day}
                            </div>
                        )}
                        {/* Aquí se mostrará la tarea pendiente (ej: un punto de color) */}
                        {day && (
                            <div className="mt-1 flex flex-col gap-0.5">
                                {/* Ejemplo de indicador de tarea: */}
                                <div className="w-2 h-2 rounded-full bg-neutral-500/80 mx-auto"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}