"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  additionalServices as fallbackServices,
  categories as fallbackCategories,
  galleryItems as fallbackGallery,
  packages as fallbackPackages,
  type AdditionalService,
  type GalleryItem,
  type Package,
} from "@/lib/data";
import { supabase } from "@/lib/supabase";

interface SiteContent {
  packages: Package[];
  additionalServices: AdditionalService[];
  galleryItems: GalleryItem[];
  packageCategories: { id: string; name: string }[];
  galleryCategories: { id: string; name: string }[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContent | null>(null);

const slugCategory = (name: string) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(fallbackPackages);
  const [additionalServices, setAdditionalServices] =
    useState<AdditionalService[]>(fallbackServices);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGallery);
  const [packageCategories, setPackageCategories] = useState<SiteContent["packageCategories"]>(() =>
    Array.from(new Set(fallbackPackages.map((item) => item.category))).map((name) => ({ id: slugCategory(name), name }))
  );
  const [galleryCategories, setGalleryCategories] = useState<SiteContent["galleryCategories"]>(() =>
    fallbackCategories.filter((name) => name !== "All").map((name) => ({ id: slugCategory(name), name }))
  );
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [categoriesResult, packagesResult, servicesResult, galleryCategoriesResult, galleryResult] =
      await Promise.all([
        supabase.from("package_categories").select("id,name").order("sort_order"),
        supabase.from("packages").select("*, package_categories(name)").order("sort_order"),
        supabase.from("additional_services").select("*").order("sort_order"),
        supabase.from("gallery_categories").select("id,name").order("sort_order"),
        supabase.from("gallery_items").select("*, gallery_categories(name)").order("sort_order"),
      ]);

    if (categoriesResult.error || packagesResult.error || servicesResult.error || galleryCategoriesResult.error || galleryResult.error) {
      throw categoriesResult.error || packagesResult.error || servicesResult.error || galleryCategoriesResult.error || galleryResult.error;
    }

    setPackageCategories(categoriesResult.data || []);
    setPackages((packagesResult.data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.package_categories?.name || "",
      serviceType: row.service_type,
      price: row.price,
      description: row.description,
      features: row.features || [],
      whatsIncluded: row.whats_included || [],
      highlights: row.highlights || [],
      gallery: row.gallery || [],
      related: row.related || [],
      popular: row.popular,
      duration: row.duration || undefined,
    })));
    setAdditionalServices((servicesResult.data || []).map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price,
      description: row.description,
    })));
    setGalleryCategories(galleryCategoriesResult.data || []);
    setGalleryItems((galleryResult.data || []).map((row: any) => ({
      id: row.id,
      src: row.src,
      alt: row.alt,
      title: row.title || undefined,
      subtitle: row.subtitle || undefined,
      category: row.gallery_categories?.name || "",
      width: row.width,
      height: row.height,
    })));
  }, []);

  useEffect(() => {
    refresh().catch((error) => console.error("Could not load site content from Supabase", error)).finally(() => setLoading(false));
  }, [refresh]);

  const value = useMemo(() => ({
    packages,
    additionalServices,
    galleryItems,
    packageCategories,
    galleryCategories,
    loading,
    refresh,
  }), [packages, additionalServices, galleryItems, packageCategories, galleryCategories, loading, refresh]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return value;
}
