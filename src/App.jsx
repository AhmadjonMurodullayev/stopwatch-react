import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [installedTimes, setInstalledTimes] = useState([]);
  const [installedRunning, setInstalledRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000 / speed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, speed]);

  useEffect(() => {
    let interval = null;
    if (installedRunning) {
      interval = setInterval(() => {
        setInstalledTimes((prevTimes) =>
          prevTimes.map((t) => t + 1)
        );
      }, 1000 / speed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [installedRunning, speed]);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerTime === 0) {
      clearInterval(interval);
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

  const startStopwatch = () => setRunning(true);
  const stopStopwatch = () => setRunning(false);
  const startAllTimers = () => setInstalledRunning(true);
  const stopAllTimers = () => setInstalledRunning(false);
  const installStopwatch = () => {
    setInstalledTimes((prevTimes) => [...prevTimes, time]);
    setTime(0); // Asosiy vaqtni 0 ga qaytaradi
  };
  const removeAllTimers = () => setInstalledTimes([]);

  const removeTimer = (index) => {
    setInstalledTimes(installedTimes.filter((_, i) => i !== index));
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const startTimer = () => {
    setTimerTime(timerMinutes * 60);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerTime(timerMinutes * 60);
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Stopwatch</h2>
      <p className="text-2xl font-bold mb-4">{formatTime(time)}</p>
      <button onClick={startStopwatch} className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">Start</button>
      <button onClick={stopStopwatch} className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2">Stop</button>
      <button onClick={installStopwatch} className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2">Install</button>
      <button onClick={removeAllTimers} className="px-4 py-2 bg-purple-500 text-white rounded-lg">Remove </button>


 

      {/* Saqlangan vaqtlar ro'yxati */}
      {installedTimes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Installed Times</h3>
          {installedTimes.map((time, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <p className="text-xl font-bold">{formatTime(time)}</p>
              <button onClick={() => removeTimer(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Timer qismi */}
      <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Timer</h2>
        <input
          type="number"
          value={timerMinutes}
          onChange={(e) => setTimerMinutes(e.target.value)}
          className="px-4 py-2 border rounded-lg text-center mb-4"
          placeholder="Enter minutes"
        />
        <p className="text-2xl font-bold mb-4">{formatTime(timerTime)}</p>
        <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">Start</button>
        <button onClick={stopTimer} className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2">Stop</button>
        <button onClick={resetTimer} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Reset</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Stopwatch />
    </div>
  );
};

export default App;

