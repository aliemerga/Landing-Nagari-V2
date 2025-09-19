import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { TrendingUp, DollarSign, Building2, Users } from "lucide-react";

export function IDMPage() {
  const idmData = {
    total: 0.6892,
    iks: 0.7234,
    ike: 0.6543,
    ikl: 0.6899
  };

  const yearlyData = [
    { year: "2020", IDM: 0.6234, IKS: 0.6543, IKE: 0.5876, IKL: 0.6283 },
    { year: "2021", IDM: 0.6456, IKS: 0.6789, IKE: 0.6012, IKL: 0.6567 },
    { year: "2022", IDM: 0.6678, IKS: 0.6987, IKE: 0.6234, IKL: 0.6813 },
    { year: "2023", IDM: 0.6892, IKS: 0.7234, IKE: 0.6543, IKL: 0.6899 }
  ];

  const pieData = [
    { name: "IKS (Sosial)", value: idmData.iks, color: "#16a34a" },
    { name: "IKE (Ekonomi)", value: idmData.ike, color: "#22c55e" },
    { name: "IKL (Lingkungan)", value: idmData.ikl, color: "#4ade80" }
  ];

  const assetData = [
    {
      category: "Tanah dan Bangunan",
      items: [
        { name: "Kantor Nagari", quantity: 1, condition: "Baik", value: "Rp 2.500.000.000" },
        { name: "Balai Nagari", quantity: 1, condition: "Baik", value: "Rp 1.800.000.000" },
        { name: "Posyandu", quantity: 3, condition: "Baik", value: "Rp 450.000.000" }
      ]
    },
    {
      category: "Kendaraan",
      items: [
        { name: "Mobil Dinas", quantity: 1, condition: "Baik", value: "Rp 250.000.000" },
        { name: "Motor Dinas", quantity: 2, condition: "Baik", value: "Rp 45.000.000" }
      ]
    },
    {
      category: "Peralatan dan Mesin",
      items: [
        { name: "Komputer/Laptop", quantity: 8, condition: "Baik", value: "Rp 80.000.000" },
        { name: "Printer", quantity: 4, condition: "Baik", value: "Rp 12.000.000" },
        { name: "Genset", quantity: 1, condition: "Baik", value: "Rp 15.000.000" }
      ]
    }
  ];

  const budgetData = [
    { category: "Pendapatan", amount: "Rp 2.850.000.000", percentage: 100 },
    { category: "- Dana Desa", amount: "Rp 1.200.000.000", percentage: 42.1 },
    { category: "- ADD", amount: "Rp 850.000.000", percentage: 29.8 },
    { category: "- PAD", amount: "Rp 450.000.000", percentage: 15.8 },
    { category: "- Bantuan Kab/Prov", amount: "Rp 350.000.000", percentage: 12.3 },
  ];

  const expenditureData = [
    { category: "Belanja", amount: "Rp 2.650.000.000", percentage: 93.0 },
    { category: "- Pembangunan", amount: "Rp 1.450.000.000", percentage: 50.9 },
    { category: "- Operasional", amount: "Rp 850.000.000", percentage: 29.8 },
    { category: "- Pemberdayaan", amount: "Rp 350.000.000", percentage: 12.3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Transparansi & Data IDM</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Indeks Desa Membangun dan informasi keuangan serta aset nagari untuk transparansi publik
          </p>
        </div>

        {/* IDM Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-primary to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">IDM Total</p>
                  <p className="text-2xl font-bold">{idmData.total.toFixed(4)}</p>
                  <p className="text-xs opacity-80">Berkembang</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">IKS (Sosial)</p>
                  <p className="text-2xl font-bold text-gray-900">{idmData.iks.toFixed(4)}</p>
                  <Progress value={idmData.iks * 100} className="mt-2" />
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">IKE (Ekonomi)</p>
                  <p className="text-2xl font-bold text-gray-900">{idmData.ike.toFixed(4)}</p>
                  <Progress value={idmData.ike * 100} className="mt-2" />
                </div>
                <DollarSign className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">IKL (Lingkungan)</p>
                  <p className="text-2xl font-bold text-gray-900">{idmData.ikl.toFixed(4)}</p>
                  <Progress value={idmData.ikl * 100} className="mt-2" />
                </div>
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tren IDM 4 Tahun Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip 
                      formatter={(value: number) => [value.toFixed(4), ""]}
                      labelFormatter={(label) => `Tahun ${label}`}
                    />
                    <Bar dataKey="IDM" fill="#16a34a" />
                    <Bar dataKey="IKS" fill="#22c55e" />
                    <Bar dataKey="IKE" fill="#4ade80" />
                    <Bar dataKey="IKL" fill="#86efac" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Komposisi IDM 2023</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(3)}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => value.toFixed(4)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle>Anggaran Pendapatan 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className={`${index === 0 ? 'font-semibold text-primary' : 'text-gray-700'}`}>
                      {item.category}
                    </span>
                    <div className="text-right">
                      <p className={`${index === 0 ? 'font-semibold text-primary' : 'text-gray-900'}`}>
                        {item.amount}
                      </p>
                      {index > 0 && (
                        <p className="text-sm text-gray-500">{item.percentage}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expenditure */}
          <Card>
            <CardHeader>
              <CardTitle>Realisasi Belanja 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenditureData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className={`${index === 0 ? 'font-semibold text-primary' : 'text-gray-700'}`}>
                      {item.category}
                    </span>
                    <div className="text-right">
                      <p className={`${index === 0 ? 'font-semibold text-primary' : 'text-gray-900'}`}>
                        {item.amount}
                      </p>
                      {index > 0 && (
                        <p className="text-sm text-gray-500">{item.percentage}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventaris Aset Nagari</CardTitle>
          </CardHeader>
          <CardContent>
            {assetData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 last:mb-0">
                <h3 className="font-semibold text-lg text-primary mb-4">{category.category}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Aset</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Kondisi</TableHead>
                      <TableHead>Nilai</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.items.map((item, itemIndex) => (
                      <TableRow key={itemIndex}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity} unit</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.condition}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}