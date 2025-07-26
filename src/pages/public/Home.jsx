import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import logoImg from "../../assets/wonline2023.png";

export default function Home() {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    loadReferences();
    // Her 5 dakikada bir güncelle
    const interval = setInterval(loadReferences, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function loadReferences() {
    const { data, error } = await supabase
      .from("wonlinemenu_references")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error loading references:", error);
      return;
    }

    setReferences(data);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img
              src={logoImg}
              alt="Wonline Logo"
              className="w-[480px] md:w-[640px] h-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-center text-gray-800 mb-3">
            Referans Listesi
          </h1>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-3">
              {references.map((ref) => (
                <li
                  key={ref.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <a
                    href={`https://${ref.referans}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800 flex items-center justify-between"
                  >
                    <span>{ref.referans}</span>
                    <span className="text-green-700">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 Wonline Menu. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://wonlinemenu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-700 transition-colors duration-300"
              >
                wonlinemenu.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
