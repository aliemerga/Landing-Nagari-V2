import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, MapPin, Building, Calendar } from "lucide-react";

export function ProfilPage() {
  const demographics = [
    { label: "Total Penduduk", value: "2,543", icon: <Users className="h-5 w-5" /> },
    { label: "Jumlah KK", value: "743", icon: <Building className="h-5 w-5" /> },
    { label: "Luas Wilayah", value: "45.2 km²", icon: <MapPin className="h-5 w-5" /> },
    { label: "Tahun Pembentukan", value: "1982", icon: <Calendar className="h-5 w-5" /> },
  ];

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
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nagari Contoh didirikan pada tahun 1982 sebagai hasil pemekaran dari nagari induk. Nama "Contoh" 
                  diambil dari kata dalam bahasa Minangkabau yang berarti "tempat yang subur". Nagari ini terletak 
                  di dataran tinggi dengan ketinggian sekitar 800 meter di atas permukaan laut.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sejarah panjang nagari ini dimulai dari zaman kolonial Belanda, dimana wilayah ini merupakan 
                  jalur perdagangan penting antara pesisir dan dataran tinggi. Masyarakat nagari sebagian besar 
                  berprofesi sebagai petani dan pedagang.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Dalam perkembangannya, Nagari Contoh terus mempertahankan nilai-nilai tradisional Minangkabau 
                  sambil mengikuti perkembangan zaman modern. Sistem pemerintahan nagari yang demokratis dan 
                  partisipatif menjadi kekuatan utama dalam pembangunan daerah.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visi & Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold text-primary mb-3">Visi</h3>
                  <p className="text-gray-700 italic">
                    "Terwujudnya Nagari Contoh sebagai nagari yang maju, mandiri, dan sejahtera 
                    berbasis kearifan lokal dan teknologi modern"
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-3">Misi</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mengembangkan potensi ekonomi masyarakat berbasis sumber daya lokal
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Melestarikan nilai-nilai budaya dan tradisi Minangkabau
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Meningkatkan kualitas pendidikan dan kesehatan masyarakat
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Membangun infrastruktur yang mendukung kesejahteraan masyarakat
                    </li>
                  </ul>
                </div>
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
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Struktur Pemerintahan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-primary">Wali Nagari</h4>
                    <p className="text-sm text-gray-600">H. Ahmad Syukri, S.Sos</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Sekretaris Nagari</h4>
                    <p className="text-sm text-gray-600">Drs. Budi Santoso</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Bendahara</h4>
                    <p className="text-sm text-gray-600">Siti Aminah, S.E</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}