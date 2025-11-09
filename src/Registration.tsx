import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export interface IRegistration {
  fullName: string;
  email: string;
  discordUser: string;
  bootcampIds: number[];
  motivation: string;
}

export function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<IRegistration>({
    fullName: "",
    email: "",
    discordUser: "",
    bootcampIds: [],
    motivation: "",

  });

  
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Handle Input Changes ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  // --- Workshop Checkbox ---
  const handleWorkshopChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => {
      const current = prev.bootcampIds.includes(value === "Frontend" ? 1 : 2)
        ? prev.bootcampIds.filter((id) => id !== (value === "Frontend" ? 1 : 2))
        : [...prev.bootcampIds, value === "Frontend" ? 1 : 2];
      return { ...prev, bootcampIds: current };
    });
  };

  // --- Simulate API Call ---
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulated API endpoint
      const response = await fetch("https://example.com/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Fake success (since this is just a simulation)
      if (!response.ok) throw new Error("Network error");

      console.log("Submitted data:", form);
      setMessage("✅ Registration submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          <input
            name="discordUser"
            value={form.discordUser}
            onChange={handleChange}
            placeholder="Discord User"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-Mail"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          
          
          {/* Bootcamp Select */}
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-white text-xs sm:text-sm font-medium">Choose your Bootcamp</h2>
            <ul className="grid grid-cols-2 gap-1 sm:gap-2 list-none">
              {["Frontend", "Backend"].map((ws) => (
                <li key={ws}>
                  <label className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      value={ws}
                      checked={
                        ws === "Frontend"
                          ? form.bootcampIds.includes(1)
                          : form.bootcampIds.includes(2)
                      }
                      onChange={handleWorkshopChange}
                      className="w-3 sm:w-4 h-3 sm:h-4"
                    />
                    <span className="text-white capitalize">{ws}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Motivation */}
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            placeholder="Why do you want to participate?"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none resize-vertical min-h-[60px] sm:min-h-[80px] text-xs sm:text-sm"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full py-2 sm:py-3 text-white font-bold rounded-lg transition-all bg-gradient-to-r from-purple-500 to-indigo-700 shadow-lg hover:scale-105 text-sm sm:text-base disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Confirm Registration"}
        </button>
      </div>

      {/* Popup */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-white text-gray-900 p-4 sm:p-6 rounded-lg sm:min-w-[360px] text-center shadow-lg">
            <p className="text-xl font-bold mb-3 sm:mb-4">{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-green-600 text-white px-4 py-2 sm:px-4 sm:py-2 rounded-lg font-bold hover:scale-105 transition text-xs sm:text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
