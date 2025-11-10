import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // ✅ Check localStorage for previous registration
  useEffect(() => {
    const saved = localStorage.getItem("participantRegistered");
    if (saved) setAlreadyRegistered(true);
  }, []);

  // --- Handle Input Changes ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- Workshop Checkbox ---
  const handleWorkshopChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => {
      const id = value === "Frontend" ? 1 : 2;
      const bootcampIds = prev.bootcampIds.includes(id)
        ? prev.bootcampIds.filter((b) => b !== id)
        : [...prev.bootcampIds, id];
      return { ...prev, bootcampIds };
    });
  };

  // --- Submit Form ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.fullName.trim() || !form.email.trim() || !form.motivation.trim()) {
      setMessage("Please fill in all required fields.");
      return;
    }
    if (form.bootcampIds.length === 0) {
      setMessage("Please select at least one bootcamp.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://bitup-brgnh7fyergeata9.spaincentral-01.azurewebsites.net/api/ParticipantAPI",
        form
      );

      console.log("Submitted data:", response.data);

      // ✅ Save flag in localStorage to prevent multiple registrations
      localStorage.setItem("participantRegistered", JSON.stringify(form));

      setMessage("Registration submitted successfully!");
      setAlreadyRegistered(true);
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit registration. Please try again.");
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[450px] p-4 sm:p-6 rounded-xl shadow-2xl bg-gradient-to-br from-[#3d1f66] to-[#2a1548]"
      >
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl text-center mb-6 font-bold">
          Registration Form
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {/* Full Name */}
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={30}
            placeholder="Full Name"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          {/* Discord */}
          <input
            name="discordUser"
            value={form.discordUser}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
            placeholder="Discord User"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={50}
            placeholder="E-Mail"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none text-sm sm:text-base"
          />

          {/* Bootcamp Select */}
          <div className="space-y-2">
            <h2 className="text-white text-xs sm:text-sm font-medium">
              Choose your Bootcamp
            </h2>
            <ul className="grid grid-cols-2 gap-2 list-none">
              {["Frontend", "Backend"].map((ws) => (
                <li key={ws}>
                  <label className="flex items-center gap-2 p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition text-sm">
                    <input
                      type="checkbox"
                      value={ws}
                      checked={
                        ws === "Frontend"
                          ? form.bootcampIds.includes(1)
                          : form.bootcampIds.includes(2)
                      }
                      onChange={handleWorkshopChange}
                      className="w-4 h-4"
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
            required
            minLength={5}
            maxLength={100}
            placeholder="Why do you want to participate?"
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:bg-gray-100 outline-none resize-vertical min-h-[80px] text-sm"
          />
        </div>

        {/* ✅ Show message if already registered */}
        {alreadyRegistered ? (
          <div className="mt-6 text-center bg-green-600 text-white py-3 rounded-lg font-semibold shadow-lg">
             You are already registered!
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 text-white font-bold rounded-lg transition-all bg-gradient-to-r from-purple-500 to-indigo-700 shadow-lg hover:scale-105 text-base disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Confirm Registration"}
          </button>
        )}
      </form>

      {/* Popup */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-white text-gray-900 p-6 rounded-lg min-w-[300px] text-center shadow-lg">
            <p className="text-lg font-bold mb-4">{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-[#a517a5] text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
