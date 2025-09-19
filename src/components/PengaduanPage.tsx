import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertCircle, FileText, Send, CheckCircle, Clock, Search, Upload, X, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { nagariAPI, ComplaintData, ComplaintCategoryData } from "../services/nagariApi";

export function PengaduanPage() {
  const [formData, setFormData] = useState<ComplaintData>({
    nama_pelapor: '',
    nik_pelapor: '',
    no_hp_pelapor: '',
    email_pelapor: '',
    alamat_pelapor: '',
    kategori_pengaduan_id: 0,
    lokasi_kejadian: '',
    tanggal_kejadian: '',
    keterangan: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [categories, setCategories] = useState<ComplaintCategoryData[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [trackingInput, setTrackingInput] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  // Load complaint categories from API
  useState(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await nagariAPI.getComplaintCategories();
        if (response.success) {
          setCategories(response.data.filter(c => c.is_active));
        }
      } catch (e) {
        console.error('Failed to load complaint categories', e);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  });

  const handleInputChange = (field: keyof ComplaintData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    setFormData(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...files]
    }));
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama_pelapor || !formData.nik_pelapor || !formData.no_hp_pelapor || 
        !formData.alamat_pelapor || !formData.kategori_pengaduan_id || !formData.keterangan) {
      setSubmitError('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const response = await nagariAPI.submitComplaint(formData);
      
  setTrackingCode(response.data.nomor_pengaduan);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        nama_pelapor: '',
        nik_pelapor: '',
        no_hp_pelapor: '',
        email_pelapor: '',
        alamat_pelapor: '',
        kategori_pengaduan_id: 0,
        lokasi_kejadian: '',
        tanggal_kejadian: '',
        keterangan: '',
        attachments: []
      });
      setSelectedFiles([]);
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmitError('Gagal mengirim pengaduan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTracking = async () => {
    if (!trackingInput.trim()) {
      return;
    }

    try {
      setIsTracking(true);
      const response = await nagariAPI.trackComplaint(trackingInput);
      setTrackingResult(response.data);
    } catch (error) {
      console.error('Error tracking complaint:', error);
      setTrackingResult({ error: 'Kode tracking tidak ditemukan' });
    } finally {
      setIsTracking(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'diproses': return 'text-blue-600 bg-blue-100';
      case 'selesai': return 'text-green-600 bg-green-100';
      case 'ditolak': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'diproses': return 'Diproses';
      case 'selesai': return 'Selesai';
      case 'ditolak': return 'Ditolak';
      default: return status;
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Layanan Pengaduan Masyarakat</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sampaikan pengaduan Anda untuk pelayanan yang lebih baik. Setiap pengaduan akan ditindaklanjuti sesuai prosedur yang berlaku.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Pengaduan */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <AlertCircle className="h-6 w-6 mr-3" />
                  Form Pengaduan
                </CardTitle>
                <p className="text-red-100">Isi form berikut untuk menyampaikan pengaduan Anda</p>
              </CardHeader>
              
              <CardContent className="p-6">
                {submitSuccess ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Pengaduan Berhasil Dikirim!</h3>
                    <p className="text-gray-600 mb-4">Kode tracking Anda:</p>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                      <code className="text-lg font-mono font-bold text-primary">{trackingCode}</code>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Simpan kode ini untuk melacak status pengaduan Anda
                    </p>
                    <Button 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6"
                      variant="outline"
                    >
                      Buat Pengaduan Baru
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Data Pelapor */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Data Pelapor</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nama_pelapor">Nama Lengkap *</Label>
                          <Input 
                            id="nama_pelapor"
                            value={formData.nama_pelapor}
                            onChange={(e) => handleInputChange('nama_pelapor', e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nik_pelapor">NIK *</Label>
                          <Input 
                            id="nik_pelapor"
                            value={formData.nik_pelapor}
                            onChange={(e) => handleInputChange('nik_pelapor', e.target.value)}
                            placeholder="16 digit NIK"
                            maxLength={16}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="no_hp_pelapor">No. HP *</Label>
                          <Input 
                            id="no_hp_pelapor"
                            value={formData.no_hp_pelapor}
                            onChange={(e) => handleInputChange('no_hp_pelapor', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email_pelapor">Email</Label>
                          <Input 
                            id="email_pelapor"
                            type="email"
                            value={formData.email_pelapor}
                            onChange={(e) => handleInputChange('email_pelapor', e.target.value)}
                            placeholder="email@contoh.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="alamat_pelapor">Alamat Lengkap *</Label>
                        <Textarea 
                          id="alamat_pelapor"
                          value={formData.alamat_pelapor}
                          onChange={(e) => handleInputChange('alamat_pelapor', e.target.value)}
                          placeholder="Alamat lengkap sesuai KTP"
                          className="mt-1"
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    {/* Detail Pengaduan */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Detail Pengaduan</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="kategori_pengaduan_id">Kategori Pengaduan *</Label>
                          <Select 
                            value={formData.kategori_pengaduan_id ? String(formData.kategori_pengaduan_id) : ''} 
                            onValueChange={(value: string) => handleInputChange('kategori_pengaduan_id' as keyof ComplaintData, value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder={isLoadingCategories ? 'Memuat...' : 'Pilih kategori'} />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="keterangan">Uraian / Keterangan Pengaduan *</Label>
                          <Textarea 
                            id="keterangan"
                            value={formData.keterangan}
                            onChange={(e) => handleInputChange('keterangan', e.target.value)}
                            placeholder="Jelaskan pengaduan Anda secara detail..."
                            className="mt-1"
                            rows={6}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="lokasi_kejadian">Lokasi Kejadian</Label>
                            <Input 
                              id="lokasi_kejadian"
                              value={formData.lokasi_kejadian}
                              onChange={(e) => handleInputChange('lokasi_kejadian', e.target.value)}
                              placeholder="Lokasi tempat kejadian"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tanggal_kejadian">Tanggal Kejadian</Label>
                            <Input 
                              id="tanggal_kejadian"
                              type="date"
                              value={formData.tanggal_kejadian}
                              onChange={(e) => handleInputChange('tanggal_kejadian', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        {/* File Upload */}
                        <div>
                          <Label>Lampiran (Opsional)</Label>
                          <div className="mt-2">
                            <input
                              type="file"
                              id="file-upload"
                              multiple
                              accept="image/*,.pdf,.doc,.docx"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            <Label 
                              htmlFor="file-upload"
                              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                            >
                              <Upload className="h-6 w-6 text-gray-400 mr-2" />
                              <span className="text-gray-600">Klik untuk upload file</span>
                            </Label>
                            
                            {selectedFiles.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {selectedFiles.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {submitError && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-red-700 text-sm">{submitError}</p>
                      </motion.div>
                    )}

                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-8 py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Kirim Pengaduan
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Lacak Pengaduan */}
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-lg">
                  <Search className="h-5 w-5 text-blue-600 mr-2" />
                  Lacak Pengaduan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tracking">Kode Tracking</Label>
                    <Input 
                      id="tracking"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="Masukkan kode tracking"
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleTracking}
                    disabled={isTracking || !trackingInput.trim()}
                    className="w-full"
                    variant="outline"
                  >
                    {isTracking ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Mencari...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Lacak Status
                      </>
                    )}
                  </Button>
                  
                  {trackingResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {trackingResult.error ? (
                        <p className="text-red-600 text-sm">{trackingResult.error}</p>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trackingResult.status)}`}>
                              {getStatusText(trackingResult.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Disubmit: {new Date(trackingResult.submitted_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Informasi */}
            <Card className="shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 text-green-600 mr-2" />
                  Informasi Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Waktu Respon</p>
                      <p>Maksimal 3x24 jam</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Tindak Lanjut</p>
                      <p>Setiap pengaduan akan ditindaklanjuti sesuai prosedur</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Kerahasiaan</p>
                      <p>Data pelapor dijamin kerahasiaannya</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kontak Darurat */}
            <Card className="shadow-lg">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-lg text-red-700">Kontak Darurat</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Polisi:</strong> 110</p>
                  <p><strong>Pemadam:</strong> 113</p>
                  <p><strong>Ambulans:</strong> 118</p>
                  <p><strong>Kantor Nagari:</strong> (0751) 123-456</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}