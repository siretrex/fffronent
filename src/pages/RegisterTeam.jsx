import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { useSelector } from "react-redux";
import BaseURl from "../BaseURl";

const RegisterTeam = () => {
  const location = useLocation();
  const { tournament } = location.state || {};
  const tournamentId = tournament?._id || "";
  const entryFee = tournament?.entryFee || "Free";

  const user = useSelector((state) => state.auth.user);
  const userID = user?._id || null;

  const [team, setTeam] = useState({
    team_name: "",
    leaderName: user?.username || "",
    contactNumber: user?.phone_no || "",
    members: [{ name: "", inGameId: "" }],
    utrNumber: "",
    tournamentId: tournamentId,
    userId: userID,
    leader_email: user?.email || "",
  });

  const [copied, setCopied] = useState(false);
  const UPI_ID = "yourupiid@upi";
  const QR_CODE_URL = "/qr-code.png";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    setTeam((prev) => {
      const updatedMembers = [...prev.members];
      updatedMembers[index][name] = value;
      return { ...prev, members: updatedMembers };
    });
  };

  const addMember = () => {
    if (team.members.length < 5) {
      setTeam((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", inGameId: "" }],
      }));
    } else {
      alert("⚠️ Maximum 5 members allowed!");
    }
  };

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!team.team_name || !team.leaderName || !team.contactNumber) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${BaseURl}/register-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      });

      if (res.ok) {
        alert(`✅ Team Registered Successfully for ${tournament?.name || ""}`);
        setTeam({
          team_name: "",
          leaderName: user?.username || "",
          contactNumber: user?.phone_no || "",
          members: [{ name: "", inGameId: "" }],
          utrNumber: "",
          tournamentId,
          userId: userID,
          leader_email: user?.email || "",
        });
      } else {
        const errData = await res.json();
        alert(`❌ Error: ${errData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#111]/90 border border-yellow-500/40 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.3)] px-8 py-10 w-full max-w-xl space-y-6"
      >
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-t-2xl animate-pulse"></div>

        <h2 className="text-3xl font-extrabold text-center text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
          ⚔️ Register Team
        </h2>
        <p className="text-center text-gray-300">
          Tournament: <span className="text-yellow-400">{tournament?.name || "N/A"}</span>
        </p>

        {/* Team Info */}
        <div>
          <label className="block text-sm mb-2 text-gray-300">Team Name</label>
          <input
            type="text"
            name="team_name"
            value={team.team_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-300">Leader Name</label>
          <input
            type="text"
            name="leaderName"
            value={team.leaderName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-300">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={team.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
          />
        </div>

        {/* Team Members */}
        <h3 className="text-lg font-semibold text-yellow-400 mt-6">Team Members</h3>
        {team.members.map((member, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              name="name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, e)}
              placeholder={`Member ${index + 1} Name`}
              required
              className="px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
            />
            <input
              type="text"
              name="inGameId"
              value={member.inGameId}
              onChange={(e) => handleMemberChange(index, e)}
              placeholder="Free Fire ID"
              required
              className="px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
            />
          </div>
        ))}
        {team.members.length < 5 && (
          <button
            type="button"
            onClick={addMember}
            className="w-full py-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg font-semibold hover:opacity-90 transition"
          >
            ➕ Add Member
          </button>
        )}

        {/* Payment Section */}
        {entryFee.toLowerCase() !== "free" && (
          <>
            <h3 className="text-lg font-semibold text-yellow-400 mt-6">💳 Payment Details</h3>
            <div className="p-4 bg-black/70 border border-yellow-500/30 rounded-xl text-center space-y-3">
              <p className="text-sm">
                Pay entry fee via UPI: <strong className="text-yellow-400">{entryFee}</strong>
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold text-yellow-300">{UPI_ID}</span>
                <button
                  type="button"
                  onClick={copyUPI}
                  className="p-1 bg-yellow-500/20 rounded hover:bg-yellow-500/30 transition"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
              <img
                src={QR_CODE_URL}
                alt="UPI QR Code"
                className="mx-auto w-40 h-40 rounded-lg border border-yellow-400/40 shadow-[0_0_10px_rgba(255,215,0,0.4)]"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-300 mt-3">Enter 12-digit UTR Number</label>
              <input
                type="text"
                name="utrNumber"
                value={team.utrNumber}
                onChange={handleChange}
                required
                maxLength="12"
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-500/30 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-gray-400"
              />
            </div>
          </>
        )}

        {/* Discord Section */}
        <div className="text-center space-y-2 mt-6">
          <p className="text-sm text-gray-300">Send payment screenshot on Discord:</p>
          <a
            href="https://discordapp.com/users/YOUR_DISCORD_ID"
            target="_blank"
            rel="noreferrer"
            className="w-full block py-3 bg-gradient-to-r from-indigo-500 to-purple-600 font-bold rounded-lg hover:opacity-90 transition"
          >
            📩 Send Screenshot on Discord
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-extrabold rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] transition"
        >
          Register Team
        </button>
      </form>
    </div>
  );
};

export default RegisterTeam;
