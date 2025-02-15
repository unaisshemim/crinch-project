
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Flame, Users, HeartCrack, Star } from "lucide-react";
import { toast } from "sonner";

type FlamesResult = "Friends" | "Lovers" | "Affectionate" | "Marriage" | "Enemies" | "Siblings" | null;

const Flames = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<FlamesResult>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateFlames = (name1: string, name2: string): FlamesResult => {
    // Remove spaces and convert to lowercase
    const str1 = name1.toLowerCase().replace(/\s/g, "");
    const str2 = name2.toLowerCase().replace(/\s/g, "");

    // Count remaining characters after canceling out common characters
    let count = 0;
    const chars1 = [...str1];
    const chars2 = [...str2];

    chars1.forEach(char => {
      if (!chars2.includes(char)) count++;
    });

    chars2.forEach(char => {
      if (!chars1.includes(char)) count++;
    });

    // FLAMES calculation
    const flames = ["Friends", "Lovers", "Affectionate", "Marriage", "Enemies", "Siblings"];
    const result = flames[(count % 6)] as FlamesResult;
    return result;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      toast.error("Please enter both names");
      return;
    }

    setIsCalculating(true);
    setResult(null);

    // Simulate calculation time for animation
    setTimeout(() => {
      const flamesResult = calculateFlames(name1, name2);
      setResult(flamesResult);
      setIsCalculating(false);
    }, 5000);
  };

  // const getResultIcon = (result: FlamesResult) => {
  //   switch (result) {
  //     case "Friends": return <Users className="h-16 w-16" />;
  //     case "Lovers": return <Heart className="h-16 w-16" />;
  //     case "Affectionate": return <Heart className="h-16 w-16 text-pink-500" />; // Changed from UserHeart
  //     case "Marriage": return <Star className="h-16 w-16" />;
  //     case "Enemies": return <HeartCrack className="h-16 w-16" />;
  //     case "Siblings": return <Users className="h-16 w-16" />;
  //     default: return null;
  //   }
  // };
  const getResultIcon = (result: FlamesResult) => {
    switch (result) {
      case "Friends": return (
        <img
          src="https://media.tenor.com/FUpjhvbSQa0AAAAM/friends-friends-tv.gif"
          alt=""
        />
      );
      case "Lovers": return (
        <img
          src="https://media.tenor.com/fRtBS7waUAIAAAAM/xg-harvey.gif"
          alt=""
        />
      );
      case "Affectionate": return (
        <img
          src="https://media.tenor.com/L0qShasgWyUAAAAm/love-valentine%27s-day.webp"
          alt=""
        />
      ); // Changed from UserHeart
      case "Marriage": return (
        <img
          src="https://media.tenor.com/aP2mJ1j68GgAAAAM/happy-navratri.gif"
          alt=""
        />
      );
      case "Enemies": return (
        <img
          src="https://media.tenor.com/U9nZQ_OTmFsAAAAM/comedysportz-comedy.gif"
          alt=""
        />
      );
      case "Siblings": return (
        <img
          src="https://media.tenor.com/i-o9n-NqM2UAAAAM/bhibatsam-cute-kid.gif"
          alt=""
        />
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold text-center text-gray-900 mb-8 animate-fadeIn">
          Flames Calculator
        </h1>

        <div className="max-w-2xl mx-auto">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn opacity-0" 
               style={{ animationDelay: "200ms" }}>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-playfair text-lg font-medium text-gray-900 mb-2">
                    First Name
                  </label>
                  <Input
                    placeholder="Enter first name"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="font-inter"
                  />
                </div>
                <div>
                  <label className="block font-playfair text-lg font-medium text-gray-900 mb-2">
                    Second Name
                  </label>
                  <Input
                    placeholder="Enter second name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="font-inter"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isCalculating}
                className="w-full bg-love-500 hover:bg-love-600 text-white font-medium py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {isCalculating ? (
                  <Flame className="h-5 w-5 animate-spin" />
                ) : (
                  "Calculate Flames"
                )}
              </Button>
            </form>
          </div>

          {/* Result Display */}
          {(isCalculating || result) && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fadeIn opacity-0"
                 style={{ animationDelay: "400ms" }}>
              {isCalculating ? (
                <div className="flex flex-col items-center space-y-4">
                  <Flame className="h-16 w-16 text-love-500 animate-bounce" />
                  <p className="font-playfair text-xl">Calculating your destiny...</p>
                </div>
              ) : result && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-love-500 animate-pulse-slow">
                    {getResultIcon(result)}
                  </div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900">
                    {result}
                  </h2>
                  <p className="font-inter text-gray-600">
                    {name1} and {name2}'s relationship is destined to be {result.toLowerCase()}!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flames;
