import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const startMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);

        // Once music starts, we no longer need the listeners
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
        window.removeEventListener("keydown", startMusic);
      } catch (error) {
        // Browser blocked autoplay.
        // It will try again after user interaction.
      }
    };

    // Try autoplay immediately
    startMusic();

    // Fallback for browsers that block autoplay
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
    window.addEventListener("keydown", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Music playback failed:", error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/bg-music.mp3"
        loop
        preload="auto"
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={
          isPlaying
            ? "Pause background music"
            : "Play background music"
        }
        className="
          fixed bottom-6 right-6 z-50
          flex h-12 w-12 items-center justify-center
          rounded-full
          border border-white/40
          bg-white/80
          text-ink-700
          shadow-lg
          backdrop-blur-sm
          transition-all duration-300
          hover:scale-105
          active:scale-95
        "
      >
        {isPlaying ? (
          <span className="text-lg">♫</span>
        ) : (
          <span className="text-lg opacity-60">♪</span>
        )}
      </button>
    </>
  );
}