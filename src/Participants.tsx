import  { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface Participant {
  id: number;
  fullName: string;
  email: string;
  discordUser: string;
  motivation: string;
  bootcampChoices: string[];
}

export  function ParticipantsPage() {
    const navigate=useNavigate();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get<Participant[]>(
          "https://bitup-brgnh7fyergeata9.spaincentral-01.azurewebsites.net/api/ParticipantAPI"
        );
        setParticipants(response.data);
      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to load participants. Check your backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading participants...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-center">
        {error}
      </div>
    );

  return (
   <div className="flex flex-col justify-start items-center min-h-screen bg-white p-4"> 
    
     <button onClick={()=>navigate("/")}
        className="self-start mb-4 px-3 sm:px-4 py-2 bg-[#FF0EC0] hover:bg-[#8c0e90] backdrop-blur-sm text-white rounded-lg font-semibold transition"
      >
        &larr; Back Home
      </button>

    <div className="w-full  mx-auto bg-white ">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-8 text-purple-700 text-center">
        Registered Participants
      </h1>

      {/* ✅ Responsive scrollable container */}
      <TableContainer
        component={Paper}
      
      >
        <Table >
          <TableHead>
            <TableRow className="bg-purple-100">
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Full Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Discord User</TableCell>
              <TableCell className="font-bold">Motivation</TableCell>
              <TableCell className="font-bold">Bootcamp Choices</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {participants.map((p) => (
              <TableRow key={p.id} className="hover:bg-purple-50 transition-all">
                <TableCell>{p.id}</TableCell>
                <TableCell className="font-semibold">{p.fullName}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.discordUser}</TableCell>
                <TableCell>{p.motivation}</TableCell>
                <TableCell>
                  {p.bootcampChoices.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.bootcampChoices.map((choice, i) => (
                        <span
                          key={i}
                          className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {choice}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
    </div>
  );
}
