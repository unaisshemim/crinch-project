import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Agreement from "./pages/Agreement";
import Chat from "./pages/Chat";
import Flames from "./pages/Flames";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TaskAssign from "./pages/TaskAssign";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isSingle, setIsSingle] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Navigation isSingle={isSingle} />
          <main className="pt-16">
            <Routes>
              <Route path="/home" element={<Index />} />
              <Route
                path="/"
                element={<Auth isSingle={isSingle} setIsSingle={setIsSingle} />}
              />
              <Route path="/agreement" element={<Agreement />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/flames" element={<Flames />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/task" element={<TaskAssign />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );};

export default App;