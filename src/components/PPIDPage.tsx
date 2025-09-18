import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileText, Download, Calendar, Info, AlertTriangle, Clock } from "lucide-react";

export function PPIDPage() {
  const informasiBerkala = [
    {
      title: "Laporan Penyelenggaraan Pemerintahan Nagari (LPPN) 2023",
      description: "Laporan tahunan penyelenggaraan pemerintahan nagari tahun 2023",
      date: "Januari 2024",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Laporan Keuangan Nagari 2023",
      description: "Laporan realisasi anggaran pendapatan dan belanja nagari 2023",
      date: "Januari 2024",
      type: "PDF",
      size: "1.8 MB"
    },
    {
      title: "Data Profil Nagari 2024",
      description: "Data demografi, geografis, dan sosial ekonomi nagari terkini",
      date: "Maret 2024",
      type: "PDF",
      size: "3.2 MB"
    },
    {
      title: "Rencana Pembangunan Jangka Menengah Nagari (RPJMNagari)",
      description: "Dokumen perencanaan pembangunan nagari periode 2022-2028",
      date: "Februari 2022",
      type: "PDF",
      size: "4.1 MB"
    }
  ];

  const informasiSertaMerta = [
    {
      title: "Pengumuman Hasil Seleksi Program Bantuan Sosial",
      description: "Daftar penerima bantuan sosial tahun 2024",
      date: "15 September 2024",
      urgent: true
    },
    {
      title: "Pemberitahuan Perubahan Jadwal Pelayanan",
      description: "Perubahan jam pelayanan selama bulan Ramadan",
      date: "10 September 2024",
      urgent: false
    },
    {
      title: "Peringatan Bencana Alam - Cuaca Ekstrem",
      description: "Himbauan kewaspadaan menghadapi cuaca ekstrem",
      date: "8 September 2024",
      urgent: true
    }
  ];

  const informasiSetiapSaat = [
    {
      category: "Profil Nagari",
      items: [
        "Sejarah Nagari",
        "Visi dan Misi",
        "Struktur Organisasi",
        "Profil Pimpinan",
        "Data Demografi"
      ]
    },
    {
      category: "Peraturan dan Kebijakan",
      items: [
        "Peraturan Nagari",
        "Keputusan Wali Nagari",
        "Standar Operasional Prosedur (SOP)",
        "Pedoman Pelayanan"
      ]
    },
    {
      category: "Layanan Publik",
      items: [
        "Prosedur Pelayanan Surat",
        "Tarif dan Biaya Layanan",
        "Waktu Penyelesaian",
        "Formulir Permohonan",
        "Persyaratan Layanan"
      ]
    },
    {
      category: "Keuangan",
      items: [
        "APBN Nagari",
        "Realisasi Anggaran",
        "Laporan Keuangan Bulanan",
        "Rencana Kegiatan dan Anggaran (RKA)"
      ]
    },
    {
      category: "Program dan Kegiatan",
      items: [
        "Program Pembangunan",
        "Kegiatan Pemberdayaan Masyarakat",
        "Program Bantuan Sosial",
        "Jadwal Kegiatan"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {informasiBerkala.map((item, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <p>{item.date}</p>
                          <p>{item.size}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Unduh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
              <div className="space-y-4">
                {informasiSertaMerta.map((item, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        {item.urgent && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Penting
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                ))}
              </div>
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
              <Accordion type="single" collapsible className="w-full">
                {informasiSetiapSaat.map((category, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {category.category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">{item}</span>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
    </div>
  );
}