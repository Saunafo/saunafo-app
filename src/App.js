// App with booking slots per sauna
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Calendar } from "./components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function SaunaApp() {
  const [selectedSauna, setSelectedSauna] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const availableSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-serif">
      <header className="bg-gradient-to-r from-yellow-700 to-yellow-800 py-12 px-6 text-center shadow-xl">
        <h1 className="text-5xl font-bold uppercase tracking-wider text-white mb-4">sauna.fo</h1>
        <p className="text-xl text-yellow-100 italic max-w-2xl mx-auto">
          Where fire meets fog. Experience the Viking sauna ritual across the Faroe Islands.
        </p>
        <Button className="mt-6 bg-white text-yellow-800 px-6 py-2 font-bold rounded shadow-lg hover:bg-yellow-200 transition">
          Book Your Ritual
        </Button>
      </header>

      <section className="py-12 px-4 md:px-16">
        <h2 className="text-3xl text-yellow-300 font-bold mb-8 text-center uppercase">Explore Our Saunas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {saunas.map((sauna, index) => (
            <Card
              key={index}
              className={`bg-gray-800 border ${
                selectedSauna?.name === sauna.name ? "border-yellow-400" : "border-yellow-700"
              } rounded-xl shadow-lg cursor-pointer`}
              onClick={() => setSelectedSauna(sauna)}
            >
              <img src={sauna.image} alt={sauna.name} className="w-full h-48 object-cover rounded-t-xl" />
              <CardContent className="p-4">
                <h3 className="text-xl text-yellow-100 font-bold mb-1">{sauna.name}</h3>
                <p className="text-sm text-gray-300 mb-1">{sauna.description}</p>
                <p className="text-xs text-gray-400 italic">📍 {sauna.location}</p>
                <p className="text-xs text-yellow-300 mt-1 font-semibold">Price: {sauna.price} DKK/hour</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedSauna && (
          <div className="mt-12 bg-gray-800 border border-yellow-600 rounded-xl p-6 shadow-xl">
            <h3 className="text-2xl text-yellow-300 font-bold mb-4">Book {selectedSauna.name}</h3>
            <Label className="text-sm mb-2 block">Choose Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              className="mb-4"
            />
            <Label className="text-sm mb-2 block">Available Slots</Label>
            <div className="flex flex-wrap gap-3 mb-6">
              {availableSlots.map((slot) => (
                <Button
                  key={slot}
                  className={`px-4 py-2 rounded ${
                    selectedSlot === slot ? "bg-yellow-600" : "bg-yellow-400 text-gray-900"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
            <Button disabled={!selectedSlot} className="bg-yellow-700 text-white px-6 py-2 rounded">
              Confirm Booking for {selectedSlot || "..."}
            </Button>
          </div>
        )}
      </section>

      <section className="bg-yellow-50 py-12 px-6 text-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-4 uppercase">What Our Guests Say</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="text-lg italic border-l-4 border-yellow-700 pl-4 text-gray-700">
            "The best sea dip and sauna I've had in my life. Magical fog, fire, and waves."<br />
            <span className="block text-sm font-semibold mt-2">— Jónas from Klaksvík</span>
          </blockquote>
          <blockquote className="text-lg italic border-l-4 border-yellow-700 pl-4 text-gray-700">
            "It felt like stepping into an ancient ritual. Absolutely loved it."
            <span className="block text-sm font-semibold mt-2">— Rannvá, Tórshavn</span>
          </blockquote>
        </div>
      </section>

      <section className="bg-yellow-100 py-12 px-6 text-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-4 uppercase">Become a Member</h2>
        <p className="max-w-xl mx-auto mb-6">
          Access unlimited heat, private booking, and priority during peak hours. Membership starts at 299 DKK/month.
        </p>
        <Button className="bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-800 transition">
          Join the Saga
        </Button>
      </section>

      <footer className="bg-gray-900 text-center text-yellow-100 py-8">
        <p>© 2025 sauna.fo — Crafted with steam and stone</p>
      </footer>
    </div>
  );
}

const saunas = [
  {
    name: "Tróndur",
    image: "/images/sauna1.jpg",
    description: "Strong and solitary on the rocks.",
    location: "Gjógv, North Eysturoy",
    price: 450
  },
  {
    name: "Huld",
    image: "/images/sauna2.jpg",
    description: "Hidden in mist and mystery.",
    location: "Funningur Valley",
    price: 390
  },
  {
    name: "Sólja",
    image: "/images/sauna3.jpg",
    description: "Calm, light, and blooming.",
    location: "Leirvík Hills",
    price: 420
  },
  {
    name: "Eldur",
    image: "/images/sauna4.jpg",
    description: "Fierce and fiery core heat.",
    location: "Sundini Peninsula",
    price: 480
  },
  {
    name: "Skavi",
    image: "/images/sauna5.jpg",
    description: "Highland winds and chill.",
    location: "Viðareiði Ridge",
    price: 400
  },
  {
    name: "Nólsoy Flame",
    image: "/images/sauna6.jpg",
    description: "Maritime strength and sea dips.",
    location: "Nólsoy Island",
    price: 430
  }
];
