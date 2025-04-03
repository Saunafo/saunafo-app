// Extended with details modal + locations
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Calendar } from "./components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// Your sauna list...
const saunas = [
  { name: "Tróndur", image: "https://source.unsplash.com/400x200/?viking,sauna", description: "Strong and solitary on the rocks.", location: "Gjógv, North Eysturoy" },
  { name: "Huld", image: "https://source.unsplash.com/400x200/?foggy,forest", description: "Hidden in mist and mystery.", location: "Funningur Valley" },
  { name: "Sólja", image: "https://source.unsplash.com/400x200/?meadow,nature", description: "Calm, light, and blooming.", location: "Leirvík Hills" },
  { name: "Eldur", image: "https://source.unsplash.com/400x200/?fire,heat", description: "Fierce and fiery core heat.", location: "Sundini Peninsula" },
  { name: "Skavi", image: "https://source.unsplash.com/400x200/?windy,cliffs", description: "Highland winds and chill.", location: "Viðareiði Ridge" },
  { name: "Nólsoy Flame", image: "https://source.unsplash.com/400x200/?coastline,sea", description: "Maritime strength and sea dips.", location: "Nólsoy Island" }
];

export default function SaunaApp() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [temp, setTemp] = useState(70);
  const [code, setCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSauna, setSelectedSauna] = useState(saunas[0]);
  const [user, setUser] = useState({ loggedIn: false, name: "" });
  const [bookingHistory, setBookingHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  const handleUnlock = () => {
    alert(`Sauna ${selectedSauna.name} unlocked with code: ` + code);
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    alert(`Heating ${selectedSauna.name} sauna to ${temp}°C`);
    setBookingHistory([...bookingHistory, { date: selectedDate, temp, sauna: selectedSauna.name }]);
  };

  const handleLogin = () => {
    setUser({ loggedIn: true, name: "Guest User" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-serif p-6">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-wide uppercase text-yellow-300">sauna.fo</h1>

      {!user.loggedIn ? (
        <Card className="mb-6 bg-gray-800 border-yellow-500 border shadow-xl rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Log into the Sauna Realm</h2>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login as Guest</Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="mb-6 flex justify-center space-x-4">
            <TabsTrigger value="book" className="bg-gray-700 text-yellow-300 px-4 py-2 rounded-lg">Book Session</TabsTrigger>
            <TabsTrigger value="history" className="bg-gray-700 text-yellow-300 px-4 py-2 rounded-lg">Session History</TabsTrigger>
            <TabsTrigger value="admin" className="bg-gray-700 text-yellow-300 px-4 py-2 rounded-lg">Admin Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {saunas.map((sauna, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer bg-gray-800 border ${
                    selectedSauna.name === sauna.name ? "border-yellow-600" : "border-gray-700"
                  } shadow-md rounded-lg transition hover:border-yellow-500 relative`}
                  onClick={() => setSelectedSauna(sauna)}
                >
                  <img src={sauna.image} alt={sauna.name} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardContent className="p-4">
                    <h3 className="text-xl text-yellow-200 font-semibold">{sauna.name}</h3>
                    <p className="text-gray-300 text-sm mb-1">{sauna.description}</p>
                    <p className="text-gray-400 text-xs italic">📍 {sauna.location}</p>
                    <Button
                      className="mt-3 bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetails(sauna);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {showDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="bg-gray-900 border border-yellow-600 rounded-xl shadow-xl max-w-lg w-full p-6">
                  <h2 className="text-2xl text-yellow-300 font-bold mb-2">{showDetails.name}</h2>
                  <p className="text-gray-300 mb-2">{showDetails.description}</p>
                  <p className="text-sm italic text-yellow-200">Location: {showDetails.location}</p>
                  <img src={showDetails.image} alt={showDetails.name} className="w-full h-48 object-cover my-4 rounded" />
                  <Button onClick={() => setShowDetails(null)} className="bg-yellow-700 text-white px-4 py-2 rounded">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <Card className="mb-6 bg-gray-800 border border-yellow-600 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-yellow-100">Session History</h2>
                {bookingHistory.length === 0 ? (
                  <p className="text-gray-300">No sessions yet. Your saga begins now.</p>
                ) : (
                  <ul className="list-disc list-inside text-yellow-100">
                    {bookingHistory.map((entry, index) => (
                      <li key={index}>
                        {entry.date.toDateString()} - {entry.temp}°C - {entry.sauna}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="mb-6 bg-gray-800 border border-yellow-600 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-yellow-100">Admin Dashboard</h2>
                <p className="text-gray-300">Manage bookings, view users, and control the sauna flame here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
