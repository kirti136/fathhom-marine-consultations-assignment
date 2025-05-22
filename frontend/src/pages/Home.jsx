import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ship, setShip] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const debounceTimer = useRef(null);

  const fetchShip = async (query = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/marine?name=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching ships:", error);
      setData([]);
      alert("Failed to fetch ship details");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of all ships
  useEffect(() => {
    fetchShip("");
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchShip(ship.trim());
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [ship]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-lg">
        <h1 className="text-xl font-semibold tracking-wide">
          🚢 Marine Tracker
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold rounded-md transition"
        >
          Logout
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">
            🌊 Search Marine Vessels
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <input
              value={ship}
              onChange={(e) => setShip(e.target.value)}
              placeholder="Enter Ship Name"
              className="flex-1 px-5 py-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100
              focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {loading ? (
            <p className="text-center text-cyan-400">Loading ships...</p>
          ) : data?.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {data.map((shipItem, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-cyan-300 mb-3">
                    {shipItem.name}
                  </h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>
                      <strong>Status:</strong> {shipItem.status}
                    </div>
                    <div>
                      <strong>IMO:</strong> {shipItem.imo}
                    </div>
                    <div>
                      <strong>Type:</strong> {shipItem.type}
                    </div>
                    {shipItem.image && (
                      <img
                        src={shipItem.image}
                        alt={shipItem.name}
                        className="mt-4 rounded-lg w-full max-h-48 object-cover border border-gray-600"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : ship.trim() !== "" ? (
            <p className="text-center text-gray-500">No ships found.</p>
          ) : (
            <p className="text-center text-gray-500">No ships available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
