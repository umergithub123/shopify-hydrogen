import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  // useEffect runs side effects - in this case, updating the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer ended - you can add logic here to stop the sale/offer
          clearInterval(timer);
          return prev;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Cleanup function - stops the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900 text-white">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Announcement Text */}
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide">
            🎉 Limited time offer - Get 30% off all items
          </p>
        </div>

        {/* Right: Timer */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="inline-flex gap-1">
            <span className="bg-red-500 px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-slate-400">:</span>
            <span className="bg-red-500 px-2 py-1 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-slate-400">:</span>
            <span className="bg-red-500 px-2 py-1 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </span>
          <span className="ml-2 text-slate-400">Left</span>
        </div>
      </div>
    </div>
  );
}