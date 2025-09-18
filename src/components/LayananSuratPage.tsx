import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FileText, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function LayananSuratPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "domisili",
      title: "Surat Keterangan Domisili",
      description: "Surat yang menyatakan tempat tinggal penduduk",
      requirements: [
        "KTP Asli dan Fotocopy",
        "Kartu Keluarga Asli dan Fotocopy",
        "Surat Pengantar RT/RW",
        "Pas Foto 3x4 (2 lembar)"
      ],
      processing_time: "1-2 Hari Kerja",
      fee: "Gratis"
    },
    {
      id: "usaha",
      title: "Surat Keterangan Usaha",
      description: "Surat yang menyatakan bahwa seseorang menjalankan usaha",
      requirements: [
        "KTP Asli dan Fotocopy",
        "Kartu Keluarga Asli dan Fotocopy",
        "Surat Pengantar RT/RW",
        "Foto tempat usaha"
      ],
      processing_time: "2-3 Hari Kerja",
      fee: "Gratis"
    },
    {
      id: "kehilangan",
      title: "Surat Keterangan Kehilangan",
      description: "Surat yang menyatakan kehilangan dokumen atau barang",
      requirements: [
        "KTP Asli dan Fotocopy",
        "Surat Keterangan Kehilangan dari Polsek",
        "Kronologi kejadian"
      ],
      processing_time: "1 Hari Kerja",
      fee: "Gratis"
    },
    {
      id: "tidak_mampu",
      title: "Surat Keterangan Tidak Mampu",
      description: "Surat yang menyatakan kondisi ekonomi kurang mampu",
      requirements: [
        "KTP Asli dan Fotocopy",
        "Kartu Keluarga Asli dan Fotocopy",
        "Surat Pengantar RT/RW",
        "Surat Keterangan Penghasilan"
      ],
      processing_time: "1-2 Hari Kerja",
      fee: "Gratis"
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Layanan Surat Menyurat</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Layanan pembuatan berbagai surat keterangan untuk keperluan administrasi masyarakat
          </p>
        </motion.div>

        {/* Form Permohonan dengan Dropdown */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                Form Permohonan Surat
              </CardTitle>
              <p className="text-green-100">Silakan lengkapi form berikut untuk mengajukan permohonan surat</p>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Pilih Jenis Surat */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="jenis_surat" className="text-base font-semibold">Jenis Surat yang Diminta *</Label>
                  <Select onValueChange={setSelectedService}>
                    <SelectTrigger className="mt-2 h-12">
                      <SelectValue placeholder="Pilih jenis surat yang akan diminta" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            {service.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Info Surat yang Dipilih */}
                {selectedService && selectedServiceData && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-50 p-6 rounded-lg border border-blue-200"
                  >
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {selectedServiceData.title}
                    </h3>
                    <p className="text-blue-800 mb-4">{selectedServiceData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-blue-700">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Waktu Proses: {selectedServiceData.processing_time}</span>
                      </div>
                      <div className="flex items-center text-blue-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Biaya: {selectedServiceData.fee}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedService && (
                  <>
                    {/* Data Pemohon */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Data Pemohon</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nama">Nama Lengkap *</Label>
                          <Input id="nama" placeholder="Masukkan nama lengkap sesuai KTP" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="nik">NIK *</Label>
                          <Input id="nik" placeholder="Nomor Induk Kependudukan (16 digit)" className="mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
                          <Input id="tempat_lahir" placeholder="Tempat lahir" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                          <Input id="tanggal_lahir" type="date" className="mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laki-laki">Laki-laki</SelectItem>
                              <SelectItem value="perempuan">Perempuan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="agama">Agama *</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Pilih agama" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="islam">Islam</SelectItem>
                              <SelectItem value="kristen">Kristen</SelectItem>
                              <SelectItem value="katolik">Katolik</SelectItem>
                              <SelectItem value="hindu">Hindu</SelectItem>
                              <SelectItem value="buddha">Buddha</SelectItem>
                              <SelectItem value="konghucu">Konghucu</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="alamat">Alamat Lengkap *</Label>
                        <Textarea 
                          id="alamat" 
                          placeholder="Masukkan alamat lengkap sesuai KTP" 
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pekerjaan">Pekerjaan *</Label>
                          <Input id="pekerjaan" placeholder="Pekerjaan/Profesi" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="no_hp">No. HP *</Label>
                          <Input id="no_hp" placeholder="Nomor HP aktif" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="keperluan">Keperluan Surat *</Label>
                        <Textarea 
                          id="keperluan" 
                          placeholder="Jelaskan secara detail keperluan surat yang diminta" 
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </motion.div>

                    {/* Persyaratan */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-yellow-50 p-6 rounded-lg border border-yellow-200"
                    >
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Persyaratan yang Harus Dipenuhi
                      </h3>
                      <ul className="space-y-2">
                        {selectedServiceData?.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-yellow-800">
                            <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-yellow-100 rounded text-sm text-yellow-800">
                        <strong>Catatan:</strong> Pastikan semua dokumen persyaratan sudah disiapkan sebelum mengajukan permohonan. 
                        Dokumen yang tidak lengkap akan memperlambat proses pengajuan.
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedService(null)}
                          className="w-full sm:w-auto"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Reset Form
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit"
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-8"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ajukan Permohonan
                        </Button>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}