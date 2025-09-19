import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
<<<<<<< HEAD
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FileText, Clock, CheckCircle, AlertCircle, ArrowLeft, Search, ChevronDown, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import { nagariAPI, ServiceData, ServiceRequestData } from "../services/nagariApi";

export function LayananSuratPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchCounts, setSearchCounts] = useState<Record<number, number>>({});
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    alamat: "",
    pekerjaan: "",
    no_hp: "",
    keperluan: ""
  });

  // Load services from API
  React.useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await nagariAPI.getServices();
        
        if (response.success) {
          setServices(response.data);
        } else {
          setError("Gagal memuat data layanan");
        }
      } catch (err) {
        console.error("Error loading services:", err);
        setError("Terjadi kesalahan saat memuat layanan");
        // Fallback to static data if API fails
        setServices([
          {
            id: 1,
            name: "Surat Keterangan Domisili",
            slug: "surat-keterangan-domisili",
            description: "Surat yang menyatakan tempat tinggal penduduk",
            requirements: [
              "KTP Asli dan Fotocopy",
              "Kartu Keluarga Asli dan Fotocopy",
              "Surat Pengantar RT/RW",
              "Pas Foto 3x4 (2 lembar)"
            ],
            estimated_time: "1-2 Hari Kerja",
            fee: "Gratis"
          },
          {
            id: 2,
            name: "Surat Keterangan Usaha",
            slug: "surat-keterangan-usaha", 
            description: "Surat yang menyatakan bahwa seseorang menjalankan usaha",
            requirements: [
              "KTP Asli dan Fotocopy",
              "Kartu Keluarga Asli dan Fotocopy",
              "Surat Pengantar RT/RW",
              "Foto tempat usaha"
            ],
            estimated_time: "2-3 Hari Kerja",
            fee: "Gratis"
          },
          {
            id: 3,
            name: "Surat Keterangan Kehilangan",
            slug: "surat-keterangan-kehilangan",
            description: "Surat yang menyatakan kehilangan dokumen atau barang",
            requirements: [
              "KTP Asli dan Fotocopy",
              "Surat Keterangan Kehilangan dari Polsek",
              "Kronologi kejadian"
            ],
            estimated_time: "1 Hari Kerja",
            fee: "Gratis"
          },
          {
            id: 4,
            name: "Surat Keterangan Tidak Mampu",
            slug: "surat-keterangan-tidak-mampu",
            description: "Surat yang menyatakan kondisi ekonomi kurang mampu",
            requirements: [
              "KTP Asli dan Fotocopy",
              "Kartu Keluarga Asli dan Fotocopy",
              "Surat Pengantar RT/RW",
              "Surat Keterangan Penghasilan"
            ],
            estimated_time: "1-2 Hari Kerja",
            fee: "Gratis"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // load persisted search counts from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("serviceSearchCounts");
      if (raw) setSearchCounts(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const incrementCount = (id: number) => {
    setSearchCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem("serviceSearchCounts", JSON.stringify(next));
      } catch (e) {
        // ignore storage errors
      }
      return next;
    });
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      alert("Silakan pilih jenis surat terlebih dahulu");
      return;
    }

    try {
      setSubmitting(true);
      
      const requestData: ServiceRequestData = {
        pelayanan_jenis_id: selectedService,
        nama_pemohon: formData.nama,
        nik_pemohon: formData.nik,
        no_hp_pemohon: formData.no_hp,
        alamat_pemohon: formData.alamat,
        keterangan_pemohon: formData.keperluan,
        email_pemohon: "", // Add email field if needed
      };

      const response = await nagariAPI.submitServiceRequest(requestData);
      
      if (response.success) {
        alert(`Permohonan berhasil dikirim! Kode pelacakan: ${response.data.tracking_code}`);
        // Reset form
        setFormData({
          nama: "",
          nik: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          agama: "",
          alamat: "",
          pekerjaan: "",
          no_hp: "",
          keperluan: ""
        });
        setSelectedService(null);
      } else {
        alert("Terjadi kesalahan saat mengirim permohonan");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // debounce input to avoid excessive filtering while typing
  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 150);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Filter services based on debounced search term
  const filteredServices = React.useMemo(() => {
    if (!debouncedSearch) return services;
    return services.filter((service) =>
      service.name.toLowerCase().includes(debouncedSearch) ||
      service.description.toLowerCase().includes(debouncedSearch)
    );
  }, [debouncedSearch, services]);
=======
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
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
<<<<<<< HEAD
      className="w-full min-h-screen bg-gray-50"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
=======
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
          className="w-full mx-auto"
=======
          className="max-w-4xl mx-auto"
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
              <form className="space-y-6" onSubmit={handleSubmit}>
=======
              <form className="space-y-6">
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                {/* Pilih Jenis Surat */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="jenis_surat" className="text-base font-semibold">Jenis Surat yang Diminta *</Label>
<<<<<<< HEAD
                  
                  {loading && (
                    <div className="w-full h-16 mt-3 flex items-center justify-center border rounded-lg bg-gray-50">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                      <span className="ml-2 text-gray-500">Memuat layanan...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="w-full mt-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                  
                  {!loading && !error && (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="w-full">
                      <button
                        type="button"
                        className="w-full h-16 mt-3 flex items-center justify-between border rounded-lg px-4 bg-white text-left text-base shadow-sm"
                        aria-expanded={open}
                      >
                        <span className="truncate">{selectedService ? (services.find(s => s.id === selectedService)?.name) : "Pilih jenis surat yang akan diminta"}</span>
                        <ChevronDown className={`h-5 w-5 opacity-80 ${open ? "rotate-180" : ""}`} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-popover-content-transform-origin] rounded-md border shadow-md outline-hidden w-[min(48rem,95vw)] p-4"
                      align="start"
                    >
                      <div className="p-3 border-b">
                        <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                          <Search className="h-4 w-4 text-gray-400" />
                          <input
                            className="flex-1 bg-transparent outline-none text-sm"
                            placeholder="Cari layanan surat..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Most searched */}
                      <div className="p-3">
                        <div className="text-xs text-gray-500 mb-2">Paling Sering Dicari</div>
                        <div className="flex flex-wrap gap-2">
                          {services
                            .slice()
                            .sort((a, b) => (searchCounts[b.id] || 0) - (searchCounts[a.id] || 0))
                            .slice(0, 4)
                            .map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setSelectedService(s.id);
                                  incrementCount(s.id);
                                  setOpen(false);
                                  setSearchTerm("");
                                }}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
                              >
                                {s.name}
                              </button>
                            ))}
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto">
                        {filteredServices.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500">Tidak ada layanan yang ditemukan</div>
                        ) : (
                          filteredServices.map((service) => (
                            <div
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service.id);
                                incrementCount(service.id);
                                setOpen(false);
                                setSearchTerm("");
                              }}
                              className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                            >
                              <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">{service.name}</div>
                                <div className="text-xs text-gray-500 truncate">{service.description}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  )}
=======
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
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                      {selectedServiceData.name}
=======
                      {selectedServiceData.title}
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                    </h3>
                    <p className="text-blue-800 mb-4">{selectedServiceData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-blue-700">
                        <Clock className="h-4 w-4 mr-2" />
<<<<<<< HEAD
                        <span>Waktu Proses: {selectedServiceData.estimated_time}</span>
=======
                        <span>Waktu Proses: {selectedServiceData.processing_time}</span>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                          <Input 
                            id="nama" 
                            placeholder="Masukkan nama lengkap sesuai KTP" 
                            className="mt-1"
                            value={formData.nama}
                            onChange={(e) => handleInputChange('nama', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nik">NIK *</Label>
                          <Input 
                            id="nik" 
                            placeholder="Nomor Induk Kependudukan (16 digit)" 
                            className="mt-1"
                            value={formData.nik}
                            onChange={(e) => handleInputChange('nik', e.target.value)}
                            maxLength={16}
                            required
                          />
=======
                          <Input id="nama" placeholder="Masukkan nama lengkap sesuai KTP" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="nik">NIK *</Label>
                          <Input id="nik" placeholder="Nomor Induk Kependudukan (16 digit)" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
<<<<<<< HEAD
                          <Input 
                            id="tempat_lahir" 
                            placeholder="Tempat lahir" 
                            className="mt-1"
                            value={formData.tempat_lahir}
                            onChange={(e) => handleInputChange('tempat_lahir', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                          <Input 
                            id="tanggal_lahir" 
                            type="date" 
                            className="mt-1" 
                            value={formData.tanggal_lahir}
                            onChange={(e) => handleInputChange('tanggal_lahir', e.target.value)}
                            required
                          />
=======
                          <Input id="tempat_lahir" placeholder="Tempat lahir" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                          <Input id="tanggal_lahir" type="date" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
<<<<<<< HEAD
                          <Select 
                            onValueChange={(value: string) => handleInputChange('jenis_kelamin', value)} 
                            value={formData.jenis_kelamin}
                          >
=======
                          <Select>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                          <Select 
                            onValueChange={(value: string) => handleInputChange('agama', value)}
                            value={formData.agama}
                          >
=======
                          <Select>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                          value={formData.alamat}
                          onChange={(e) => handleInputChange('alamat', e.target.value)}
                          required
=======
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pekerjaan">Pekerjaan *</Label>
<<<<<<< HEAD
                          <Input 
                            id="pekerjaan" 
                            placeholder="Pekerjaan/Profesi" 
                            className="mt-1" 
                            value={formData.pekerjaan}
                            onChange={(e) => handleInputChange('pekerjaan', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="no_hp">No. HP *</Label>
                          <Input 
                            id="no_hp" 
                            placeholder="Nomor HP aktif" 
                            className="mt-1" 
                            value={formData.no_hp}
                            onChange={(e) => handleInputChange('no_hp', e.target.value)}
                            required
                          />
=======
                          <Input id="pekerjaan" placeholder="Pekerjaan/Profesi" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="no_hp">No. HP *</Label>
                          <Input id="no_hp" placeholder="Nomor HP aktif" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="keperluan">Keperluan Surat *</Label>
                        <Textarea 
                          id="keperluan" 
                          placeholder="Jelaskan secara detail keperluan surat yang diminta" 
                          rows={3}
                          className="mt-1"
<<<<<<< HEAD
                          value={formData.keperluan}
                          onChange={(e) => handleInputChange('keperluan', e.target.value)}
                          required
=======
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4 mr-2" />
                              Ajukan Permohonan
                            </>
                          )}
=======
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ajukan Permohonan
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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