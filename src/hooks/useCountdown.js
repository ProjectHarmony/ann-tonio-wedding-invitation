import { useEffect, useState } from 'react';

function getTimeLeft(targetISO) {
  const total = new Date(targetISO).getTime() - Date.now();
  const clamped = Math.max(total, 0);

  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function useCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetISO));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return timeLeft;
}
