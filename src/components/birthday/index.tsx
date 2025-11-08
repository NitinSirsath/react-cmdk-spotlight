import {
  Cake,
  Camera,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  Gift,
  Heart,
  Lock,
  Mail,
  Music,
  Sparkles,
  Star,
  Unlock,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import BenchImage from "/bench-cinematic.jpg";
import Cinematic1 from "/cinametic.jpg";
import Cinematic2 from "/cinematic2.jpg";
import photo1 from "/photo1.jpg";
import photo2 from "/photo2.jpg";
import photo3 from "/photo3.jpeg";

// Types
interface ConfettiItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

interface Photo {
  id: number;
  caption: string;
  mood: string;
  src: string;
}

interface HeartItem {
  id: number;
  x: number;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface Letter {
  title: string;
  message: string;
  color: string;
}

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalPhotos: number;
  currentIndex: number;
}

interface LoveLetterCardProps {
  letter: Letter;
  index: number;
}

// Confetti Component
const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);

  useEffect(() => {
    const colors = ["#ec4899", "#ef4444", "#f43f5e", "#fbbf24", "#fb923c"];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute w-3 h-3 opacity-80 animate-confetti-fall"
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Photo Modal Component
const PhotoModal = ({
  photo,
  onClose,
  onNext,
  onPrev,
  totalPhotos,
  currentIndex,
}: PhotoModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors"
      >
        <X size={32} />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white hover:text-pink-300 transition-colors"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Image */}
      <div className="max-w-4xl max-h-[80vh] animate-scale-in">
        <img
          src={photo.src}
          alt={photo.caption}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        <p className="text-white text-center mt-4 text-xl font-semibold">
          {photo.caption}
        </p>
        <p className="text-pink-300 text-center mt-2">
          {currentIndex + 1} / {totalPhotos}
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-pink-300 transition-colors"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

// Love Letter Card Component
const LoveLetterCard = ({ letter, index }: LoveLetterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative bg-gradient-to-br ${
          letter.color
        } p-1 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
          isOpen ? "scale-105" : "hover:scale-105"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-white rounded-xl p-6 min-h-[250px] flex flex-col">
          {/* Envelope Icon */}
          <div className="mb-4 flex items-center justify-center">
            {isOpen ? (
              <Unlock className="w-8 h-8 text-pink-500 animate-wiggle" />
            ) : (
              <Lock className="w-8 h-8 text-red-500 group-hover:animate-pulse" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-pink-500" />
            {letter.title}
          </h3>

          {/* Content */}
          <div
            className={`flex-1 overflow-hidden transition-all duration-500 ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-600 leading-relaxed text-center mb-4">
              {letter.message}
            </p>
          </div>

          {/* Click prompt */}
          {!isOpen && (
            <div className="text-center text-sm text-pink-500 font-semibold animate-bounce-slow">
              Click to open 💌
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);

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

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 overflow-hidden">
      {/* Confetti */}
      {showConfetti && <Confetti />}

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
              To the woman who lights up every room she walks into.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Fierce when needed, kind when it matters, and unapologetically
              herself. 🍫
              <br />A balance of strength and softness — that's what makes you
              amazing 👑
            </p>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold text-xl animate-bounce-slow shadow-xl">
              <span className="inline-flex items-center gap-2">
                <Sparkles size={20} />
                Here's to celebrating *you*, just the way you are.
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

// Photo Gallery Component
const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos: Photo[] = [
    { id: 1, caption: "Cinematic vibes ✨", mood: "happy", src: Cinematic1 },
    {
      id: 2,
      caption: "That look of determination — classic you. 😤💕",
      mood: "angry",
      src: photo3,
    },
    { id: 3, caption: "Bench moments 💕", mood: "happy", src: BenchImage },
    {
      id: 4,
      caption: "Confidence looks effortlessly good on you. 👑",
      mood: "fierce",
      src: photo1,
    },
    {
      id: 5,
      caption: "The kind of candid that says everything. 🥰",
      mood: "happy",
      src: photo2,
    },
    { id: 6, caption: "Pure perfection ✨", mood: "happy", src: Cinematic2 },
  ];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setSelectedPhoto(photos[index]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-red-600">
          Gallery of Moods 📸
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          All versions of you are my favorite ❤️ • Click to view fullscreen
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openModal(index)}
              className="group relative aspect-square bg-gradient-to-br from-pink-200 to-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-white font-semibold text-center text-lg">
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-2 right-2">
                <Star className="text-yellow-400 fill-yellow-400 w-6 h-6 animate-spin-slow" />
              </div>

              {/* Click indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <Camera className="text-pink-500" size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          totalPhotos={photos.length}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
};

// Love Letters Section
const LoveLetters = () => {
  const letters: Letter[] = [
    {
      title: "Your Anger is Cute 😤",
      message:
        "Even when you're upset, I still see how deeply you care.. That little pout? Adorable. Those fiery eyes? Captivating. You carry grace, even in your anger! Your passion is what makes you YOU, and I wouldn't change a thing.",
      color: "from-red-400 to-pink-400",
    },
    {
      title: "The Boss Lady 👑",
      message:
        "Your strength, your passion, your determination - everything about you inspires me. You're fierce and fabulous! The way you handle challenges with grace and fire makes me proud every single day.",
      color: "from-rose-400 to-red-400",
    },
    {
      title: "My Safe Place 🏡",
      message:
        "With you, peace feels real. Your laugh is my favorite sound, your smile is my favorite sight, and your love is my greatest treasure. Thank you for being my peace in this chaotic world.",
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "Forever Grateful 🙏",
      message:
        "Thank you for choosing me every day. For your patience, your love, your understanding. You make me want to be better. You make me believe in us. You make everything brighter just by being you.",
      color: "from-red-300 to-pink-300",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-pink-100 via-red-50 to-rose-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-red-600">
          Love Letters 💌
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Click each envelope to read my heart ❤️
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {letters.map((letter, index) => (
            <LoveLetterCard key={index} letter={letter} index={index} />
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
                May this year bring more smiles (and fewer reasons to get
                annoyed at me 😅)
              </p>
              <p>
                Thank you for being you - fierce, passionate, caring, and
                absolutely amazing. Here's to another year of adventures
                together!
              </p>
              <p className="text-2xl font-bold text-red-500">
                You deserve every bit of joy this world has to offer — today and
                always. ❤️
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
            for my amazing girl
          </p>
          <p className="text-gray-600">
            P.S. - Hope this made you smile — even a little 😄 😘
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function AmrutaHappyBirthday() {
  return (
    <div className="min-h-screen font-sans">
      <HeroSection />
      <PhotoGallery />
      <LoveLetters />
      <BirthdayWishes />
      <Footer />
    </div>
  );
}
