import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoSection from "./VideoSection";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import BaseURl from "../BaseURl";

const HeroPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BaseURl}/tournament`)
      .then((res) => setTournaments(res.data))
      .catch((err) => console.error("Error fetching tournaments:", err));
  }, []);

  const handleRegister = (tournament) => {
    navigate("/register-team", { state: { tournament } });
  };

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <VideoSection />
      </div>

      <div className="relative z-10 text-white font-body">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-black/70 via-[#0A0A0A]/70 to-black/70 backdrop-blur-md fixed top-0 w-full z-20 border-b border-[#FF4D00]/40">
          <Navbar />
        </nav>

        {/* Hero Section */}
        <section className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#00C2FF] mb-4 font-heading drop-shadow-[0_0_25px_rgba(255,77,0,0.7)] animate-pulse">
            WarSky FF
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-6 font-body drop-shadow-[0_0_15px_rgba(0,194,255,0.4)]">
            Compete. Stream. Win. <br />
            The ultimate arena for Free Fire tournaments
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-gradient-to-r from-[#FF4D00] to-[#FFB800] text-black px-8 py-4 rounded-xl font-bold hover:from-[#FF6A00] hover:to-[#FFD43B] transition text-lg shadow-[0_0_20px_rgba(255,77,0,0.6)]"
              onClick={() =>
                document.getElementById("tournaments").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              View Tournaments
            </button>

            <button
              className="bg-gradient-to-r from-[#00C2FF] to-[#0078FF] text-black px-8 py-4 rounded-xl font-bold hover:from-[#00E1FF] hover:to-[#008CFF] transition text-lg shadow-[0_0_20px_rgba(0,194,255,0.6)]"
              onClick={() => navigate("/leaderboard")}
            >
              View Leaderboard
            </button>
          </div>
        </section>

        {/* Tournaments Section */}
        <section
          id="tournaments"
          className="w-full py-20 px-4 bg-gradient-to-b from-black/70 via-[#0A0A0A]/90 to-black/90 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 font-heading text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#00C2FF] drop-shadow-[0_0_20px_rgba(255,77,0,0.5)]">
            Current & Upcoming Tournaments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {tournaments.length === 0 ? (
              <p className="text-white text-lg">No tournaments available.</p>
            ) : (
              tournaments.map((t) => (
                <div
                  key={t._id}
                  className="bg-[#111]/90 backdrop-blur-md border border-[#FF4D00]/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:scale-105 transform transition hover:border-[#00C2FF]/60"
                >
                  <h3 className="text-2xl font-bold text-[#FFB800] mb-2">
                    {t.name}
                  </h3>
                  <p className="text-white mb-1">Entry Fee: {t.entryFee}</p>
                  <p className="text-white mb-1">
                    Start: {new Date(t.startDate).toLocaleDateString()} | End:{" "}
                    {new Date(t.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-white mb-4">Prize: {t.prizePool}</p>
                  {t.rules.length > 0 && (
                    <ul className="text-white mb-4 list-disc list-inside">
                      {t.rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-white mb-4">Status: {t.status}</p>
                  <button
                    className="bg-gradient-to-r from-[#FF4D00] to-[#FFB800] text-black px-6 py-3 rounded-xl font-bold hover:from-[#FF6A00] hover:to-[#FFD43B] transition shadow-[0_0_15px_rgba(255,77,0,0.6)]"
                    onClick={() => handleRegister(t)}
                  >
                    Register / Manage
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Floating Social Buttons */}
        <div className="fixed right-3 top-1/3 flex flex-col gap-3 z-50">
          <a
            href="https://www.instagram.com/warsky_ff?igsh=NGh4eWJjYTNuaXhr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#FF007F] to-[#FF4D00] p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <i className="fab fa-instagram text-white text-xl md:text-2xl"></i>
          </a>
          <a
            href="https://youtube.com/@warskyff?si=OqLFcaylqICCJ6Cp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#FF0000] to-[#FF4D00] p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <i className="fab fa-youtube text-white text-xl md:text-2xl"></i>
          </a>
          <a
            href="https://chat.whatsapp.com/BfFAztCzRaI5UcdLH5zcSn?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#00C851] to-[#007E33] p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <i className="fab fa-whatsapp text-white text-xl md:text-2xl"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
