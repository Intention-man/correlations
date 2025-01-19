"use client";
import React, { useState, useEffect } from "react";
import MoodForm from "../components/MoodForm";
import MoodChart from "../components/MoodChart";
import { db } from "../lib/db";
import { MoodEntry } from "../lib/types";

const Home: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  const fetchMoodEntries = async () => {
    const allEntries: MoodEntry[] = await db.moods.toArray();
    setMoodEntries(allEntries);
  };

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const handleMoodAdded = () => {
    fetchMoodEntries();
  };

  const chartData = moodEntries.map((entry) => ({
    date: entry.date,
    text: entry.text,
    mood: entry.mood,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mood Tracker</h1>
      <MoodForm onMoodAdded={handleMoodAdded} />
      <h2 className="text-xl font-semibold my-4">Mood Chart</h2>
      <MoodChart data={chartData} />
      <h2 className="text-xl font-semibold my-4">Mood Entries</h2>
      <ul>
        {moodEntries.map((entry) => (
          <li key={entry.id} className="py-2 border-b border-gray-200">
            {entry.date} - {entry.text} - Настроение: {entry.mood}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
