import { useState, useEffect } from "react";
import {
  Heart,
  Cake,
  Sparkles,
  Gift,
  Star,
  Music,
  Flame,
  Crown,
  Camera,
} from "lucide-react";
import BenchImage from "../public/bench-cinematic.jpg";
import Cinematic1 from "../public/cinametic.jpg";
import Cinematic2 from "../public/cinematic2.jpg";

// Hero Section Component - EXTRA FUNKY VERSION
const HeroSection = () => {
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * 100 },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
        },
      ]);
    }, 500);

    return () => clearInterval(sparkleInterval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts((prev) => prev.slice(-20));
      setSparkles((prev) => prev.slice(-15));
    }, 3000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-float animation-delay-400"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-300/25 rounded-full blur-2xl animate-pulse-slow"></div>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up pointer-events-none z-10"
          style={{ left: `${heart.x}%` }}
        >
          <Heart className="text-pink-400 fill-pink-400" size={24} />
        </div>
      ))}

      {/* Random Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-fade-in-out pointer-events-none z-10"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        >
          <Sparkles className="text-yellow-400" size={sparkle.size} />
        </div>
      ))}

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Funky rotating crown */}
          <div className="relative inline-block">
            <div className="animate-bounce-slow">
              <Crown className="text-yellow-500 w-20 h-20 mx-auto mb-4 animate-wiggle" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Flame className="text-orange-500 w-8 h-8 animate-pulse" />
            </div>
          </div>

          {/* Main title with extra effects */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 animate-gradient mb-2">
              Happy Birthday
            </h1>
            <div className="flex justify-center gap-4 my-4">
              <Star
                className="text-yellow-400 fill-yellow-400 animate-spin-slow"
                size={30}
              />
              <Star
                className="text-pink-400 fill-pink-400 animate-spin-slow animation-delay-200"
                size={25}
              />
              <Star
                className="text-red-400 fill-red-400 animate-spin-slow animation-delay-400"
                size={30}
              />
            </div>
          </div>

          {/* Name with fire effects */}
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-9xl font-extrabold text-red-600 animate-pulse-slow drop-shadow-lg">
              Amruta!
            </h2>
            <div className="flex justify-center gap-2 mt-2">
              <Flame className="text-orange-500 animate-wiggle" size={30} />
              <Heart
                className="text-pink-500 fill-pink-500 animate-pulse"
                size={35}
              />
              <Flame
                className="text-orange-500 animate-wiggle animation-delay-200"
                size={30}
              />
            </div>
          </div>

          {/* Funky description */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl md:text-3xl text-gray-800 font-bold leading-relaxed">
              To the girl who's 🔥 FIRE 🔥
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Fierce as a lioness 🦁 • Sweet as chocolate 🍫
              <br />
              Boss energy 24/7 💅 • Queen of attitude 👑
            </p>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold text-xl animate-bounce-slow shadow-xl">
              <span className="inline-flex items-center gap-2">
                <Sparkles size={20} />
                Today is YOUR day!
                <Sparkles size={20} />
              </span>
            </div>
          </div>

          {/* Dancing icons */}
          <div className="flex gap-6 justify-center flex-wrap pt-6">
            <div className="animate-wiggle">
              <Cake className="text-pink-500" size={50} />
            </div>
            <div className="animate-bounce-slow animation-delay-200">
              <Gift className="text-red-500" size={50} />
            </div>
            <div className="animate-wiggle animation-delay-400">
              <Music className="text-pink-500" size={50} />
            </div>
            <div className="animate-spin-slow">
              <Camera className="text-red-500" size={50} />
            </div>
          </div>

          {/* Extra funky banner */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-pink-300">
              <Heart
                className="text-red-500 fill-red-500 animate-pulse"
                size={24}
              />
              <span className="text-lg font-semibold text-gray-800">
                Scroll down for surprises! 🎁
              </span>
              <Heart
                className="text-red-500 fill-red-500 animate-pulse"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Photo Gallery Component with imported images
const PhotoGallery = () => {
  const photos = [
    { id: 1, caption: "Cinematic vibes ✨", mood: "happy", src: Cinematic1 },
    {
      id: 2,
      caption: "That cute angry face 😤💕",
      mood: "angry",
      src: Cinematic2,
    },
    { id: 3, caption: "Bench moments 💕", mood: "happy", src: BenchImage },
    { id: 4, caption: "Boss lady mode ON 👑", mood: "fierce", src: Cinematic1 },
    {
      id: 5,
      caption: "Caught being adorable 🥰",
      mood: "happy",
      src: Cinematic2,
    },
    { id: 6, caption: "Pure perfection ✨", mood: "happy", src: BenchImage },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-red-600">
          Gallery of Moods 📸
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          All versions of you are my favorite ❤️
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square bg-gradient-to-br from-pink-200 to-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-white font-semibold text-center text-lg">
                  {photo.caption}
                </p>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2">
                <Star className="text-yellow-400 fill-yellow-400 w-6 h-6 animate-spin-slow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Love Notes Component (removed partner in crime)
const LoveNotes = () => {
  const notes = [
    {
      title: "Your Anger is Cute 😤",
      message:
        "Yes, even when you're mad at me, I can't help but smile. That little pout? Adorable. Those fiery eyes? Captivating. You're beautiful in every mood!",
      color: "from-red-400 to-pink-400",
    },
    {
      title: "The Boss Lady 👑",
      message:
        "Your strength, your passion, your determination - everything about you inspires me. You're fierce and fabulous!",
      color: "from-rose-400 to-red-400",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-pink-100 via-red-50 to-rose-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-red-600">
          Love Notes 💌
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {notes.map((note, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`bg-gradient-to-br ${note.color} p-1 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="bg-white rounded-xl p-6 h-full">
                  <div className="mb-4">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500 mx-auto group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {note.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Birthday Wishes Component
const BirthdayWishes = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="text-yellow-400 w-16 h-16 opacity-50" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float animation-delay-400">
        <Sparkles className="text-pink-400 w-16 h-16 opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <Cake className="w-16 h-16 text-pink-500 mx-auto animate-bounce-slow" />

            <h2 className="text-3xl md:text-4xl font-bold text-red-600">
              My Birthday Wish for You 🎂
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                On this special day, I wish you all the happiness in the world.
                May your day be filled with laughter, love, and everything that
                makes you smile.
              </p>
              <p className="text-pink-600 font-semibold">
                May you get less angry at me this year 😅 (just kidding, I love
                that about you too!)
              </p>
              <p>
                Thank you for being you - fierce, passionate, caring, and
                absolutely amazing. Here's to another year of adventures
                together!
              </p>
              <p className="text-2xl font-bold text-red-500">
                I love you more than words can say ❤️
              </p>
            </div>

            <div className="pt-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg animate-pulse-slow">
                <Heart className="fill-white" />
                Happy Birthday, My Love!
                <Heart className="fill-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-pink-200 via-red-200 to-rose-200">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            Made with{" "}
            <Heart className="inline w-5 h-5 text-red-500 fill-red-500 animate-pulse" />{" "}
            for the most amazing girl
          </p>
          <p className="text-gray-600">
            P.S. - Don't be too angry at me for this cheesy website 😘
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <HeroSection />
      <PhotoGallery />
      <LoveNotes />
      <BirthdayWishes />
      <Footer />
    </div>
  );
}
