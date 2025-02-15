
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/30 to-secondary/30">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/comic-style-background-red-colored_23-2148822367.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_authors_boost')] bg-cover bg-center opacity-40" />
        <div className="container mx-auto px-4 py-32">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="animate-float mb-6 inline-block">
              <Heart className="h-16 w-16 text-love-500 animate-pulse-slow" />
            </div>
            <h1 className="font-playfair  text-5xl md:text-6xl font-normal text-gray-900 mb-6 animate-fadeIn">
              Celebrate Love in Every Click
            </h1>
            <p
              className="font-inter text-xl text-gray-600 mb-8 animate-fadeIn opacity-0"
              style={{ animationDelay: "200ms" }}
            >
              Discover the perfect way to express your feelings, connect with
              your loved ones, and calculate your compatibility.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn opacity-0"
              style={{ animationDelay: "400ms" }}
            >
              <button
                onClick={() => (window.location.href = "/agreement")}
                className="px-8 py-3 bg-love-500 text-white rounded-full font-inter font-medium hover:bg-love-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => (window.location.href = "/flames")}
                className="px-8 py-3 bg-white text-love-500 rounded-full font-inter font-medium hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-love-200"
              >
                Flames Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Express Love"
              description="Share your feelings with beautiful messages and create lasting connections."
              delay={0}
            />
            <FeatureCard
              title="Private Chat"
              description="Connect privately with your loved ones in our secure chat environment."
              delay={200}
            />
            <FeatureCard
              title="Compatibility Check"
              description="Calculate your compatibility and discover your perfect match."
              delay={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, delay }: { title: string; description: string; delay: number }) => (
  <div 
    className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn opacity-0" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="font-inter text-gray-600">{description}</p>
  </div>
);

export default Index;
