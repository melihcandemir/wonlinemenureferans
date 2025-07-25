import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../config/supabase";
import logoImg from "../assets/wonline2023.png";

export default function References() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReference, setNewReference] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchReferences();

    // Scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchReferences = async () => {
    try {
      const { data, error } = await supabase
        .from("wonlinemenu_references")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setReferences(data);
    } catch (error) {
      console.error("Error fetching references:", error);
    } finally {
      setLoading(false);
    }
  };

  const addReference = async (e) => {
    e.preventDefault();

    // Boş değer kontrolü
    if (!newReference.trim()) {
      setError("Referans alanı boş bırakılamaz!");
      return;
    }

    try {
      const now = new Date().toISOString();
      const { error } = await supabase.from("wonlinemenu_references").insert([
        {
          referans: newReference.trim(),
          created_at: now,
          updated_at: now,
        },
      ]);

      if (error) throw error;

      setNewReference("");
      setError(null); // Başarılı olduğunda hata mesajını temizle
      fetchReferences();
    } catch (error) {
      setError("Referans eklenirken bir hata oluştu: " + error.message);
    }
  };

  const deleteReference = async (id) => {
    // Silme onayı iste
    const confirmed = window.confirm(
      "Bu referansı silmek istediğinizden emin misiniz?"
    );

    if (!confirmed) {
      return; // Kullanıcı iptal etti
    }

    try {
      const { error } = await supabase
        .from("wonlinemenu_references")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setError(null); // Başarılı olduğunda hata mesajını temizle
      fetchReferences();
    } catch (error) {
      setError("Referans silinirken bir hata oluştu: " + error.message);
    }
  };

  const startEditing = (ref) => {
    setEditingId(ref.id);
    setEditingValue(ref.referans);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingValue("");
    setError(null); // İptal edildiğinde hata mesajını temizle
  };

  const updateReference = async (id) => {
    // Boş değer kontrolü
    if (!editingValue.trim()) {
      setError("Referans alanı boş bırakılamaz!");
      return;
    }

    try {
      const { error } = await supabase
        .from("wonlinemenu_references")
        .update({
          referans: editingValue.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      setEditingId(null);
      setEditingValue("");
      setError(null); // Başarılı olduğunda hata mesajını temizle
      fetchReferences();
    } catch (error) {
      setError("Referans güncellenirken bir hata oluştu: " + error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={logoImg} alt="Wonline Logo" />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="text-sm text-white bg-green-700 hover:bg-green-800 border rounded-md mx-1 px-1.5 py-1 ml-1"
              >
                Dashboard
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
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={addReference} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newReference}
                onChange={(e) => setNewReference(e.target.value)}
                placeholder="Yeni referans ekle (wonline.com)"
                className="flex-1 shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-indigo-500 rounded-md px-2"
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ekle
              </button>
            </div>
          </form>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {references.map((ref) => (
                <li
                  key={ref.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  {editingId === ref.id ? (
                    <div className="flex-1 flex items-center space-x-4">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="flex-1 shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-indigo-500 rounded-md px-2"
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateReference(ref.id)}
                          className="text-sm text-white bg-green-600 hover:bg-green-700 border rounded-md mx-1 px-2 py-1 ml-1"
                        >
                          Kaydet
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-sm text-white bg-red-600 hover:bg-red-700 border rounded-md mx-1 px-2 py-1 ml-1"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-medium text-gray-900">
                        {ref.referans}
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => startEditing(ref)}
                          className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 border rounded-md mx-1 px-2 py-1 ml-1"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => deleteReference(ref.id)}
                          className="text-sm text-white bg-red-600 hover:bg-red-700 border rounded-md mx-1 px-2 py-1 ml-1"
                        >
                          Sil
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Yukarı çık"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
