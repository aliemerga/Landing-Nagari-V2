import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileText, Download, Calendar, Info, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { nagariAPI, DocumentData, NewsData, PageData } from "../services/nagariApi";

// Helper to format file size
const formatFileSize = (bytes: number | string): string => {
  if (typeof bytes === 'string') {
    // If it's already a formatted string like "2.5 MB", return it
    if (bytes.match(/^\d+(\.\d+)?\s*(KB|MB|GB|TB)$/i)) {
      return bytes;
    }
    // Otherwise, try to parse it as a number
    bytes = parseInt(bytes, 10);
  }
  if (isNaN(bytes) || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function PPIDPage() {
  const [informasiBerkala, setInformasiBerkala] = useState<DocumentData[]>([]);
  const [informasiSertaMerta, setInformasiSertaMerta] = useState<NewsData[]>([]);
  const [informasiSetiapSaat, setInformasiSetiapSaat] = useState<PageData[]>([]);

  const [loading, setLoading] = useState({ berkala: true, sertaMerta: true, setiapSaat: true });
  const [error, setError] = useState({ berkala: null, sertaMerta: null, setiapSaat: null });

  useEffect(() => {
    // Fetch Informasi Berkala (Documents)
    const fetchBerkala = async () => {
      try {
        const response = await nagariAPI.getDocuments({ category: 'informasi-berkala' });
        if (response.success) {
          setInformasiBerkala(response.data);
        } else {
          setError(prev => ({ ...prev, berkala: response.message as any }));
        }
      } catch (err) {
        setError(prev => ({ ...prev, berkala: "Gagal memuat data" as any }));
      } finally {
        setLoading(prev => ({ ...prev, berkala: false }));
      }
    };

    // Fetch Informasi Serta Merta (Urgent News)
    const fetchSertaMerta = async () => {
      try {
        const response = await nagariAPI.getNews({ urgent: true });
        if (response.success) {
          setInformasiSertaMerta(response.data);
        } else {
          setError(prev => ({ ...prev, sertaMerta: response.message as any }));
        }
      } catch (err) {
        setError(prev => ({ ...prev, sertaMerta: "Gagal memuat data" as any }));
      } finally {
        setLoading(prev => ({ ...prev, sertaMerta: false }));
      }
    };

    // Fetch Informasi Setiap Saat (Pages)
    const fetchSetiapSaat = async () => {
      try {
        // Assuming pages for PPID are tagged or categorized somehow, e.g., status 'ppid'
        const response = await nagariAPI.getPagesWithFilters({ status: 'ppid' });
        if (response.success) {
          setInformasiSetiapSaat(response.data);
        } else {
          setError(prev => ({ ...prev, setiapSaat: response.message as any }));
        }
      } catch (err) {
        setError(prev => ({ ...prev, setiapSaat: "Gagal memuat data" as any }));
      } finally {
        setLoading(prev => ({ ...prev, setiapSaat: false }));
      }
    };

    fetchBerkala();
    fetchSertaMerta();
    fetchSetiapSaat();
  }, []);

  const handleDownload = async (slug: string) => {
    const response = await nagariAPI.downloadDocument(slug);
    if (response.success && response.data.file_url) {
      window.open(response.data.file_url, '_blank');
    } else {
      alert('Gagal mengunduh file: ' + response.message);
    }
  };

  const ppidInfoSetiapSaat = [
    {
      category: "Profil Nagari",
      items: informasiSetiapSaat.filter(p => p.slug.startsWith('profil-')),
    },
    {
      category: "Peraturan dan Kebijakan",
      items: informasiSetiapSaat.filter(p => p.slug.startsWith('peraturan-')),
    },
    {
      category: "Layanan Publik",
      items: informasiSetiapSaat.filter(p => p.slug.startsWith('layanan-')),
    }
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pejabat Pengelola Informasi dan Dokumentasi (PPID)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Portal informasi publik Nagari Contoh sesuai dengan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Informasi Berkala</h3>
              <p className="text-sm text-gray-600">
                Informasi yang wajib disediakan dan diumumkan secara berkala
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Informasi Serta-Merta</h3>
              <p className="text-sm text-gray-600">
                Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Informasi Setiap Saat</h3>
              <p className="text-sm text-gray-600">
                Informasi yang harus disampaikan kepada publik secara cepat
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Informasi Berkala */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 text-blue-500 mr-3" />
                Informasi Berkala
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.berkala ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-600">Memuat...</span>
                </div>
              ) : error.berkala ? (
                <p className="text-red-500 text-center">{error.berkala}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {informasiBerkala.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            <p>{new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</p>
                            <p>{formatFileSize(item.file_size)}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleDownload(item.slug)}>
                            <Download className="h-4 w-4 mr-1" />
                            Unduh
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informasi Serta-Merta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                Informasi Serta-Merta
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.sertaMerta ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-600">Memuat...</span>
                </div>
              ) : error.sertaMerta ? (
                <p className="text-red-500 text-center">{error.sertaMerta}</p>
              ) : (
                <div className="space-y-4">
                  {informasiSertaMerta.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          {item.is_urgent && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              Penting
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informasi Setiap Saat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-6 w-6 text-green-500 mr-3" />
                Informasi Setiap Saat
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.setiapSaat ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-600">Memuat...</span>
                </div>
              ) : error.setiapSaat ? (
                <p className="text-red-500 text-center">{error.setiapSaat}</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {ppidInfoSetiapSaat.filter(cat => cat.items.length > 0).map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {category.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {category.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm">{item.title}</span>
                              <Button variant="ghost" size="sm" onClick={() => window.open(`/page/${item.slug}`, '_blank')}>
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>

          {/* Contact PPID */}
          <Card>
            <CardHeader>
              <CardTitle>Kontak PPID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Pejabat Pengelola Informasi dan Dokumentasi</h4>
                  <p className="text-sm text-gray-600 mb-1">Nama: Drs. Budi Santoso</p>
                  <p className="text-sm text-gray-600 mb-1">Jabatan: Sekretaris Nagari</p>
                  <p className="text-sm text-gray-600 mb-1">Email: ppid@nagaricontoh.go.id</p>
                  <p className="text-sm text-gray-600">Telepon: (0751) 123-456 ext. 102</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Jam Pelayanan Informasi</h4>
                  <p className="text-sm text-gray-600 mb-1">Senin - Kamis: 08.00 - 15.30 WIB</p>
                  <p className="text-sm text-gray-600 mb-1">Jumat: 08.00 - 11.30 WIB</p>
                  <p className="text-sm text-gray-600 mb-4">Sabtu - Minggu: Tutup</p>
                  <Button>
                    Ajukan Permohonan Informasi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}