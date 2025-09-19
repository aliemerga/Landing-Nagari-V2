import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
<<<<<<< HEAD
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, MessageSquare, Send, ExternalLink, Navigation, Users, Building2, Globe, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { nagariAPI, SiteSettingsData, ComplaintData } from "../services/nagariApi";

export function KontakPage() {
  // State management for site settings
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // State for contact form
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    kategori: '',
    subjek: '',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Handle form input change
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus) setSubmitStatus(null); // Clear status on new input
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const complaintData: ComplaintData = {
        nama_pelapor: formData.nama,
        nik_pelapor: '0000000000000000', // NIK is required, but not in form. Using a placeholder.
        no_hp_pelapor: formData.telepon,
        email_pelapor: formData.email,
        alamat_pelapor: 'Alamat tidak diisi', // Alamat is required, but not in form.
        kategori_pengaduan_id: 1, // Placeholder category ID
        lokasi_kejadian: 'Tidak disebutkan', // Placeholder
        tanggal_kejadian: new Date().toISOString().split('T')[0],
        keterangan: `Kategori: ${formData.kategori}\nSubjek: ${formData.subjek}\n\nPesan:\n${formData.pesan}`,
      };

      const response = await nagariAPI.submitComplaint(complaintData);

      if (response.success) {
        setSubmitStatus({ success: true, message: 'Pesan Anda berhasil terkirim. Terima kasih!' });
        // Reset form
        setFormData({
          nama: '',
          email: '',
          telepon: '',
          kategori: '',
          subjek: '',
          pesan: ''
        });
      } else {
        setSubmitStatus({ success: false, message: response.message || 'Gagal mengirim pesan. Silakan coba lagi.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: 'Terjadi kesalahan pada server. Mohon coba beberapa saat lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch site settings from API
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        setIsLoadingSettings(true);
        setSettingsError(null);
        const response = await nagariAPI.getSiteSettings();
        setSiteSettings(response.data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
        setSettingsError('Failed to load site settings');
        // Fallback to static data
        setSiteSettings({
          site_title: "Nagari Contoh",
            site_description: "Portal Informasi Nagari Contoh",
            contact_info: {
              email: "info@nagaricontoh.go.id",
              phone: "(0751) 123-456",
              address: "Jl. Nagari No. 123, Kec. Contoh, Kab. Contoh, Sumatera Barat 26xxx"
            },
            social_media: {
              facebook: "https://facebook.com/NagariContohOfficial",
              instagram: "https://instagram.com/nagari_contoh",
            },
            office_hours: {
              weekdays: "08.00 - 15.30 WIB",
              saturday: "Tutup",
              sunday: "Tutup"
            }
        });
      } finally {
        setIsLoadingSettings(false);
      }
    };

    fetchSiteSettings();
  }, []);
=======
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, MessageSquare, Send, ExternalLink, Navigation, Users, Building2, Globe } from "lucide-react";
import { motion } from "motion/react";

export function KontakPage() {
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                <form className="space-y-6" onSubmit={handleSubmit}>
=======
                <form className="space-y-6">
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="nama">Nama Lengkap *</Label>
<<<<<<< HEAD
                      <Input id="nama" placeholder="Masukkan nama lengkap" className="mt-1" value={formData.nama} onChange={e => handleInputChange('nama', e.target.value)} required />
=======
                      <Input id="nama" placeholder="Masukkan nama lengkap" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="email">Email *</Label>
<<<<<<< HEAD
                      <Input id="email" type="email" placeholder="email@contoh.com" className="mt-1" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required />
=======
                      <Input id="email" type="email" placeholder="email@contoh.com" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="telepon">No. Telepon</Label>
<<<<<<< HEAD
                      <Input id="telepon" placeholder="08xxxxxxxxxx" className="mt-1" value={formData.telepon} onChange={e => handleInputChange('telepon', e.target.value)} />
=======
                      <Input id="telepon" placeholder="08xxxxxxxxxx" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label htmlFor="kategori">Kategori Pesan *</Label>
<<<<<<< HEAD
                      <Select onValueChange={(value: string) => handleInputChange('kategori', value)} value={formData.kategori}>
=======
                      <Select>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                    <Input id="subjek" placeholder="Subjek pesan" className="mt-1" value={formData.subjek} onChange={e => handleInputChange('subjek', e.target.value)} required />
=======
                    <Input id="subjek" placeholder="Subjek pesan" className="mt-1" />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                      value={formData.pesan}
                      onChange={e => handleInputChange('pesan', e.target.value)}
                      required
                    />
                  </motion.div>

                  {/* Submission Status */}
                  {submitStatus && (
                    <div className={`p-4 rounded-md text-sm ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {submitStatus.message}
                    </div>
                  )}
=======
                    />
                  </motion.div>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
<<<<<<< HEAD
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Kirim Pesan
                        </>
                      )}
=======
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                {isLoadingSettings ? (
                  // Loading skeleton
                  <div className="space-y-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-5 w-5 bg-gray-200 animate-pulse rounded mr-3 mt-1" />
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 animate-pulse rounded w-32 mb-2" />
                          <div className="space-y-1">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : settingsError ? (
                  // Error state
                  <div className="flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <Loader2 className="h-8 w-8 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Gagal memuat informasi kontak</p>
                      <p className="text-sm">{settingsError}</p>
                    </div>
                  </div>
                ) : !siteSettings ? (
                  // No data state
                  <div className="flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <Phone className="h-8 w-8 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Informasi kontak tidak tersedia</p>
                    </div>
                  </div>
                ) : (
                  // Actual contact data
                  <>
                    <motion.div 
                      className="flex items-start group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Alamat Kantor</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {siteSettings.contact_info.address}
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
                        <p className="text-gray-600">Telepon: {siteSettings.contact_info.phone}</p>
                        <p className="text-gray-600">Fax: {siteSettings.contact_info.fax || '(0751) 123-457'}</p>
                        <p className="text-gray-600">HP: {siteSettings.contact_info.mobile || '0812-3456-7890'}</p>
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
                        <p className="text-gray-600">{siteSettings.contact_info.email}</p>
                        <p className="text-gray-600">{siteSettings.contact_info.secondary_email || 'ppid@nagaricontoh.go.id'}</p>
                        <p className="text-gray-600">{siteSettings.contact_info.head_email || 'wali@nagaricontoh.go.id'}</p>
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
                        <p className="text-gray-600">Senin - Jumat: {siteSettings.office_hours?.weekdays || '08.00 - 15.30 WIB'}</p>
                        <p className="text-gray-600">Sabtu: {siteSettings.office_hours?.saturday || 'Tutup'}</p>
                        <p className="text-gray-600 text-red-600">Minggu: {siteSettings.office_hours?.sunday || 'Tutup'}</p>
                      </div>
                    </motion.div>
                  </>
                )}
=======
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
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                        <p className="text-sm text-gray-600">@{siteSettings?.social_media?.facebook?.split('/').pop() || 'NagariContohOfficial'}</p>
                      </div>
                    </div>
                    <a href={siteSettings?.social_media?.facebook || '#'} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-blue-200">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Kunjungi
                      </Button>
                    </a>
=======
                        <p className="text-sm text-gray-600">@NagariContohOfficial</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-200">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Kunjungi
                    </Button>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <Instagram className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <span className="font-medium">Instagram</span>
<<<<<<< HEAD
                        <p className="text-sm text-gray-600">@{siteSettings?.social_media?.instagram?.split('/').pop() || 'nagari_contoh'}</p>
                      </div>
                    </div>
                    <a href={siteSettings?.social_media?.instagram || '#'} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-pink-200">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Kunjungi
                      </Button>
                    </a>
=======
                        <p className="text-sm text-gray-600">@nagari_contoh</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-200">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Kunjungi
                    </Button>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <span className="font-medium">WhatsApp</span>
<<<<<<< HEAD
                        <p className="text-sm text-gray-600">{siteSettings?.contact_info?.mobile || '0812-3456-7890'}</p>
                      </div>
                    </div>
                    <a href={`https://wa.me/${(siteSettings?.contact_info?.mobile || '081234567890').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-green-200">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                    </a>
=======
                        <p className="text-sm text-gray-600">0812-3456-7890</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-200">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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
<<<<<<< HEAD
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteSettings?.contact_info.address || '')}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buka di Google Maps
                    </Button>
                  </a>
                </motion.div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <strong>Petunjuk Arah:</strong> {siteSettings?.contact_info.directions || 'Kantor Nagari Contoh terletak di pusat nagari, sekitar 500m dari Pasar Tradisional Contoh dan mudah dijangkau dengan kendaraan umum.'}
=======
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </motion.div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <strong>Petunjuk Arah:</strong> Kantor Nagari Contoh terletak di pusat nagari, 
                  sekitar 500m dari Pasar Tradisional Contoh dan mudah dijangkau dengan kendaraan umum.
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
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