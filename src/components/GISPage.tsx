import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MapPin, Layers, Home, Building2, Trees, MapIcon, Info, Maximize } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function GISPage() {
  const [selectedLayer, setSelectedLayer] = useState("all");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const mapLayers = [
    { id: "all", name: "Semua Layer", icon: <Layers className="h-4 w-4" />, color: "bg-gray-500" },
    { id: "administrative", name: "Batas Wilayah", icon: <MapIcon className="h-4 w-4" />, color: "bg-blue-500" },
    { id: "buildings", name: "Bangunan", icon: <Building2 className="h-4 w-4" />, color: "bg-red-500" },
    { id: "residential", name: "Permukiman", icon: <Home className="h-4 w-4" />, color: "bg-green-500" },
    { id: "forest", name: "Hutan & Lahan", icon: <Trees className="h-4 w-4" />, color: "bg-emerald-600" },
  ];

  const statisticsData = [
    { label: "Luas Total", value: "45.2 km²", icon: <MapIcon className="h-5 w-5" /> },
    { label: "Jumlah Jorong", value: "4 Jorong", icon: <MapPin className="h-5 w-5" /> },
    { label: "Permukiman", value: "12.8 km²", icon: <Home className="h-5 w-5" /> },
    { label: "Hutan", value: "18.5 km²", icon: <Trees className="h-5 w-5" /> },
    { label: "Lahan Pertanian", value: "13.9 km²", icon: <Building2 className="h-5 w-5" /> },
  ];

  const poiData = [
    { id: 1, name: "Kantor Nagari", category: "Pemerintahan", coordinates: "0.234, 100.567", status: "Aktif" },
    { id: 2, name: "Balai Nagari", category: "Fasilitas Umum", coordinates: "0.235, 100.568", status: "Aktif" },
    { id: 3, name: "SD Negeri 01", category: "Pendidikan", coordinates: "0.236, 100.569", status: "Aktif" },
    { id: 4, name: "Puskesmas Pembantu", category: "Kesehatan", coordinates: "0.237, 100.570", status: "Aktif" },
    { id: 5, name: "Masjid Besar", category: "Ibadah", coordinates: "0.238, 100.571", status: "Aktif" },
    { id: 6, name: "Pasar Nagari", category: "Ekonomi", coordinates: "0.239, 100.572", status: "Aktif" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sistem Informasi Geografis (SIG) Nagari
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Peta digital dan informasi spasial Nagari Contoh untuk mendukung perencanaan dan pengelolaan wilayah
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {statisticsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-primary mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    Peta Interaktif Nagari Contoh
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Layer Controls */}
                  <div className="absolute top-4 left-4 z-10 space-y-2">
                    {mapLayers.map((layer) => (
                      <motion.div
                        key={layer.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={selectedLayer === layer.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedLayer(layer.id)}
                          className="text-xs"
                        >
                          <div className={`w-3 h-3 rounded-full ${layer.color} mr-2`}></div>
                          {layer.icon}
                          <span className="ml-1">{layer.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-8 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="border border-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.01 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Animated Elements */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    />

                    {/* Map Content */}
                    <div className="text-center z-10">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Peta Digital Nagari Contoh
                      </h3>
                      <p className="text-gray-600">
                        Peta interaktif dengan berbagai layer informasi spasial
                      </p>
                      <Badge className="mt-2">
                        Layer Aktif: {mapLayers.find(l => l.id === selectedLayer)?.name}
                      </Badge>
                    </div>

                    {/* Coordinates Display */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs">
                      Koordinat: 0.234°S, 100.567°E
                    </div>
                  </div>

                  {/* Map Legend */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Legenda:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-xs">Fasilitas Pemerintahan</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs">Fasilitas Umum</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs">Area Permukiman</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                        <span className="text-xs">Hutan & Konservasi</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-xs">Lahan Pertanian</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-xs">Area Komersial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Layer Control */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontrol Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mapLayers.map((layer, index) => (
                    <motion.div
                      key={layer.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Button
                        variant={selectedLayer === layer.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLayer(layer.id)}
                        className="w-full justify-start"
                      >
                        <div className={`w-3 h-3 rounded-full ${layer.color} mr-2`}></div>
                        {layer.icon}
                        <span className="ml-2">{layer.name}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Points of Interest */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Points of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="facilities" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="facilities" className="space-y-3 mt-4">
                    {poiData.slice(0, 4).map((poi, index) => (
                      <motion.div
                        key={poi.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{poi.name}</h4>
                            <p className="text-xs text-gray-600">{poi.category}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {poi.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{poi.coordinates}</p>
                      </motion.div>
                    ))}
                  </TabsContent>
                  <TabsContent value="info" className="mt-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="space-y-3"
                    >
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Info className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium">Informasi Peta</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Data peta diperbarui setiap bulan berdasarkan survei lapangan dan citra satelit terbaru.
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>• Datum: WGS84</p>
                        <p>• Proyeksi: UTM Zone 47S</p>
                        <p>• Skala: 1:10,000</p>
                        <p>• Update: September 2024</p>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MapIcon className="h-4 w-4 mr-2" />
                    Unduh Peta PDF
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Layers className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Info className="h-4 w-4 mr-2" />
                    Panduan Penggunaan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}