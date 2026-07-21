"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  "Ciieeee ...... ada yang tambah usia niehhh\nSelamat ulang tahun nyyyaaakk!",
  "Pertama, semoga makin cakep, makin sukses, makin sehat, makin bahagia, makin banyak rezekinya, makin makinnn pokoke.",
  "Semoga diusia sekarang dirimu bisa menjadi versi yang lebih baik dari sebelume nyak.",
  "Semoga semua sing lagi kmu usahakan terwujud satu-satu semua yeah, dengan langkah kecil gpp\nSedikit sedikit jadi bukit wkwkwk....",
  "Terus jangan lupa jaga kesehatan mu yuupss\nJangan begadang nek hbs pulang kerja\nMinum yang cukup\nJanlup makan e juga!.",
  "SEMANGAATTT TERUS YAA!\n Semangat dalam semua hal ya\n Kalo capek istirahat jangan dipaksaiin\n Nek mau cerita apapun itu aku siap wkwkwk.....",
  "udah ya aku gatau meh bilang apa lagi hehehe, INTINYA!\nSELAMAT ULANG TAHUN MIFTAKHUL JANNAH!!!.",
];

const musicSrc = "/hbd.mp3";

// posisi & delay kupu-kupu background (seluruh layar)
const butterflies = [
  { left: "6%", delay: "0s", duration: "16s", size: 34 },
  { left: "18%", delay: "3s", duration: "20s", size: 26 },
  { left: "32%", delay: "1.2s", duration: "18s", size: 30 },
  { left: "48%", delay: "4.2s", duration: "22s", size: 24 },
  { left: "62%", delay: "0.6s", duration: "17s", size: 32 },
  { left: "76%", delay: "2.4s", duration: "19s", size: 22 },
  { left: "90%", delay: "3.6s", duration: "21s", size: 28 },
];

// kupu-kupu dekoratif di belakang teks, di dalam panel
const innerButterflies = [
  { top: "8%", left: "78%", delay: "0s", duration: "6s", size: 42, opacity: 0.50 },
  { top: "65%", left: "88%", delay: "1.2s", duration: "7s", size: 30, opacity: 0.50 },
  { top: "80%", left: "10%", delay: "2s", duration: "5.5s", size: 34, opacity: 0.50 },
  { top: "15%", left: "5%", delay: "0.6s", duration: "6.5s", size: 26, opacity: 0.30 },
];

const balloons = [
  { left: "8%", delay: "0s", duration: "12s", size: 40, hue: 335 },
  { left: "18%", delay: "2.4s", duration: "14s", size: 28, hue: 200 },
  { left: "30%", delay: "1.2s", duration: "13s", size: 34, hue: 268 },
  { left: "44%", delay: "3.1s", duration: "15s", size: 26, hue: 350 },
  { left: "58%", delay: "0.8s", duration: "11.5s", size: 38, hue: 192 },
  { left: "72%", delay: "2.1s", duration: "13.5s", size: 30, hue: 312 },
  { left: "86%", delay: "1.7s", duration: "14.5s", size: 36, hue: 42 },
];

const bubbles = [
  { top: "8%", left: "10%", size: 18, delay: "0s", duration: "9s", opacity: 0.18 },
  { top: "18%", left: "84%", size: 26, delay: "1.1s", duration: "11s", opacity: 0.14 },
  { top: "62%", left: "6%", size: 22, delay: "0.8s", duration: "10s", opacity: 0.16 },
  { top: "72%", left: "80%", size: 30, delay: "2s", duration: "12s", opacity: 0.12 },
  { top: "42%", left: "50%", size: 44, delay: "0.4s", duration: "13s", opacity: 0.08 },
  { top: "28%", left: "32%", size: 16, delay: "1.8s", duration: "8.5s", opacity: 0.15 },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "restart">("next");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTextPop, setShowTextPop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedMusicRef = useRef(false);

  const isLast = activeIndex === slides.length - 1;

  useEffect(() => {
    let index = 0;
    const text = slides[activeIndex];
    setTypedText("");
    setShowTextPop(false);

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setShowTextPop(true);
        }, 20);

        window.setTimeout(() => {
          setShowTextPop(false);
        }, 420);
      }
    }, 32);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  // Trigger confetti tepat setelah animasi ketik selesai di slide terakhir
  useEffect(() => {
    if (!isLast) {
      setShowConfetti(false);
      return;
    }

    const text = slides[activeIndex];
    const typingDuration = text.length * 32 + 260;

    const showTimer = window.setTimeout(() => {
      setShowConfetti(true);
    }, typingDuration);

    const hideTimer = window.setTimeout(() => {
      setShowConfetti(false);
    }, typingDuration + 1400);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isLast, activeIndex]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    void startMusic();

    const retryMusic = () => {
      void startMusic();
    };

    window.addEventListener("pointerdown", retryMusic, { once: true });
    window.addEventListener("keydown", retryMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", retryMusic);
      window.removeEventListener("keydown", retryMusic);
    };
  }, []);

  const startMusic = async () => {
    if (hasStartedMusicRef.current) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio.volume = 0.35;

    try {
      await audio.play();
      hasStartedMusicRef.current = true;
    } catch {
      // If autoplay is blocked, the next user gesture will try again.
    }
  };

  const handleNext = () => {
    void startMusic();

    setIsAnimating(true);
    setDirection(isLast ? "restart" : "next");

    if (isLast) {
      window.setTimeout(() => {
        setActiveIndex(0);
        setIsAnimating(false);
      }, 320);
      return;
    }

    window.setTimeout(() => {
      setActiveIndex((value) => value + 1);
      setIsAnimating(false);
    }, 320);
  };

  return (
    <main className="birthday-shell relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff6fa] via-[#fff8fd] to-[#f7f3ff] px-4 py-8 text-black sm:px-6 lg:px-8">
      <audio ref={audioRef} src={musicSrc} loop preload="auto" playsInline />

      {/* Background butterflies (seluruh layar) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <span
            key={i}
            className="panel-bubble absolute rounded-full"
            style={{
              top: bubble.top,
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
              opacity: bubble.opacity,
            }}
          />
        ))}

        {butterflies.map((b, i) => (
          <span
            key={i}
            className="floating-butterfly absolute bottom-[-10%] select-none opacity-80"
            style={{
              left: b.left,
              fontSize: `${b.size}px`,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          >
            🦋
          </span>
        ))}
      </div>

      {/* Balon dekoratif di belakang panel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <span
            key={i}
            className="panel-bubble absolute rounded-full"
            style={{
              top: bubble.top,
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
              opacity: bubble.opacity,
            }}
          />
        ))}

        {balloons.map((balloon, i) => (
          <span
            key={i}
            className="floating-balloon absolute bottom-[-18%] select-none"
            style={{
              left: balloon.left,
              fontSize: `${balloon.size}px`,
              animationDelay: balloon.delay,
              animationDuration: balloon.duration,
              ["--balloon-hue" as string]: balloon.hue,
            }}
          >
            🎈
          </span>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center">
        <div
          key={activeIndex}
          className={`slide-panel relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-pink-100/70 bg-white/88 p-5 text-center shadow-[0_18px_50px_rgba(219,39,119,0.09)] backdrop-blur-sm sm:p-10 sm:text-left ${
            isAnimating
              ? direction === "restart"
                ? "slide-panel-exit-fade"
                : "slide-panel-exit"
              : "slide-panel-enter"
          }`}
        >
          {/* Kupu-kupu dekoratif di belakang teks, di dalam panel */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
            {innerButterflies.map((b, i) => (
              <span
                key={i}
                className="inner-butterfly absolute select-none"
                style={{
                  top: b.top,
                  left: b.left,
                  fontSize: `${b.size}px`,
                  opacity: b.opacity,
                  animationDelay: b.delay,
                  animationDuration: b.duration,
                }}
              >
                🦋
              </span>
            ))}
          </div>

          <p className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-pink-400/80">
            {/* <span>🦋</span> */}
            {/* Halaman {String(activeIndex + 1).padStart(2, "0")} */}
          </p>
          <p className="relative z-10 mt-4 flex min-h-[11rem] w-full max-w-[20rem] items-center justify-center text-center handwritten-text text-[1.2rem] leading-8 tracking-normal text-[#4a2545] sm:mt-5 sm:max-w-none sm:min-h-34 sm:text-4xl sm:leading-[1.4]">
            {showTextPop && <span className="text-pop-halo" />}
            <span className="inline-block whitespace-pre-line">
              {typedText}
              <span className="typing-cursor ml-1 inline-block h-[0.9em] w-0.5 translate-y-1 bg-pink-400 align-text-bottom" aria-hidden="true" />
            </span>
          </p>

          {showConfetti && (
            <div className="confetti-burst z-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="confetti-particle">
                  🦋
                </span>
              ))}
            </div>
          )}

          {/* Progress dots
          <div className="relative z-10 mt-8 flex items-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-6 bg-gradient-to-r from-pink-400 to-purple-400"
                    : "w-1.5 bg-pink-200"
                }`}
              />
            ))}
          </div> */}

          <div className="relative z-10 mt-6 flex w-full items-center justify-center gap-4 sm:mt-8 sm:justify-end">
            {/* <p className="text-sm text-pink-400/70">
              {activeIndex + 1} dari {slides.length}
            </p> */}
            <button
              type="button"
              onClick={handleNext}
              disabled={isAnimating}
              className="cta-button inline-flex items-center justify-center gap-1.5 rounded-full border border-pink-200 bg-gradient-to-r from-[#f08bb5] to-[#b99cff] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(219,39,119,0.28)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(219,39,119,0.34)] disabled:cursor-wait disabled:opacity-80"
            >
              {isLast ? "🦋 Ulangi" : "Lanjuttt"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}