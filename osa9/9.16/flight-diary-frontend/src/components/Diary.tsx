// src/components/Diary.tsx
import React, { useEffect, useState } from 'react';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const Diary: React.FC = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/diaries');
      const data = await response.json();
      setDiaries(data);
    } catch (error) {
      console.error('Error fetching diaries:', error);
    }
  };

  return (
    <div>
      <h1>Diaries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>Date: {diary.date}</h2>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default Diary;
