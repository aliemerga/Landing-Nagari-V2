import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, User, Search, Eye, ArrowLeft, TrendingUp, Clock, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  views: number;
  featured: boolean;
}

function NewsCard({ news, index, onSelect }: { news: NewsItem; index: number; onSelect: (news: NewsItem) => void }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => onSelect(news)}>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <ImageWithFallback
              src={news.image}
              alt={news.title}
              className="w-full h-40 object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">{news.category}</Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Eye className="h-3 w-3 mr-1" />
                {news.views}
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{news.title}</h3>
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{news.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {news.date}
              </div>
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {news.author}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FeaturedNewsCard({ news, index, onSelect }: { news: NewsItem; index: number; onSelect: (news: NewsItem) => void }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => onSelect(news)}>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <ImageWithFallback
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-primary">{news.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                {news.views}
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {news.date}
              </div>
              <Button size="sm">
                Baca Selengkapnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BeritaPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("semua");
  const itemsPerPage = 6;

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Nagari Contoh Raih Penghargaan Desa Terbaik Se-Kabupaten",
      excerpt: "Nagari Contoh berhasil meraih penghargaan sebagai desa terbaik dalam kategori pelayanan publik dan transparansi.",
      content: `Nagari Contoh kembali membanggakan dengan meraih penghargaan sebagai Desa Terbaik Se-Kabupaten Contoh tahun 2024. Penghargaan ini diberikan dalam kategori pelayanan publik dan transparansi yang dinilai oleh Tim Evaluasi Kabupaten.

Wali Nagari, H. Ahmad Syukri, S.Sos menyampaikan rasa syukur atas pencapaian ini. "Penghargaan ini adalah hasil kerja keras seluruh perangkat nagari dan partisipasi aktif masyarakat," ujarnya saat menerima penghargaan di Pendopo Bupati, Rabu (18/9/2024).

Beberapa indikator yang menjadi penilaian antara lain:
- Sistem pelayanan publik yang terintegrasi
- Transparansi pengelolaan keuangan desa
- Partisipasi masyarakat dalam pembangunan
- Inovasi program pemberdayaan masyarakat
- Pengelolaan sumber daya alam yang berkelanjutan

Tim penilai memberikan apresiasi khusus terhadap sistem digitalisasi pelayanan yang telah diterapkan Nagari Contoh. Mulai dari pelayanan surat menyurat hingga sistem pengaduan masyarakat yang dapat diakses secara online.

"Nagari Contoh menjadi contoh bagi nagari-nagari lain dalam hal transparansi dan pelayanan kepada masyarakat," kata Ketua Tim Penilai, Dr. Bambang Suryadi, M.Si.

Dengan pencapaian ini, Nagari Contoh berhak menerima dana pembinaan sebesar Rp 500 juta yang akan digunakan untuk melanjutkan program-program inovatif yang telah berjalan.`,
      image: "https://images.unsplash.com/photo-1601652411497-70aa36e04fb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwbmV3cyUyMGdvdmVybm1lbnQlMjBhbm5vdW5jZW1lbnR8ZW58MXx8fHwxNzU4MTcxNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Admin Nagari",
      date: "18 September 2024",
      category: "Prestasi",
      views: 245,
      featured: true
    },
    {
      id: 2,
      title: "Musyawarah Nagari Bahas Program Pembangunan 2025",
      excerpt: "Seluruh lapisan masyarakat diundang dalam musyawarah untuk membahas prioritas pembangunan tahun depan.",
      content: `Pemerintah Nagari Contoh menggelar Musyawarah Nagari (Musnag) untuk membahas Rencana Kerja Pemerintah (RKP) Nagari tahun 2025. Acara yang berlangsung di Balai Nagari pada Sabtu (16/9/2024) dihadiri oleh lebih dari 200 peserta dari berbagai elemen masyarakat.

Dalam musyawarah ini, berbagai usulan program pembangunan disampaikan oleh masyarakat. Prioritas utama yang menjadi fokus pembahasan meliputi:

**1. Infrastruktur Jalan dan Jembatan**
- Perbaikan jalan nagari sepanjang 3,5 km
- Pembangunan jembatan penghubung antar jorong
- Peningkatan akses jalan menuju area pertanian

**2. Fasilitas Pendidikan dan Kesehatan**
- Renovasi gedung sekolah dasar
- Penambahan fasilitas Posyandu
- Program beasiswa untuk anak berprestasi

**3. Pemberdayaan Ekonomi Masyarakat**
- Program pelatihan kewirausahaan
- Bantuan modal usaha mikro
- Pengembangan wisata nagari

**4. Lingkungan dan Kebersihan**
- Program pengelolaan sampah terpadu
- Penanaman pohon di area konservasi
- Pembangunan fasilitas MCK umum

Sekretaris Nagari, Drs. Budi Santoso, menyampaikan bahwa semua usulan akan dikaji berdasarkan skala prioritas dan ketersediaan anggaran. "Partisipasi masyarakat sangat penting dalam menentukan arah pembangunan nagari," ujarnya.

Hasil musyawarah akan menjadi dasar penyusunan APBNagari 2025 yang akan ditetapkan pada akhir tahun ini.`,
      image: "https://images.unsplash.com/photo-1722643882339-7a6c9cb080db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0aW5nJTIwaW5kb25lc2lhfGVufDF8fHx8MTc1ODE1NzA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Sekretaris Nagari",
      date: "16 September 2024",
      category: "Pemerintahan",
      views: 189,
      featured: false
    },
    {
      id: 3,
      title: "Proyek Jalan Baru Connecting Jorong Selesai 100%",
      excerpt: "Pembangunan jalan penghubung antar jorong telah rampung dan siap digunakan masyarakat.",
      content: `Proyek strategis pembangunan jalan penghubung antar jorong di Nagari Contoh telah selesai 100% dan resmi dibuka untuk umum. Jalan sepanjang 2,8 kilometer dengan lebar 4 meter ini menghubungkan Jorong Timur dan Jorong Barat yang sebelumnya terpisah oleh sungai.

**Detail Proyek:**
- Panjang jalan: 2,8 km
- Lebar jalan: 4 meter
- Jembatan: 1 unit (panjang 25 meter)
- Total anggaran: Rp 3.2 miliar
- Waktu pengerjaan: 8 bulan
- Kontraktor: CV. Maju Bersama

Wali Nagari H. Ahmad Syukri mengatakan bahwa pembangunan jalan ini merupakan prioritas utama yang telah lama dinantikan masyarakat. "Dengan adanya jalan ini, akses masyarakat untuk beraktivitas ekonomi, pendidikan, dan sosial menjadi lebih mudah," ujarnya saat peresmian, Jumat (15/9/2024).

Manfaat yang dirasakan masyarakat:
- Waktu tempuh antar jorong berkurang dari 45 menit menjadi 15 menit
- Ongkos transportasi lebih murah
- Akses ke pasar dan fasilitas kesehatan lebih mudah
- Peningkatan nilai jual hasil pertanian

Masyarakat Jorong Timur, Pak Usman (45) mengaku sangat terbantu dengan adanya jalan baru ini. "Dulu untuk ke pasar harus memutar jauh, sekarang langsung bisa sampai. Harga jual sayuran kami juga naik karena lebih cepat sampai ke pasar," katanya.

Proyek ini dibiayai dari Dana Desa tahun 2024 dengan dukungan swadaya masyarakat berupa tenaga kerja dan material lokal. Pemerintah nagari berkomitmen untuk terus melakukan pemeliharaan rutin agar jalan ini dapat digunakan dalam jangka panjang.`,
      image: "https://images.unsplash.com/photo-1618393979234-fd3ead7b91a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NTgxNzE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Tim Pembangunan",
      date: "15 September 2024",
      category: "Pembangunan",
      views: 156,
      featured: true
    },
    {
      id: 4,
      title: "Festival Budaya Nagari Contoh Sukses Digelar",
      excerpt: "Festival budaya tahunan menampilkan keragaman seni dan budaya Minangkabau yang masih dilestarikan.",
      content: `Festival Budaya Nagari Contoh yang ke-7 telah sukses digelar pada weekend lalu (14-15/9/2024) di halaman Balai Nagari. Acara yang mengusung tema "Lestarikan Budaya, Majukan Nagari" ini dihadiri ribuan pengunjung dari dalam dan luar nagari.

Festival ini menampilkan berbagai atraksi budaya Minangkabau yang masih dilestarikan masyarakat setempat, antara lain:

**Pertunjukan Seni:**
- Tari Piring dari sanggar lokal
- Randai cerita rakyat Minangkabau
- Musik tradisional Talempong
- Deklamasi pantun dan gurindam

**Pameran dan Bazaar:**
- Produk kerajinan tangan lokal
- Kuliner khas Minangkabau
- Hasil pertanian unggulan nagari
- Foto-foto sejarah nagari

**Lomba Tradisional:**
- Lomba masak rendang
- Lomba berpakaian adat
- Lomba pantun untuk anak-anak
- Lomba menenun tradisional

Ketua Panitia, Ibu Ratna Sari menyampaikan bahwa festival ini bertujuan untuk melestarikan budaya sekaligus mempromosikan potensi wisata nagari. "Festival ini juga menjadi ajang silaturahmi dan mempererat persaudaraan antar masyarakat," katanya.

Dari segi ekonomi, festival ini juga memberikan dampak positif bagi pelaku usaha lokal. Total transaksi selama dua hari mencapai Rp 150 juta dari penjualan produk lokal dan kuliner.

Rencananya, tahun depan festival akan diperluas dengan mengundang sanggar-sanggar seni dari nagari tetangga untuk menambah kemeriahan acara.`,
      image: "https://images.unsplash.com/photo-1729673766564-618fce6c835e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBob3VzZXxlbnwxfHx8fDE3NTgxNzEwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Komite Festival",
      date: "14 September 2024",
      category: "Budaya",
      views: 203,
      featured: false
    },
    {
      id: 5,
      title: "Program Bantuan Sosial Tahun 2024 Telah Dibuka",
      excerpt: "Pemerintah nagari membuka pendaftaran program bantuan sosial untuk membantu masyarakat kurang mampu.",
      content: `Program Bantuan Sosial (Bansos) Nagari Contoh tahun 2024 resmi dibuka pada Senin (11/9/2024). Program ini bertujuan untuk membantu masyarakat yang kurang mampu dengan memberikan bantuan berupa sembako dan uang tunai.

**Kriteria Penerima:**
- Keluarga dengan pendapatan di bawah garis kemiskinan
- Lansia yang tidak memiliki penghasilan tetap
- Penyandang disabilitas
- Janda/duda dengan tanggungan anak

**Jenis Bantuan:**
1. **Bantuan Sembako**
   - Beras 10 kg per bulan
   - Minyak goreng 2 liter
   - Gula pasir 1 kg
   - Telur 1 kg

2. **Bantuan Tunai**
   - Rp 300.000 per bulan selama 6 bulan
   - Diberikan setiap tanggal 15

**Cara Pendaftaran:**
- Datang langsung ke kantor nagari
- Bawa KTP, KK, dan surat keterangan tidak mampu
- Isi formulir pendaftaran
- Verifikasi data oleh petugas

Kepala Bagian Kesejahteraan Sosial, Ibu Sari Dewi mengatakan bahwa target penerima bantuan tahun ini sebanyak 150 keluarga. "Kami berharap bantuan ini dapat meringankan beban ekonomi masyarakat yang membutuhkan," ujarnya.

Pendaftaran dibuka mulai 11 September hingga 30 September 2024. Pengumuman hasil seleksi akan diumumkan pada 5 Oktober 2024.`,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTgxNzMyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Bagian Kessos",
      date: "11 September 2024",
      category: "Bantuan Sosial",
      views: 312,
      featured: false
    },
    {
      id: 6,
      title: "Pelatihan Kewirausahaan untuk Pemuda Nagari",
      excerpt: "Program pelatihan kewirausahaan diluncurkan untuk meningkatkan keterampilan dan kreativitas pemuda nagari.",
      content: `Pemerintah Nagari Contoh meluncurkan program pelatihan kewirausahaan khusus untuk pemuda usia 18-35 tahun. Program ini merupakan bagian dari upaya meningkatkan kesejahteraan ekonomi masyarakat melalui pengembangan usaha mikro dan kecil.

**Detail Program:**
- Durasi: 2 minggu (14 hari)
- Waktu: Setiap hari Senin-Jumat, 08.00-16.00 WIB
- Lokasi: Balai Pelatihan Nagari
- Peserta: 30 orang (gratis)

**Materi Pelatihan:**
1. **Dasar-dasar Kewirausahaan**
   - Mindset entrepreneur
   - Identifikasi peluang bisnis
   - Analisis pasar dan kompetitor

2. **Manajemen Bisnis**
   - Perencanaan bisnis
   - Manajemen keuangan
   - Strategi pemasaran

3. **Digital Marketing**
   - Pemasaran online
   - Media sosial untuk bisnis
   - E-commerce

4. **Praktik Langsung**
   - Pembuatan business plan
   - Presentasi ide bisnis
   - Simulasi usaha

**Fasilitas:**
- Modul pelatihan lengkap
- Sertifikat kelulusan
- Networking dengan entrepreneur sukses
- Pendampingan pasca pelatihan
- Akses ke program bantuan modal usaha

Pendaftaran dibuka mulai 10 September hingga 25 September 2024. Calon peserta dapat mendaftar di kantor nagari dengan membawa KTP, ijazah terakhir, dan surat keterangan domisili.

"Kami berharap melalui pelatihan ini, pemuda nagari dapat mengembangkan jiwa entrepreneurship dan menciptakan lapangan kerja sendiri," kata Koordinator Program, Bapak Andi Putra.`,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHdvcmtzaG9wJTIweW91dGh8ZW58MXx8fHwxNzU4MTczMjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Bagian Pemuda",
      date: "10 September 2024",
      category: "Pelatihan",
      views: 178,
      featured: false
    }
  ];

  const filteredNews = newsItems.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "semua") return matchesSearch;
    if (activeTab === "utama") return news.featured && matchesSearch;
    if (activeTab === "terbaru") return matchesSearch; // All news are recent
    if (activeTab === "populer") return news.views > 200 && matchesSearch;
    
    return matchesSearch;
  });

  const featuredNews = newsItems.filter(news => news.featured);
  const popularNews = newsItems.filter(news => news.views > 200).sort((a, b) => b.views - a.views);
  const latestNews = [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  if (selectedNews) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              onClick={() => setSelectedNews(null)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Berita
            </Button>
          </motion.div>

          <motion.article
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-0">
                <ImageWithFallback
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-lg"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{selectedNews.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedNews.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {selectedNews.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedNews.views} views
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    {selectedNews.title}
                  </h1>
                  
                  <div className="prose prose-lg max-w-none">
                    {selectedNews.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={index} className="font-semibold text-lg text-primary mt-6 mb-3">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      if (paragraph.includes('- ')) {
                        const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                        return (
                          <ul key={index} className="list-disc list-inside space-y-1 mb-4">
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item.substring(2)}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        </div>
      </motion.div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Berita Nagari</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan, program, dan perkembangan Nagari Contoh
          </p>
        </motion.div>

        {/* Search and Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1);
          }} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="semua" className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                Semua
              </TabsTrigger>
              <TabsTrigger value="utama" className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Utama
              </TabsTrigger>
              <TabsTrigger value="terbaru" className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Terbaru
              </TabsTrigger>
              <TabsTrigger value="populer" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Populer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="semua" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentNews.map((news, index) => (
                  <NewsCard key={news.id} news={news} index={index} onSelect={setSelectedNews} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="utama" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {featuredNews.slice(0, 2).map((news, index) => (
                  <FeaturedNewsCard key={news.id} news={news} index={index} onSelect={setSelectedNews} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="terbaru" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.slice(0, 6).map((news, index) => (
                  <NewsCard key={news.id} news={news} index={index} onSelect={setSelectedNews} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="populer" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularNews.map((news, index) => (
                  <NewsCard key={news.id} news={news} index={index} onSelect={setSelectedNews} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada berita ditemukan</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `Tidak ada hasil untuk "${searchTerm}"` : "Belum ada berita dalam kategori ini"}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                >
                  Reset Pencarian
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}