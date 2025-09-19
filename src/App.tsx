import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProfilPage } from "./components/ProfilPage";
import { BeritaPage } from "./components/BeritaPage";
import { LayananSuratPage } from "./components/LayananSuratPage";
import { GISPage } from "./components/GISPage";
import { IDMPage } from "./components/IDMPage";
import { PPIDPage } from "./components/PPIDPage";
import { KontakPage } from "./components/KontakPage";
import { AIChat } from "./components/AIChat";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "profil":
        return <ProfilPage />;
      case "berita":
        return <BeritaPage />;
      case "layanan":
        return <LayananSuratPage />;
      case "gis":
        return <GISPage />;
      case "transparansi":
        return <IDMPage />;
      case "ppid":
        return <PPIDPage />;
      case "kontak":
        return <KontakPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Animated Background Elements */}
      <div className="floating-shapes"></div>
      
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {renderPage()}
      </motion.main>

      {/* AI Chat Assistant */}
      <AIChat />
    </div>
  );
}