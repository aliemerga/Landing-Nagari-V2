// API Service for Nagari Terpadu
// Base URL should be configured based on tenant subdomain
const BASE_URL = 'https://cilandak.sentientx.space'; // Update this to match your tenant subdomain

export interface ServiceData {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  featured_image?: string;
  requirements: string[];
  process_flow?: string[];
  estimated_time: string;
  fee: string;
  contact_info?: {
    phone?: string;
    email?: string;
  };
}

// Extended service detail (when requesting a single service)
export interface ServiceDetail extends ServiceData {
  gallery?: string[];
  procedures?: string[]; // alias / richer naming than process_flow
  office_hours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
  related_services?: Pick<ServiceData, 'id' | 'name' | 'slug'>[];
  meta?: {
    updated_at?: string;
    created_at?: string;
  };
}

export interface NewsData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  is_featured: boolean;
  is_urgent: boolean;
  published_at: string;
  views: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  gallery?: string[];
}

export interface HeroBannerData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mobile_image: string;
  button_text: string;
  button_url: string;
  button_target: string;
  sort_order: number;
}

export interface StaffData {
  id: number;
  name: string;
  position: string;
  department: string;
  photo: string;
  email: string;
  phone: string;
  bio: string;
  education: string[];
  experience: string[];
}

export interface SiteSettingsData {
  site_title: string;
  site_description: string;
  logo_url?: string;
  favicon_url?: string;
  contact_info: {
    email: string;
    phone: string;
    address: string;
    mobile?: string;
    fax?: string;
    secondary_email?: string;
    head_email?: string;
    directions?: string;
  };
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  office_hours?: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

// Detailed contact info endpoint structure (separate from site settings if provided by /contact)
export interface ContactInfoData {
  email?: string;
  phone?: string;
  address?: string;
  whatsapp?: string;
  fax?: string;
  map_embed_url?: string;
  latitude?: number;
  longitude?: number;
  office_hours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface NavigationItemData {
  id: number;
  title: string;
  url: string;
  target: string;
  sort_order: number;
  status: string;
  parent_id?: number | null;
  children: NavigationItemData[];
}

export interface DocumentData {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: string;
  file_url: string;
  file_size: string;
  download_count: number;
  published_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

// Metadata / response for document download endpoint (if it returns JSON before redirect or signed URL)
export interface DocumentDownloadInfo {
  id?: number;
  slug?: string;
  file_name?: string;
  file_url: string; // direct or signed URL
  file_size?: string;
  mime_type?: string;
  expires_at?: string; // if signed URL
}

export interface PageData {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  published_at: string;
  author_name?: string;
  keywords?: string[];
}

export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  type: string;
  color?: string;
  icon?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: {
    current_page?: number;
    total?: number;
    per_page?: number;
    last_page?: number;
    from?: number;
    to?: number;
    headers?: Record<string, string>; // To store rate limit headers
  };
  error?: {
    code?: string | number;
    details?: string;
    field_errors?: Record<string, string[]>;
  };
}

export interface ServiceRequestData {
  pelayanan_jenis_id: number;
  nama_pemohon: string;
  nik_pemohon: string;
  no_hp_pemohon: string;
  email_pemohon?: string;
  alamat_pemohon: string;
  keterangan_pemohon?: string;
  attachments?: File[];
}

export interface TrackingResponse {
  tracking_code: string;
  service_name: string;
  status: 'pending' | 'diproses' | 'selesai' | 'ditolak';
  requester_name: string;
  created_at: string;
  notes?: string;
}

// Status history for JSON tracking endpoint variant
export interface ServiceTrackingHistoryEntry {
  status: string;
  note?: string;
  updated_at: string;
}

export interface ServiceRequestTrackingJSON {
  tracking_code: string;
  service_name: string;
  status: string;
  requester_name: string;
  created_at: string;
  notes?: string;
  history?: ServiceTrackingHistoryEntry[];
}

// JSON-based service request body variant
export interface ServiceRequestJSON {
  pelayanan_jenis_id: number;
  nama_pemohon: string;
  nik_pemohon: string;
  no_hp_pemohon: string;
  email_pemohon?: string;
  alamat_pemohon: string;
  keterangan_pemohon?: string;
  attachments?: (File | { file_name: string; file_base64: string; mime_type?: string })[]; // Can be File objects or base64 inline
}

export interface ComplaintData {
  nama_pelapor: string;
  nik_pelapor: string;
  no_hp_pelapor: string;
  email_pelapor?: string;
  alamat_pelapor: string;
  kategori_pengaduan_id: number;
  lokasi_kejadian: string;
  tanggal_kejadian: string;
  keterangan: string;
  telepon_pelapor?: string; // Added for form compatibility
  attachments?: File[];
  // Backward compatibility (legacy field names) - optional input aliases
  jenis_pengaduan?: number; // maps to kategori_pengaduan_id
  subjek_pengaduan?: string; // maps to keterangan or could be prefix
  isi_pengaduan?: string; // maps to keterangan
  waktu_kejadian?: string; // maps to tanggal_kejadian
}

export interface ComplaintResponse {
  id: number;
  nomor_pengaduan: string;
  nama_pelapor: string;
  kategori: {
    id: number;
    name: string;
  };
  status: 'pending' | 'diproses' | 'selesai' | 'ditolak';
  tanggal_lapor: string;
  lokasi_kejadian: string;
  keterangan: string;
  response?: string;
  attachments?: string[];
}

export interface ComplaintCategoryData {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

// Basic public statistics aggregation
export interface StatisticsData {
  total_services?: number;
  total_news?: number;
  total_documents?: number;
  total_staff?: number;
  total_complaints?: number;
  total_service_requests?: number;
  last_updated?: string;
  // Allow flexible extension without breaking
  [key: string]: number | string | undefined;
}

interface CacheEntry<T> {
  data: ApiResponse<T>;
  timestamp: number;
}

function buildSearchParams(params?: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams;
}

class NagariAPI {
  private baseURL: string;
  private cache: Map<string, CacheEntry<any>>;
  private cacheDuration: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL;
    this.cache = new Map();
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        const rateLimitHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          if (key.startsWith('x-rate-limit-')) {
            rateLimitHeaders[key] = value;
          }
        });
         return {
           success: false,
           data: null as T, // Ensure data is null for failed requests
           message: errorData.message || `HTTP error! status: ${response.status}`,
           error: {
             code: response.status,
             details: errorData.details,
             field_errors: errorData.errors, // Assuming 'errors' for field-level validation
           },
           meta: { headers: rateLimitHeaders },
         };
       }
       
       const data = await response.json();
       const rateLimitHeaders: Record<string, string> = {};
       response.headers.forEach((value, key) => {
         if (key.startsWith('x-rate-limit-')) {
           rateLimitHeaders[key] = value;
         }
       });
       return { ...data, meta: { ...data.meta, headers: rateLimitHeaders } };
     } catch (error: any) {
       console.error('API request failed:', error);
       return {
         success: false,
         data: null as T, // Ensure data is null for failed requests
         message: error.message || 'Network error or unexpected issue',
         error: {
           code: 'NETWORK_ERROR',
           details: error.message,
         },
       };
     }
  }

  // Get list of available services
  async getServices(params?: { 
    search?: string; 
    category?: string; 
    page?: number; 
    per_page?: number; 
  }): Promise<ApiResponse<ServiceData[]>> {
    const query = buildSearchParams(params).toString();
     return this.request<ServiceData[]>(`/api/cms/public/services${query ? '?' + query : ''}`);
   }

   // Alias to public services (if different path/exposure)
   async getPublicServices(params?: { 
     search?: string; 
     category?: string; 
     page?: number; 
     per_page?: number; 
   }): Promise<ApiResponse<ServiceData[]>> {
     const query = buildSearchParams(params).toString();
     return this.request<ServiceData[]>(`/api/public/services${query ? '?' + query : ''}`);
   }

  async getPublicServiceDetail(id: number): Promise<ApiResponse<ServiceDetail>>;
  async getPublicServiceDetail(slug: string): Promise<ApiResponse<ServiceDetail>>;
  async getPublicServiceDetail(idOrSlug: string | number): Promise<ApiResponse<ServiceDetail>> {
    return this.request<ServiceDetail>(`/api/public/services/${idOrSlug}`);
  }

  // Get site settings
  async getSiteSettings(): Promise<ApiResponse<SiteSettingsData>> {
     const cacheKey = '/api/cms/public/site-settings';
     const cached = this.cache.get(cacheKey);
     if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
       return cached.data;
     }
     const response = await this.request<SiteSettingsData>('/api/cms/public/site-settings');
     if (response.success) {
       this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
     }
     return response;
   }

   // News endpoints
   async getNews(params?: { 
     search?: string; 
     category?: string; 
     featured?: boolean; 
     urgent?: boolean; 
     page?: number; 
     per_page?: number; 
   }): Promise<ApiResponse<NewsData[]>> {
     const query = buildSearchParams(params).toString();
     return this.request<NewsData[]>(`/api/cms/public/news${query ? '?' + query : ''}`);
   }

   async getNewsBySlug(slug: string): Promise<ApiResponse<NewsData>> {
     return this.request<NewsData>(`/api/cms/public/news/${slug}`);
   }

   async getHeroBanners(): Promise<ApiResponse<HeroBannerData[]>> { 
     const cacheKey = '/api/cms/public/hero-banners';
     const cached = this.cache.get(cacheKey);
     if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
       return cached.data;
     }
     const response = await this.request<HeroBannerData[]>('/api/cms/public/hero-banners');
     if (response.success) {
       this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
     }
     return response;
   }
   async getStaff(): Promise<ApiResponse<StaffData[]>> { return this.request<StaffData[]>('/api/cms/public/staff'); }
   async getNavigationMenu(location: string = 'header', status?: 'active' | 'inactive'): Promise<ApiResponse<NavigationItemData[]>> { 
     const query = buildSearchParams({ location, status }).toString();
     return this.request<NavigationItemData[]>(`/api/cms/public/navigation-menu?${query}`); 
   }

   async submitComplaint(data: ComplaintData): Promise<ApiResponse<ComplaintResponse>> {
     const formData = new FormData();
     // Map legacy aliases if provided
     const kategoriId = data.kategori_pengaduan_id ?? data.jenis_pengaduan;
     const tanggal = data.tanggal_kejadian ?? data.waktu_kejadian;
     // Compose keterangan from possible legacy fields
     let keteranganFinal = data.keterangan;
     if (!keteranganFinal) {
       // If legacy fields provided, join them
       const legacyParts: string[] = [];
       if (data.subjek_pengaduan) legacyParts.push(`Subjek: ${data.subjek_pengaduan}`);
       if (data.isi_pengaduan) legacyParts.push(data.isi_pengaduan);
       keteranganFinal = legacyParts.join('\n');
     } else if (data.subjek_pengaduan) {
       // Prepend subject for extra context
       keteranganFinal = `Subjek: ${data.subjek_pengaduan}\n${keteranganFinal}`;
     }

     formData.append('nama_pelapor', data.nama_pelapor);
     formData.append('nik_pelapor', data.nik_pelapor);
     formData.append('no_hp_pelapor', data.no_hp_pelapor);
     formData.append('alamat_pelapor', data.alamat_pelapor);
     if (kategoriId !== undefined) formData.append('kategori_pengaduan_id', kategoriId.toString());
     formData.append('lokasi_kejadian', data.lokasi_kejadian);
     if (tanggal) formData.append('tanggal_kejadian', tanggal);
     formData.append('keterangan', keteranganFinal || '');
     if (data.email_pelapor) formData.append('email_pelapor', data.email_pelapor);
     if (data.attachments) data.attachments.forEach(f => formData.append('attachments[]', f));
     return this.request<ComplaintResponse>('/api/public/pengaduan', { method: 'POST', body: formData });
   }
   async trackComplaint(trackingCode: string): Promise<ApiResponse<ComplaintResponse & { complaint_details?: any }>> { return this.request<ComplaintResponse & { complaint_details?: any }>(`/api/public/pengaduan/track/${trackingCode}`); }
   async getComplaintCategories(): Promise<ApiResponse<ComplaintCategoryData[]>> { return this.request<ComplaintCategoryData[]>('/api/public/pengaduan/categories'); }

   // Document endpoints
   async getDocuments(params?: { 
     search?: string; 
     category?: string; 
     page?: number; 
     per_page?: number; 
   }): Promise<ApiResponse<DocumentData[]>> {
     const query = buildSearchParams(params).toString();
     return this.request<DocumentData[]>(`/api/cms/public/documents${query ? '?' + query : ''}`);
   }

   async getDocumentBySlug(slug: string): Promise<ApiResponse<DocumentData>> {
     return this.request<DocumentData>(`/api/cms/public/documents/${slug}`);
   }

   // Download document (returns JSON with URL or triggers file; we assume JSON for consistency)
   async downloadDocument(slug: string): Promise<ApiResponse<DocumentDownloadInfo>> {
     return this.request<DocumentDownloadInfo>(`/api/cms/public/documents/${slug}/download`);
   }

   // Category endpoints
   async getCategories(type?: 'news' | 'document' | 'complaint' | 'service'): Promise<ApiResponse<CategoryData[]>> {
     const query = type ? `?type=${type}` : '';
     return this.request<CategoryData[]>(`/api/cms/public/categories${query}`);
   }

   // Page endpoints
   async getPages(): Promise<ApiResponse<PageData[]>> {
     return this.request<PageData[]>('/api/cms/public/pages');
   }

   async getPageBySlug(slug: string): Promise<ApiResponse<PageData>> {
     return this.request<PageData>(`/api/cms/public/pages/${slug}`);
   }

   async getPagesWithFilters(params?: { search?: string; slug?: string; status?: string; page?: number; per_page?: number; }): Promise<ApiResponse<PageData[]>> {
     const q = buildSearchParams(params).toString();
     return this.request<PageData[]>(`/api/cms/public/pages${q ? '?' + q : ''}`);
   }

   // Contact info (separate endpoint)
   async getContactInfo(): Promise<ApiResponse<ContactInfoData>> {
     return this.request<ContactInfoData>('/api/cms/public/contact');
   }

   // Public statistics
   async getStatistics(): Promise<ApiResponse<StatisticsData>> {
     const cacheKey = '/api/public/statistics';
     const cached = this.cache.get(cacheKey);
     if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
       return cached.data;
     }
     const response = await this.request<StatisticsData>('/api/public/statistics');
     if (response.success) {
       this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
     }
     return response;
   }

   async submitServiceRequest(data: ServiceRequestData): Promise<ApiResponse<{ tracking_code: string }>> {
     const formData = new FormData();
     formData.append('pelayanan_jenis_id', data.pelayanan_jenis_id.toString());
     formData.append('nama_pemohon', data.nama_pemohon);
     formData.append('nik_pemohon', data.nik_pemohon);
     formData.append('no_hp_pemohon', data.no_hp_pemohon);
     formData.append('alamat_pemohon', data.alamat_pemohon);
     if (data.email_pemohon) formData.append('email_pemohon', data.email_pemohon);
     if (data.keterangan_pemohon) formData.append('keterangan_pemohon', data.keterangan_pemohon);
     if (data.attachments) data.attachments.forEach(f => formData.append('attachments[]', f));
     return this.request<{ tracking_code: string }>('/api/public/pelayanan', { method: 'POST', body: formData });
   }
   async trackServiceRequest(trackingCode: string): Promise<ApiResponse<TrackingResponse>> { return this.request<TrackingResponse>(`/api/public/pelayanan/track/${trackingCode}`); }

   // JSON variant submit (attachments base64)
   async submitJsonServiceRequest(data: ServiceRequestJSON): Promise<ApiResponse<{ tracking_code: string }>> {
     // Convert File objects in attachments to base64 if present
     const attachmentsBase64 = await Promise.all(data.attachments?.map(async (att) => {
       if (att instanceof File) {
         return { file_name: att.name, file_base64: await fileToBase64(att), mime_type: att.type };
       } else {
         return att; // Already in base64 format
       }
     }) || []);

     const payload = { ...data, attachments: attachmentsBase64 };

     return this.request<{ tracking_code: string }>('/api/public/service-requests', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
     });
   }

   async trackJsonServiceRequest(trackingCode: string): Promise<ApiResponse<ServiceRequestTrackingJSON>> {
     return this.request<ServiceRequestTrackingJSON>(`/api/public/service-requests/${trackingCode}/track`);
   }
   async searchContent(query: string, type?: 'news' | 'services' | 'documents'): Promise<ApiResponse<any[]>> { 
     const searchParams = buildSearchParams({ search: query, type });
     return this.request<any[]>(`/api/cms/public/search?${searchParams.toString()}`); 
   }
}

// Export singleton instance
export const nagariAPI = new NagariAPI();
export default nagariAPI;

// Utility function to convert File to base64 string
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}