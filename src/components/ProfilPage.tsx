import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, MapPin, Building, Calendar, Loader2, BookOpen, Shield, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { nagariAPI, StaffData, PageData, StatisticsData } from "../services/nagariApi";

export function ProfilPage() {
  // State for page content (sejarah, visi-misi)
  const [pageContent, setPageContent] = useState<PageData | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  // State for staff data
  const [staffData, setStaffData] = useState<StaffData[]>([]);
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);
  const [staffError, setStaffError] = useState<string | null>(null);

  // State for statistics
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Fetch page content (e.g., slug 'profil-nagari')
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setIsLoadingPage(true);
        setPageError(null);
        // Assuming the profile page content is under a specific slug
        const response = await nagariAPI.getPageBySlug('profil-nagari');
        if (response.success) {
          setPageContent(response.data);
        } else {
          setPageError('Gagal memuat konten profil nagari.');
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
        setPageError('Terjadi kesalahan saat memuat konten.');
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchPageContent();
  }, []);

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setIsLoadingStaff(true);
        setStaffError(null);
        const response = await nagariAPI.getStaff();
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setStaffError('Failed to load staff data');
        // Fallback to static data
        setStaffData([
          {
            id: 1,
            name: "H. Ahmad Syukri, S.Sos",
            position: "Wali Nagari",
            department: "Kepala Daerah",
            photo: "",
            phone: "",
            email: "",
            bio: "",
            education: [],
            experience: []
          },
          {
            id: 2,
            name: "Drs. Budi Santoso",
            position: "Sekretaris Nagari",
            department: "Sekretariat",
            photo: "",
            phone: "",
            email: "",
            bio: "",
            education: [],
            experience: []
          },
          {
            id: 3,
            name: "Siti Aminah, S.E",
            position: "Bendahara",
            department: "Keuangan",
            photo: "",
            phone: "",
            email: "",
            bio: "",
            education: [],
            experience: []
          }
        ]);
      } finally {
        setIsLoadingStaff(false);
      }
    };

    fetchStaff();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        setStatsError(null);
        const response = await nagariAPI.getStatistics();
        if (response.success) {
          setStats(response.data);
        } else {
          setStatsError('Gagal memuat data statistik.');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStatsError('Terjadi kesalahan saat memuat statistik.');
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Get staff by hierarchy - for now just return all staff 
  const getStaffByHierarchy = () => {
    return staffData;
  };

  const demographics = [
    { label: "Total Penduduk", value: stats?.total_population || "N/A", icon: <Users className="h-5 w-5" /> },
    { label: "Jumlah KK", value: stats?.total_households || "N/A", icon: <Building className="h-5 w-5" /> },
    { label: "Luas Wilayah", value: stats?.area_sq_km ? `${stats.area_sq_km} km²` : "N/A", icon: <MapPin className="h-5 w-5" /> },
    { label: "Tahun Pembentukan", value: stats?.establishment_year || "1982", icon: <Calendar className="h-5 w-5" /> },
  ];

  // Helper to parse content for Visi & Misi
  const parseVisiMisi = (content: string) => {
    const visiMatch = content.match(/\[VISI\]\n(.*?)\n\[\/VISI\]/s);
    const misiMatch = content.match(/\[MISI\]\n(.*?)\n\[\/MISI\]/s);
    const misiItems = misiMatch ? misiMatch[1].split('\n').filter(item => item.trim() !== '') : [];
    return {
      visi: visiMatch ? visiMatch[1] : 'Visi belum ditetapkan.',
      misi: misiItems,
    };
  };

  const { visi, misi } = pageContent ? parseVisiMisi(pageContent.content) : { visi: '', misi: [] };
  const sejarahContent = pageContent ? pageContent.content.replace(/\[VISI\].*?\[\/VISI\]/s, '').replace(/\[MISI\].*?\[\/MISI\]/s, '').trim() : '';


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profil Nagari</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah, visi misi, dan data demografi Nagari Contoh
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1727169213591-ff4943b21b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdmlsbGFnZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTgxNzEwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Pemandangan Nagari"
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Nagari Contoh</h2>
              <p className="text-gray-600">
                Nagari yang terletak di dataran tinggi dengan pemandangan alam yang indah dan masyarakat yang gotong royong
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sejarah */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sejarah Nagari</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingPage ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : pageError ? (
                  <p className="text-red-500">{pageError}</p>
                ) : (
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sejarahContent.replace(/\n/g, '<br />') }} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visi & Misi</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingPage ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                ) : pageError ? (
                  <p className="text-red-500">{pageError}</p>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="font-semibold text-primary mb-3 flex items-center"><Eye className="h-5 w-5 mr-2"/>Visi</h3>
                      <p className="text-gray-700 italic">
                        {visi}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-3 flex items-center"><Shield className="h-5 w-5 mr-2"/>Misi</h3>
                      <ul className="space-y-2 text-gray-700">
                        {misi.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Demografi */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Data Demografi</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : statsError ? (
                  <p className="text-red-500 text-sm">{statsError}</p>
                ) : (
                  <div className="space-y-4">
                    {demographics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-primary mr-3">
                            {item.icon}
                          </div>
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Struktur Pemerintahan</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingStaff ? (
                  // Loading skeleton
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
                      </div>
                    ))}
                  </div>
                ) : staffError ? (
                  // Error state
                  <div className="flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <Loader2 className="h-8 w-8 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Gagal memuat data staff</p>
                      <p className="text-sm">{staffError}</p>
                    </div>
                  </div>
                ) : getStaffByHierarchy().length === 0 ? (
                  // Empty state  
                  <div className="flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <Users className="h-8 w-8 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Belum ada data staff</p>
                      <p className="text-sm">Data struktur pemerintahan akan muncul di sini</p>
                    </div>
                  </div>
                ) : (
                  // Actual staff data
                  <div className="space-y-4">
                    {getStaffByHierarchy().map((staff, index) => (
                      <div 
                        key={staff.id}
                        className={`text-center p-4 rounded-lg ${
                          index === 0 ? 'bg-primary/10' : 'bg-gray-50'
                        }`}
                      >
                        <h4 className={`font-semibold ${
                          index === 0 ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {staff.position}
                        </h4>
                        <p className="text-sm text-gray-600">{staff.name}</p>
                        {staff.department && (
                          <p className="text-xs text-gray-500 mt-1">{staff.department}</p>
                        )}
                        {staff.email && (
                          <p className="text-xs text-blue-600 mt-1">{staff.email}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}