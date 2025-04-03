import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SaunaApp() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [temp, setTemp] = useState(70);
  const [code, setCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState({ loggedIn: false, name: "" });
  const [bookingHistory, setBookingHistory] = useState([]);

  const handleUnlock = () => {
    alert("Sauna unlocked with code: " + code);
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    alert("Sauna heating started to " + temp + "°C");
    setBookingHistory([...bookingHistory, { date: selectedDate, temp }]);
  };

  const handleLogin = () => {
    setUser({ loggedIn: true, name: "Guest User" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">sauna.fo Web App</h1>

      {!user.loggedIn ? (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Login</h2>
            <Button onClick={handleLogin}>Login as Guest</Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="book">Book Session</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Unlock Sauna</h2>
                <Label htmlFor="code">Enter Access Code</Label>
                <Input
                  id="code"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mb-3"
                />
                <Button onClick={handleUnlock}>Unlock</Button>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Start Your Session</h2>
                <Label htmlFor="temp">Set Temperature (°C)</Label>
                <Input
                  id="temp"
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="mb-3"
                />
                <Label className="mb-2 block">Choose Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  className="mb-3"
                />
                <Button onClick={handleStartSession} disabled={sessionStarted}>
                  {sessionStarted ? "Session in Progress" : "Start Heating"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Session History</h2>
                {bookingHistory.length === 0 ? (
                  <p>No sessions booked yet.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {bookingHistory.map((entry, index) => (
                      <li key={index}>
                        {entry.date.toDateString()} - {entry.temp}°C
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
                <p>Manage bookings, view users, and control sauna status here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
