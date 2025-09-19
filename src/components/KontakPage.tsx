import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, MessageSquare, Send, ExternalLink, Navigation, Users, Building2, Globe } from "lucide-react";
import { motion } from "motion/react";

export function KontakPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Kontak Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut atau sampaikan saran dan kritik untuk kemajuan nagari
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Kirim Pesan
                </CardTitle>
                <p className="text-green-100">Sampaikan pesan, saran, atau kritik Anda kepada kami</p>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="nama">Nama Lengkap *</Label>
                      <Input id="nama" placeholder="Masukkan nama lengkap" className="mt-1" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="email@contoh.com" className="mt-1" />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="telepon">No. Telepon</Label>
                      <Input id="telepon" placeholder="08xxxxxxxxxx" className="mt-1" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label htmlFor="kategori">Kategori Pesan *</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Pilih kategori pesan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informasi">Permintaan Informasi</SelectItem>
                          <SelectItem value="pengaduan">Pengaduan</SelectItem>
                          <SelectItem value="saran">Saran</SelectItem>
                          <SelectItem value="kritik">Kritik</SelectItem>
                          <SelectItem value="layanan">Layanan Publik</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Label htmlFor="subjek">Subjek *</Label>
                    <Input id="subjek" placeholder="Subjek pesan" className="mt-1" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Label htmlFor="pesan">Pesan *</Label>
                    <Textarea 
                      id="pesan" 
                      placeholder="Tulis pesan Anda di sini..." 
                      rows={6}
                      className="mt-1"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Informasi Kontak */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Alamat Kantor</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Jl. Nagari No. 123<br />
                      Kec. Contoh, Kab. Contoh<br />
                      Sumatera Barat 26xxx
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Telepon & Fax</h4>
                    <p className="text-gray-600">Telepon: (0751) 123-456</p>
                    <p className="text-gray-600">Fax: (0751) 123-457</p>
                    <p className="text-gray-600">HP: 0812-3456-7890</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@nagaricontoh.go.id</p>
                    <p className="text-gray-600">ppid@nagaricontoh.go.id</p>
                    <p className="text-gray-600">wali@nagaricontoh.go.id</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Clock className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Jam Operasional</h4>
                    <p className="text-gray-600">Senin - Kamis: 08.00 - 15.30 WIB</p>
                    <p className="text-gray-600">Jumat: 08.00 - 11.30 WIB</p>
                    <p className="text-gray-600 text-red-600">Sabtu - Minggu: Tutup</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Pejabat Utama */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  Pejabat Utama
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-gray-900">Wali Nagari</h4>
                    <p className="text-gray-600">H. Ahmad Syukri, S.Sos</p>
                    <p className="text-sm text-gray-500">wali@nagaricontoh.go.id</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900">Sekretaris Nagari</h4>
                    <p className="text-gray-600">Dra. Siti Aminah</p>
                    <p className="text-sm text-gray-500">sekretaris@nagaricontoh.go.id</p>
                  </div>
                  <div className="border-l-4 border-green-300 pl-4">
                    <h4 className="font-semibold text-gray-900">Kaur Pemerintahan</h4>
                    <p className="text-gray-600">Budi Santoso, S.AP</p>
                    <p className="text-sm text-gray-500">pemerintahan@nagaricontoh.go.id</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Sosial */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  Media Sosial & Online
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <Facebook className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <span className="font-medium">Facebook</span>
                        <p className="text-sm text-gray-600">@NagariContohOfficial</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-200">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Kunjungi
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <Instagram className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <span className="font-medium">Instagram</span>
                        <p className="text-sm text-gray-600">@nagari_contoh</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-200">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Kunjungi
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <span className="font-medium">WhatsApp</span>
                        <p className="text-sm text-gray-600">0812-3456-7890</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-200">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Lokasi & Peta */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <Navigation className="h-5 w-5 text-primary mr-2" />
                  Lokasi Kantor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  <motion.div 
                    className="text-center text-gray-600"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="h-16 w-16 mx-auto mb-3 text-primary" />
                    </motion.div>
                    <p className="font-medium">Peta Interaktif</p>
                    <p className="text-sm opacity-75">Klik tombol di bawah untuk melihat lokasi</p>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </motion.div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <strong>Petunjuk Arah:</strong> Kantor Nagari Contoh terletak di pusat nagari, 
                  sekitar 500m dari Pasar Tradisional Contoh dan mudah dijangkau dengan kendaraan umum.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Pertanyaan yang Sering Diajukan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Bagaimana cara mengurus surat keterangan?</h4>
                    <p className="text-sm text-gray-600">Silakan kunjungi halaman Layanan atau datang langsung ke kantor nagari dengan membawa persyaratan yang diperlukan.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Apakah ada biaya untuk layanan surat?</h4>
                    <p className="text-sm text-gray-600">Semua layanan surat keterangan di nagari ini gratis, sesuai dengan peraturan yang berlaku.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Berapa lama proses pembuatan surat?</h4>
                    <p className="text-sm text-gray-600">Waktu proses bervariasi dari 1-3 hari kerja tergantung jenis surat dan kelengkapan dokumen.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Bagaimana cara menyampaikan pengaduan?</h4>
                    <p className="text-sm text-gray-600">Anda dapat menyampaikan pengaduan melalui form kontak di atas, datang langsung, atau melalui media sosial resmi.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}