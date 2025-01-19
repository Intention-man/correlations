"use client";
import React, { useState } from "react";
import { db } from "../lib/db";

interface MoodFormProps {
  onMoodAdded: () => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onMoodAdded }) => {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(3); // Начать со среднего настроения

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];

    try {
      await db.moods.add({
        date: formattedDate,
        text,
        mood,
      });
    } catch (error) {
      console.error("Failed to add mood data", error);
    }

    setText("");
    setMood(3);
    onMoodAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mood (1-5):
        </label>
        <input
          type="number"
          value={mood}
          onChange={(e) => setMood(parseInt(e.target.value, 10))}
          min="1"
          max="5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Mood
      </button>
    </form>
  );
};

export default MoodForm;
