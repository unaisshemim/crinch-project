import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Auth = ({ isSingle, setIsSingle }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Store the name in session storage
    sessionStorage.setItem("userName", name.trim());
    localStorage.setItem("userName", name.trim());
    toast.success("Welcome, " + name + "! ❤️");
    navigate("/home");
  };

  console.log(isSingle, "---");

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-secondary/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 text-love-500 mx-auto mb-4 animate-pulse-slow" />
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
              Welcome to Valentine's Love
            </h1>
            <p className="font-inter text-gray-600">
              Enter your name to begin your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full font-inter"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-3 items-center justify-between space-x-2">
              <div>
                <Switch
                  checked={isSingle} // Bind the Switch state
                  onCheckedChange={(checked) => setIsSingle(checked)}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">
                  {isSingle ? "single" : "commited"}
                </Label>
              </div>
              {isSingle ? (
                <div>
                  <img
                    className="w-28 h-28 rounded-xl object-cover"
                    src="https://media.tenor.com/wnFKruwq08YAAAAM/holding-hands-solo.gif"
                    alt="image"
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="w-28 h-28 rounded-xl object-cover"
                    src="https://media.tenor.com/qydbTtr_gEwAAAAM/kikai-sentai-zenkaiger-episode4.gif"
                    alt="image"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-love-500 hover:bg-love-600 text-white font-medium py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Continue to Love
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
