import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Agreement = () => {
  const [newTitle, setNewTitle] = useState("");
  const [agreements, setAgreements] = useState([]);

  // Simulated user (no authentication)
  const userName = localStorage.getItem("userName"); // Change to "Jane" for female user
  const isMale = userName == "John";
  const isFemale = userName == "Jane";
  console.log(isMale)
  // Fetch Agreements
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "agreement"));
        const agreementsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgreements(agreementsData);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };
    fetchAgreements();
  }, []);

  // Create Agreement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter an agreement title");
      return;
    }

    const newAgreement = {
      title: newTitle.trim(),
      date: new Date().toISOString().split("T")[0],
      maleAccepted: false,
      femaleAccepted: false,
      locked: false,
    };

    try {
      const docRef = await addDoc(collection(db, "agreement"), newAgreement);
      setAgreements([...agreements, { id: docRef.id, ...newAgreement }]);
      setNewTitle("");
      toast.success("Agreement created successfully ❤️");
    } catch (error) {
      console.error("Error creating agreement:", error);
    }
  };

  // Toggle Agreement Acceptance
  const toggleAgreement = async (agreementId, isMaleCheckbox) => {
    try {
      const agreementRef = doc(db, "agreement", agreementId);
      const agreement = agreements.find((a) => a.id === agreementId);

      if (!agreement || agreement.locked) {
        toast.error("This agreement is already locked");
        return;
      }

      // Ensure only John can toggle maleAccepted and only Jane can toggle femaleAccepted
      if ((isMale && !isMaleCheckbox) || (isFemale && isMaleCheckbox)) {
        toast.error("You can only update your own checkbox!");
        return;
      }

      const updatedAgreement = {
        ...agreement,
        maleAccepted: isMale ? !agreement.maleAccepted : agreement.maleAccepted,
        femaleAccepted: isFemale
          ? !agreement.femaleAccepted
          : agreement.femaleAccepted,
      };

      // Lock agreement if both parties accept
      if (updatedAgreement.maleAccepted && updatedAgreement.femaleAccepted) {
        updatedAgreement.locked = true;
      }

      await updateDoc(agreementRef, updatedAgreement);

      setAgreements(
        agreements.map((a) => (a.id === agreementId ? updatedAgreement : a))
      );
      toast.success("Agreement status updated");
    } catch (error) {
      console.error("Error updating agreement:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold text-center text-gray-900 mb-8 animate-fadeIn">
          Love Agreement
        </h1>
        <div className="max-w-md mx-auto bg-green-400 rounded-2xl shadow-xl p-3 mb-8 animate-fadeIn">
          <h2 className="text-center font-playfair text-2xl font-semibold text-white">
             {userName}
          </h2>
        </div>

        {/* New Agreement Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-playfair text-lg font-medium text-gray-900">
                Create New Agreement
              </label>
              <Textarea
                placeholder="Enter agreement title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="min-h-[100px] font-inter"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-love-500 hover:bg-love-600 text-white font-medium py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Create Agreement
            </Button>
          </form>
        </div>

        {/* Existing Agreements */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
          <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
            Existing Agreements
          </h2>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-playfair">Title</TableHead>
                  <TableHead className="w-32 text-center font-playfair">
                    Date
                  </TableHead>
                  <TableHead className="w-48 text-center font-playfair">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agreements.map((agreement) => (
                  <TableRow key={agreement.id}>
                    <TableCell className="font-medium">
                      {agreement.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {agreement.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={agreement.maleAccepted}
                            onCheckedChange={() =>
                              toggleAgreement(agreement.id, true)
                            }
                            disabled={agreement.locked || !isMale}
                            className={`h-5 w-5 ${
                              agreement.maleAccepted
                                ? "bg-green-500 border-green-500"
                                : ""
                            }`}
                          />
                          <span className="text-sm font-medium">John</span>

                          <Checkbox
                            checked={agreement.femaleAccepted}
                            onCheckedChange={() =>
                              toggleAgreement(agreement.id, false)
                            }
                            disabled={agreement.locked || !isFemale}
                            className={`h-5 w-5 ${
                              agreement.femaleAccepted
                                ? "bg-green-500 border-green-500"
                                : ""
                            }`}
                          />
                          <span className="text-sm font-medium">Jane</span>
                        </div>
                      </div>
                      {agreement.locked && (
                        <p className="text-center text-green-600 font-semibold mt-2">
                          ✅ Both Accepted
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
