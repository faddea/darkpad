import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ subject, setSubject, SUBJECTS }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-4 py-3 rounded-lg
                    bg-zinc-900 to-zinc-800 border
                    ${open ? "border-lime-400" : "border-zinc-700"}
                    text-lime-400 font-medium focus:outline-none transition-all`}
      >
        {subject || "Seleccioná una materia"}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-180 text-lime-400" : "text-lime-400"
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-full bg-zinc-900 border border-zinc-700 
                     rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2"
        >
          {SUBJECTS.map((sub) => (
            <div
              key={sub}
              onClick={() => {
                setSubject(sub);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer text-white hover:bg-lime-500/20 
                          transition-all ${
                            subject === sub ? "bg-lime-500/10 text-lime-400" : ""
                          }`}
            >
              {sub}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
