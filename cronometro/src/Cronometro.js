import './cronometro.css';
import React, { useState, useRef} from 'react';

function Cronometro() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [alertTime, setAlertTime] = useState(300); // tiempo de alerta en segundos
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const microSeconds = (time % 6000) % 100;
    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(microSeconds).padStart(2, "0")
    );
  };

  const handleAlert = () => {
    if (time === alertTime * 100) {
      alert(`¡Alerta! Han pasado ${alertTime} segundos.`);

    }
  };

  return (
    <div class="container">
      <h1>{formatTime(time)}</h1>
      <div>
        {!isActive && (
          <button type="button" class="primary" onClick={startTimer}>
            Iniciar
          </button>
        )}
        {isActive && (
          <button type="button" class="primary" onClick={stopTimer}>
            Detener
          </button>
        )}
        <button type="button" class="primary" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>
      <div class="alert">
        <label htmlFor="alertTime">Tiempo de alerta (segundos):</label>
        <input
          id="alertTime"
          type="number"
          value={alertTime}
          onChange={(e) => setAlertTime(parseInt(e.target.value))}
        />
      </div>
      {handleAlert()}
    </div>
  );
}
  export default Cronometro;
  