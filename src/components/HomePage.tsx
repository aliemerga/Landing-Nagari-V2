import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
<<<<<<< HEAD
import { Calendar, FileText, MapPin, Phone, Mail, Users, Building2, Scroll, MessageSquare, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { nagariAPI, HeroBannerData, NewsData, ServiceData, StatisticsData } from "../services/nagariApi";

export function HomePage() {
  // State management for API data
  const [heroBanners, setHeroBanners] = useState<HeroBannerData[]>([]);
  const [announcements, setAnnouncements] = useState<NewsData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
  const [bannersError, setBannersError] = useState<string | null>(null);
  const [announcementsError, setAnnouncementsError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [statisticsError, setStatisticsError] = useState<string | null>(null);

  // Fetch hero banners from API
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        setIsLoadingBanners(true);
        setBannersError(null);
        const response = await nagariAPI.getHeroBanners();
        if (response.success) {
          setHeroBanners(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error);
        setBannersError('Failed to load banners');
        // Fallback to static data
        setHeroBanners([
          {
            id: 1,
            title: "Portal Nagari Contoh",
            subtitle: "Melayani dengan transparansi, akuntabilitas, dan responsivitas untuk kemajuan nagari",
            description: "Portal digital untuk kemudahan layanan masyarakat",
            image: "https://images.unsplash.com/photo-1658221016101-19daf2b37f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTgxNzEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            mobile_image: "https://images.unsplash.com/photo-1658221016101-19daf2b37f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTgxNzEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            button_text: "Layanan Online",
            button_url: "#",
            button_target: "_self",
            sort_order: 1
          }
        ]);
      } finally {
        setIsLoadingBanners(false);
      }
    };

    fetchHeroBanners();
  }, []);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoadingAnnouncements(true);
        setAnnouncementsError(null);
        const response = await nagariAPI.getNews({ per_page: 3 }); // Get latest 3 news items
        if (response.success) {
          setAnnouncements(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncementsError('Failed to load announcements');
        // Fallback to static data
        setAnnouncements([
          {
            id: 1,
            title: "Pengumuman Pendaftaran Program Bantuan Sosial 2024",
            excerpt: "Pendaftaran program bantuan sosial untuk tahun 2024 telah dibuka. Silakan daftar di kantor nagari.",
            content: "",
            slug: "pengumuman-bantuan-sosial-2024",
            featured_image: "",
            is_featured: false,
            is_urgent: false,
            published_at: "2024-09-15T00:00:00Z",
            views: 0,
            category: { id: 1, name: "Bantuan Sosial", slug: "bantuan-sosial" },
            gallery: []
          },
          {
            id: 2,
            title: "Gotong Royong Pembersihan Lingkungan",
            excerpt: "Kegiatan gotong royong akan dilaksanakan setiap hari Minggu untuk menjaga kebersihan lingkungan.",
            content: "",
            slug: "gotong-royong-pembersihan",
            featured_image: "",
            is_featured: false,
            is_urgent: false,
            published_at: "2024-09-12T00:00:00Z",
            views: 0,
            category: { id: 2, name: "Kegiatan", slug: "kegiatan" },
            gallery: []
          },
          {
            id: 3,
            title: "Sosialisasi Program Desa Digital",
            excerpt: "Program digitalisasi layanan desa akan disosialisasikan kepada seluruh warga nagari.",
            content: "",
            slug: "sosialisasi-desa-digital",
            featured_image: "",
            is_featured: false,
            is_urgent: false,
            published_at: "2024-09-10T00:00:00Z",
            views: 0,
            category: { id: 3, name: "Program", slug: "program" },
            gallery: []
          }
        ]);
      } finally {
        setIsLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoadingServices(true);
        setServicesError(null);
        const response = await nagariAPI.getServices({ per_page: 4 }); // Get 4 featured services
        if (response.success) {
          setServices(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServicesError('Failed to load services');
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoadingStatistics(true);
        setStatisticsError(null);
        const response = await nagariAPI.getStatistics();
        if (response.success) {
          setStatistics(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setStatisticsError('Failed to load statistics');
      } finally {
        setIsLoadingStatistics(false);
      }
    };

    fetchStatistics();
  }, []);

  // Get current active hero banner - for now just take the first one
  const currentBanner = heroBanners[0] || {
    title: "Portal Nagari Contoh",
    subtitle: "Melayani dengan transparansi, akuntabilitas, dan responsivitas untuk kemajuan nagari",
    image: "https://images.unsplash.com/photo-1658221016101-19daf2b37f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTgxNzEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };
=======
import { Calendar, FileText, MapPin, Phone, Mail, Users, Building2, Scroll, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export function HomePage() {
  const announcements = [
    {
      id: 1,
      title: "Pengumuman Pendaftaran Program Bantuan Sosial 2024",
      date: "15 September 2024",
      excerpt: "Pendaftaran program bantuan sosial untuk tahun 2024 telah dibuka. Silakan daftar di kantor nagari.",
      category: "Bantuan Sosial"
    },
    {
      id: 2,
      title: "Gotong Royong Pembersihan Lingkungan",
      date: "12 September 2024",
      excerpt: "Kegiatan gotong royong akan dilaksanakan setiap hari Minggu untuk menjaga kebersihan lingkungan.",
      category: "Kegiatan"
    },
    {
      id: 3,
      title: "Sosialisasi Program Desa Digital",
      date: "10 September 2024",
      excerpt: "Program digitalisasi layanan desa akan disosialisasikan kepada seluruh warga nagari.",
      category: "Program"
    }
  ];

  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Surat Domisili",
      description: "Layanan pembuatan surat keterangan domisili"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Surat Keterangan",
      description: "Berbagai jenis surat keterangan"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Pengaduan",
      description: "Layanan pengaduan masyarakat"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Izin Usaha",
      description: "Pengurusan izin usaha mikro"
    }
  ];
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe

  const galleryImages = [
    "https://images.unsplash.com/photo-1710611228737-57ee0b3586f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwYWN0aXZpdGllcyUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTgxNzEwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1729673766564-618fce6c835e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBob3VzZXxlbnwxfHx8fDE3NTgxNzEwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1727169213591-ff4943b21b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTgxNzEwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative h-screen bg-gradient-to-r from-primary to-green-700 overflow-hidden"
      >
        <div className="absolute inset-0">
<<<<<<< HEAD
          {isLoadingBanners ? (
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          ) : (
            <ImageWithFallback
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-full object-cover opacity-30"
            />
          )}
=======
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1658221016101-19daf2b37f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTgxNzEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Kantor Nagari"
            className="w-full h-full object-cover opacity-30"
          />
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div 
            className="text-white max-w-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
<<<<<<< HEAD
              {isLoadingBanners ? (
                <div className="h-20 bg-white/20 animate-pulse rounded" />
              ) : (
                currentBanner.title
              )}
=======
              Portal Nagari Contoh
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
<<<<<<< HEAD
              {isLoadingBanners ? (
                <div className="h-16 bg-white/20 animate-pulse rounded" />
              ) : (
                currentBanner.subtitle
              )}
=======
              Melayani dengan transparansi, akuntabilitas, dan responsivitas untuk kemajuan nagari
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
                  Layanan Online
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                  Pelajari Lebih Lanjut
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Kata Sambutan Kepala Desa */}
        <motion.section 
          className="mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <motion.div 
                className="lg:col-span-1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1584257942206-4fab65fa7cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGhlYWQlMjBsZWFkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgxNzMyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Kepala Nagari"
                      className="w-full aspect-[4/5] object-cover object-center"
                    />
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-200/20 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div>
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      Kata Sambutan
                    </motion.h2>
                    <motion.div 
                      className="w-24 h-1 bg-gradient-to-r from-primary to-green-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 96 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </div>
                  
                  <motion.div 
                    className="space-y-4 text-gray-700 leading-relaxed"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <p className="text-lg">
                      Assalamu'alaikum Warahmatullahi Wabarakatuh dan Salam Sejahtera,
                    </p>
                    <p>
                      Selamat datang di Portal Informasi Nagari Contoh. Dengan penuh rasa syukur kepada Allah SWT, 
                      kami mempersembahkan website resmi nagari sebagai wujud komitmen kami dalam memberikan 
                      pelayanan prima kepada seluruh masyarakat.
                    </p>
                    <p>
                      Portal ini hadir sebagai jembatan komunikasi antara pemerintahan nagari dengan masyarakat, 
                      menyajikan informasi terkini, layanan publik yang mudah diakses, serta transparansi 
                      pengelolaan pemerintahan nagari.
                    </p>
                    <p>
                      Mari bersama-sama membangun nagari yang maju, sejahtera, dan berkelanjutan untuk generasi mendatang.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="pt-6 border-t border-gray-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold text-lg text-gray-900">H. Ahmad Syukri, S.Sos</h4>
                      <p className="text-primary font-medium">Wali Nagari Contoh</p>
                      <p className="text-sm text-gray-600">Periode 2019-2025</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Berita Terbaru (mengganti Pengumuman) */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Berita Terbaru</h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                Lihat Semua Berita
              </Button>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<<<<<<< HEAD
            {isLoadingAnnouncements ? (
              // Loading skeleton for announcements
              [...Array(3)].map((_, index) => (
                <div key={index} className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-6 bg-gray-200 animate-pulse rounded w-20" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                      </div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                      </div>
                      <div className="h-8 bg-gray-200 animate-pulse rounded w-32" />
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : announcementsError ? (
              // Error state
              <div className="col-span-full flex items-center justify-center p-8 text-center">
                <div className="text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Gagal memuat berita</p>
                  <p className="text-sm">{announcementsError}</p>
                </div>
              </div>
            ) : announcements.length === 0 ? (
              // Empty state
              <div className="col-span-full flex items-center justify-center p-8 text-center">
                <div className="text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Belum ada berita</p>
                  <p className="text-sm">Berita terbaru akan muncul di sini</p>
                </div>
              </div>
            ) : (
              // Actual announcements data
              announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{announcement.category.name}</Badge>
                        <span className="text-sm text-gray-500">{new Date(announcement.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{announcement.excerpt}</p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm">
                          Baca Selengkapnya
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
=======
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="h-full"
              >
                <Card className="hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{announcement.category}</Badge>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{announcement.excerpt}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm">
                        Baca Selengkapnya
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
          </div>
        </motion.section>

        {/* Layanan Unggulan */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center mb-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Scroll className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Layanan Unggulan</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
            {isLoadingServices ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="h-full">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full mx-auto mb-4" />
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mx-auto mb-2" />
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-full mx-auto" />
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : servicesError ? (
              <div className="col-span-full flex items-center justify-center p-8 text-center">
                <div className="text-gray-500">
                  <Scroll className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Gagal memuat layanan</p>
                  <p className="text-sm">{servicesError}</p>
                </div>
              </div>
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <motion.div 
                        className="text-primary mb-4 flex justify-center"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback src={service.icon || ''} alt={service.name} className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-semibold mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
=======
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <motion.div 
                      className="text-primary mb-4 flex justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
>>>>>>> cb6ee74f0eb4b3af67be707269afe6cbf94a7ebe
          </div>
        </motion.section>

        {/* Berita Populer */}
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Berita Populer</h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                Baca Berita Lainnya
              </Button>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`Berita ${index + 1}`}
                      className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {index === 0 ? "Prestasi" : index === 1 ? "Budaya" : "Pembangunan"}
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {index === 0 ? "Nagari Contoh Raih Penghargaan Desa Terbaik" : 
                       index === 1 ? "Festival Budaya Nagari Sukses Digelar" : 
                       "Pembangunan Jalan Penghubung Jorong Selesai"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {index === 0 ? "Nagari Contoh berhasil meraih penghargaan sebagai desa terbaik dalam kategori pelayanan publik." : 
                       index === 1 ? "Festival budaya tahunan menampilkan keragaman seni dan budaya Minangkabau." : 
                       "Proyek strategis pembangunan jalan penghubung antar jorong telah selesai 100%."}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>18 Sept 2024</span>
                      <span>{245 - index * 30} views</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Peta & Kontak */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Kontak & Lokasi
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Jl. Nagari No. 123, Kec. Contoh, Kab. Contoh</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>(0751) 123-456</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>info@nagaricontoh.go.id</span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Lokasi Kantor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <motion.div 
                      className="text-center text-gray-500"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.6 }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                      </motion.div>
                      <p>Peta Interaktif</p>
                      <p className="text-sm">Google Maps akan ditampilkan di sini</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>

  );
}