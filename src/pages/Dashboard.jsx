import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../config/supabase";
import logoImg from "../assets/wonline2023.png";

export default function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [totalReferences, setTotalReferences] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Referans sayısını al
    const fetchTotalReferences = async () => {
      const { count, error } = await supabase
        .from("wonlinemenu_references")
        .select("*", { count: "exact" });

      if (!error) {
        setTotalReferences(count);
      }
    };

    fetchTotalReferences();

    // Scroll event listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  src={logoImg}
                  alt="Wonline Logo"
                  onClick={() =>
                    window.open(
                      "https://melihcandemir.github.io/wonlinemenureferans/",
                      "_blank"
                    )
                  }
                  title="Ana sayfaya git"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin/references")}
                className="text-sm text-white bg-green-700 hover:bg-green-800 border rounded-md mx-1 px-1.5 py-1 ml-1"
              >
                Referanslar
              </button>
              <button
                onClick={() => signOut()}
                className="text-sm text-white bg-red-600 hover:bg-red-700 border rounded-md mx-1 px-1.5 py-1"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Toplam Referans
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {totalReferences}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          title="Başa dön"
        >
          ↑
        </button>
      )}
    </div>
  );
}
