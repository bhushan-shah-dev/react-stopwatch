import React, { useEffect, useState } from 'react';
import './App.css';

enum TimerState {
  STARTED,
  PAUSED,
  STOPPED
}

function App() {
  const [time, setTime] = useState(new Date());
  const [centiseconds, setCentiseconds] = useState(0);

  const [timerState, setTimerState] = useState<TimerState>(TimerState.STOPPED);

  // Start an interval to handle current time update
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(new Date())
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  // Event handlers
  const startTimer = () => {
    setTimerState(TimerState.STARTED);
  };

  const pauseTimer = () => {
    setTimerState(TimerState.PAUSED);
  };

  const stopTimer = () => {
    setTimerState(TimerState.STOPPED);
  };

  // Handle timer state change
  useEffect(() => {
    let interval: number;
    if (timerState === TimerState.STARTED) {
      interval = window.setInterval(() => {
        setCentiseconds(s => s+1);
      }, 10);
    }
    if (timerState === TimerState.PAUSED) {
      /* @ts-ignore */
      if (interval) {
        clearInterval(interval);
      }
    }
    if (timerState === TimerState.STOPPED) {
      /* @ts-ignore */
      if (interval) {
        clearInterval(interval);
      }
      setCentiseconds(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [timerState]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>React Stopwatch</h3>
        <h4>{`The current time is ${time.toLocaleTimeString()}`}</h4>
        <h1>{`${Math.floor(centiseconds/100).toString()}.${(centiseconds % 100).toString().padStart(2, '0')} seconds`}</h1>
        <div className="controls">
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={stopTimer}>Stop</button>
        </div>
      </header>
    </div>
  );
}

export default App;
