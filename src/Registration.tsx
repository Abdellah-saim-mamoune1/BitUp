import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const [skillLevel, setSkillLevel] = useState<string>("");
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>([]);
 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  // Workshop checkbox
  const handleWorkshopChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedWorkshops((prev) =>
      prev.includes(value) ? prev.filter((w) => w !== value) : [...prev, value]
    );
  };

  // Form submission
  const handleSubmit = () => {
    setMessage("Registration submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] flex flex-col items-center justify-start p-4">
      {/* Back Home */}
      <button
        onClick={() => navigate("/")}
        className="self-start mb-4 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/40 transition"
      >
        &larr; Back Home
      </button>

      {/* Form Container */}
      <div className="w-full max-w-[450px] min-w-0 p-4 sm:p-6 rounded-xl shadow-2xl bg-gradient-to-br from-[#3d1f66] to-[#2a1548]">
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl text-center mb-6 font-bold">
          Registration Form
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {/* Inputs */}
          {["Full Name","Discord User", "E-Mail"].map((placeholder) => (
            <input
              key={placeholder}
              type={placeholder.includes("E-Mail") ? "email" : "text"}
              placeholder={placeholder}
              required
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
            />
          ))}

          {/* File Upload */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-white text-xs sm:text-sm">
              Your student card picture please
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white rounded-lg bg-gray-800/20 p-2 cursor-pointer text-xs sm:text-sm"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-28 sm:max-h-32 mt-2 rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Skill Level */}
    
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-white text-xs sm:text-sm font-medium">Choose your Bootcamp</h2>
            <ul className="grid grid-cols-2 gap-1 sm:gap-2 list-none">
              {["Frontend", "Backend"].map((ws) => (
                <li key={ws}>
                  <label className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      value={ws}
                      checked={selectedWorkshops.includes(ws)}
                      onChange={handleWorkshopChange}
                      className="w-3 sm:w-4 h-3 sm:h-4"
                    />
                    <span className="text-white capitalize">{ws}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Why do you want to participate"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none resize-vertical min-h-[60px] sm:min-h-[80px] text-xs sm:text-sm"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-2 sm:py-3 text-white font-bold rounded-lg transition-all bg-gradient-to-r from-purple-500 to-indigo-700 shadow-lg hover:scale-105 text-sm sm:text-base"
        >
          Confirm Registration
        </button>
      </div>

      {/* Success Popup */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-white text-gray-900 p-4 sm:p-6 rounded-lg min-w-[220px] sm:min-w-[260px] text-center shadow-lg">
            <p className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-bold hover:scale-105 transition text-xs sm:text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
