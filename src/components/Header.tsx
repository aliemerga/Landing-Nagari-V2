import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'home', label: 'Home' },
    { key: 'profil', label: 'Profil Desa' },
    { key: 'berita', label: 'Berita' },
    { key: 'layanan', label: 'Layanan' },
    { key: 'pengaduan', label: 'Pengaduan' },
    { key: 'gis', label: 'Web GIS' },
    { key: 'transparansi', label: 'Transparansi' },
    { key: 'ppid', label: 'PPID' },
    { key: 'kontak', label: 'Kontak' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">N</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Nagari</h1>
              <p className="text-xs text-gray-600">Portal Informasi</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-full px-2 py-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={currentPage === item.key ? "default" : "ghost"}
                  onClick={() => onNavigate(item.key)}
                  className={`text-sm transition-all duration-300 rounded-full px-4 ${
                    currentPage === item.key 
                      ? "bg-primary text-white shadow-lg scale-105" 
                      : "hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden rounded-full bg-gray-50/80 backdrop-blur-sm hover:bg-white/80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t"
          >
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={currentPage === item.key ? "default" : "ghost"}
                    onClick={() => {
                      onNavigate(item.key);
                      setIsMenuOpen(false);
                    }}
                    className="justify-start w-full"
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}