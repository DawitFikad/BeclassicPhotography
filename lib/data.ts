import type { LucideIcon } from "lucide-react";
import { Camera, Film, Users, Zap, Award, Clock } from "lucide-react";

export type GalleryCategory =
  | "Wedding"
  | "Commercial"
  | "Portrait"
  | "Music Videos";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  category: string;
  width: number;
  height: number;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/images/wedding/wedding-1.jpg",
    alt: "Ethiopian wedding ceremony and celebration",
    title: "Ethiopian Royal Ceremony",
    subtitle: "Wedding Cinematography",
    category: "Wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "2",
    src: "/images/portrait/portrait-1.webp",
    alt: "Ashenda Ethiopian cultural celebration portrait",
    title: "Ashenda Celebration",
    subtitle: "Cultural Heritage",
    category: "Portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "3",
    src: "/images/commercial/commercial-1.jpg",
    alt: "Commercial advertising shoot in Addis Ababa",
    title: "Commercial Campaign",
    subtitle: "Brand Visuals",
    category: "Commercial",
    width: 800,
    height: 533,
  },
  {
    id: "4",
    src: "/images/music-video/music-1.jpg",
    alt: "Fendika cultural live performance and music video",
    title: "Fendika Live Session",
    subtitle: "Music Video Production",
    category: "Music Videos",
    width: 800,
    height: 1000,
  },
  {
    id: "5",
    src: "/images/wedding/wedding-2.jpg",
    alt: "Zenach Studio Ethiopian bridal portrait",
    title: "Bridal Masterpiece",
    subtitle: "Wedding Photography",
    category: "Wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "6",
    src: "/images/portrait/portrait-2.jpg",
    alt: "High-end editorial studio portrait",
    title: "Studio Editorial",
    subtitle: "Fine Art Portrait",
    category: "Portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "7",
    src: "/images/commercial/commercial-2.png",
    alt: "Commercial architecture & brand showcase",
    title: "Architectural Showcase",
    subtitle: "Commercial Space",
    category: "Commercial",
    width: 800,
    height: 533,
  },
  {
    id: "8",
    src: "/images/music-video/music-2.jpg",
    alt: "Cinematic music video scene",
    title: "Stage Spotlight",
    subtitle: "Cinematic Scene",
    category: "Music Videos",
    width: 800,
    height: 1000,
  },
  {
    id: "9",
    src: "/images/wedding/wedding-3.jpg",
    alt: "Habesha traditional wedding ceremony",
    title: "Habesha Wedding Vows",
    subtitle: "Traditional Heritage",
    category: "Wedding",
    width: 800,
    height: 533,
  },
  {
    id: "10",
    src: "/images/portrait/portrait-3.jpg",
    alt: "Creative studio portraiture",
    title: "High Fashion Look",
    subtitle: "Studio Portrait",
    category: "Portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "11",
    src: "/images/commercial/commercial-3.jpg",
    alt: "Commercial product and lifestyle visual",
    title: "Lifestyle Branding",
    subtitle: "Commercial Story",
    category: "Commercial",
    width: 800,
    height: 533,
  },
  {
    id: "12",
    src: "/images/music-video/music-3.jpg",
    alt: "Live music video production set",
    title: "Sound & Motion",
    subtitle: "Live Performance",
    category: "Music Videos",
    width: 800,
    height: 1000,
  },
  {
    id: "13",
    src: "/images/wedding/wedding-4.jpg",
    alt: "Golden hour romance & wedding cinematography",
    title: "Golden Hour Romance",
    subtitle: "Wedding Story",
    category: "Wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "14",
    src: "/images/wedding/wedding-5.jpg",
    alt: "Traditional Ethiopian wedding celebration",
    title: "Cultural Matrimony",
    subtitle: "Traditional Wedding",
    category: "Wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "15",
    src: "/images/wedding/wedding-6.jpg",
    alt: "Picture perfect wedding highlights",
    title: "Picture Perfect Vows",
    subtitle: "Luxury Highlights",
    category: "Wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "16",
    src: "/images/others/other-1.jpg",
    alt: "Ethiopia photography tour portrait",
    title: "Heritage Journey",
    subtitle: "Travel Portrait",
    category: "Portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "17",
    src: "/images/others/other-2.jpg",
    alt: "Ethereal editorial studio portrait",
    title: "Ethereal Gaze",
    subtitle: "Editorial Portrait",
    category: "Portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "18",
    src: "/images/commercial/commercial-4.jpg",
    alt: "Corporate executive and brand storytelling",
    title: "Executive Identity",
    subtitle: "Corporate Campaign",
    category: "Commercial",
    width: 800,
    height: 533,
  },
  {
    id: "19",
    src: "/images/commercial/commercial-5.jpg",
    alt: "Product and brand creative direction",
    title: "Creative Direction",
    subtitle: "Product Campaign",
    category: "Commercial",
    width: 800,
    height: 533,
  },
  {
    id: "20",
    src: "/images/music-video/music-4.png",
    alt: "Artist visual concept and stage production",
    title: "Artist Visual Concept",
    subtitle: "Stage Production",
    category: "Music Videos",
    width: 800,
    height: 800,
  },
];

export const categories: ("All" | GalleryCategory)[] = [
  "All",
  "Wedding",
  "Commercial",
  "Portrait",
  "Music Videos",
];

export interface Package {
  id: string;
  name: string;
  category: string;
  serviceType: string;
  price: string;
  description: string;
  features: string[];
  whatsIncluded: string[];
  highlights: string[];
  gallery: string[];
  related?: string[];
  popular?: boolean;
  duration?: string;
}

export const packages: Package[] = [
  // 1. Studio & Landscape
  {
    id: "studio-landscape-premium",
    name: "Studio & Landscape Premium",
    category: "Studio & Landscape",
    serviceType: "Wedding Photography",
    price: "85,000 birr",
    description: "Our premium package combines indoor studio photography with beautiful outdoor landscape shots to create a complete collection of timeless memories.",
    features: [
      "Two 30×60 Laminated Albums",
      "Three Different Size Canvas Boards for Wall",
      "One Signing Board OR Sign Book",
      "Professional Editing and Retouching",
      "High-Resolution Digital Files",
    ],
    whatsIncluded: [
      "Two 30×60 Laminated Albums",
      "Three Different Size Canvas Boards for Wall",
      "One Signing Board OR Sign Book",
      "Professional Editing and Retouching",
      "High-Resolution Digital Files",
    ],
    highlights: [
      "Complete studio and outdoor coverage",
      "Premium album and wall art",
      "Best seller package",
      "Elegant custom album design",
    ],
    gallery: [
      "/images/wedding/wedding-1.jpg",
      "/images/wedding/wedding-2.jpg",
      "/images/wedding/wedding-3.jpg",
      "/images/wedding/wedding-4.jpg",
    ],
    related: ["studio-landscape-standard", "landscape"],
    popular: false,
  },
  {
    id: "studio-landscape-standard",
    name: "Studio & Landscape Standard",
    category: "Studio & Landscape",
    serviceType: "Wedding Photography",
    price: "70,000 birr",
    description: "Our standard package provides essential photography services with a perfect blend of studio portraits and landscape photography at an affordable price.",
    features: [
      "Two 30×60 Laminated Albums",
      "Three 50×50 Canvas Boards for Wall",
      "Professional Editing",
      "Digital Files Included",
    ],
    whatsIncluded: [
      "Two 30×60 Laminated Albums",
      "Three 50×50 Canvas Boards for Wall",
      "Professional Editing",
      "Digital Files Included",
    ],
    highlights: [
      "Value for money",
      "Quality prints and albums",
      "Balanced indoor/outdoor coverage",
      "Popular choice for medium budgets",
    ],
    gallery: [
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
      "/images/portrait/portrait-1.webp",
      "/images/portrait/portrait-2.jpg",
    ],
    related: ["studio-landscape-premium", "landscape"],
    popular: false,
  },
  {
    id: "landscape",
    name: "Landscape Package",
    category: "Studio & Landscape",
    serviceType: "Wedding Photography",
    price: "50,000 birr",
    description: "Focused exclusively on outdoor photography, our Landscape Package captures the natural beauty of your chosen location to create stunning environmental portraits.",
    features: [
      "One 30×60 Laminated Album",
      "Two 60×60 Canvas Boards for Wall",
      "Professional Outdoor Photography",
      "Location Scouting",
      "Digital Files Included",
    ],
    whatsIncluded: [
      "One 30×60 Laminated Album",
      "Two 60×60 Canvas Boards for Wall",
      "Professional Outdoor Photography",
      "Location Scouting",
      "Digital Files",
    ],
    highlights: [
      "Beautiful outdoor settings",
      "Natural light photography",
      "Scenic backdrops",
      "Environmental portraiture",
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
      "/images/wedding/wedding-4.jpg",
      "/images/commercial/commercial-1.jpg",
      "/images/portrait/portrait-3.jpg",
    ],
    related: ["studio-landscape-standard", "studio-landscape-premium"],
    popular: false,
  },

  // 2. Ceremony Photo & Video
  {
    id: "ceremony-with-drone",
    name: "Ceremony Photo & Video (With Drone)",
    category: "Ceremony Photo & Video",
    serviceType: "Ceremony Photography",
    price: "220,000 birr",
    description: "Ultimate ceremony coverage with drone. Complete documentation of your special day with photography, videography, and aerial footage.",
    features: [
      "One Full Day Coverage (Location: A.A)",
      "30×90 cm Album (15 pages)",
      "3 Sony Cameras (4K quality)",
      "2 Canon Cameras",
      "With Drone Aerial Coverage",
      "Highlight Video (3-5 minutes)",
      "Full Ceremony Video & Audio",
    ],
    whatsIncluded: [
      "One Full Day Coverage",
      "Location: A.A",
      "30×90 cm Album (15 pages)",
      "3 Sony Cameras (4K quality)",
      "2 Canon Cameras",
      "With Drone Coverage",
      "Highlight Video (3-5 minutes)",
      "Full Ceremony Video",
      "Professional Editing",
      "Digital Delivery",
    ],
    highlights: [
      "Complete photo & video coverage",
      "Drone aerial photography",
      "Multiple camera setup",
      "Premium album included",
    ],
    gallery: [
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-4.jpg",
      "/images/wedding/wedding-1.jpg",
      "/images/wedding/wedding-2.jpg",
      "/images/wedding/wedding-3.jpg",
      "/images/music-video/music-1.jpg",
    ],
    related: ["ceremony-standard", "teklil-premium"],
    popular: true,
  },
  {
    id: "ceremony-standard",
    name: "Ceremony Photo & Video",
    category: "Ceremony Photo & Video",
    serviceType: "Ceremony Photography",
    price: "170,000 birr",
    description: "Complete ceremony coverage with premium quality. Full-day photography and videography without drone.",
    features: [
      "One Full Day Coverage (Location: A.A)",
      "30×90 cm Album (15 pages)",
      "2 Sony Cameras (4K quality)",
      "2 Canon Cameras",
      "Highlight Video (3-5 minutes)",
      "Full Ceremony Video",
      "Professional Editing & Delivery",
    ],
    whatsIncluded: [
      "One Full Day Coverage",
      "Location: A.A",
      "30×90 cm Album (15 pages)",
      "2 Sony Cameras (4K quality)",
      "2 Canon Cameras",
      "Highlight Video (3-5 minutes)",
      "Full Ceremony Video",
      "Professional Editing",
      "Digital Delivery",
    ],
    highlights: [
      "Complete photo & video coverage",
      "Multiple camera setup",
      "Premium album included",
      "Full day service",
    ],
    gallery: [
      "/images/wedding/wedding-2.jpg",
      "/images/wedding/wedding-3.jpg",
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
      "/images/portrait/portrait-1.webp",
      "/images/portrait/portrait-2.jpg",
    ],
    related: ["ceremony-with-drone", "teklil-premium"],
    popular: false,
  },
  {
    id: "melse-kelekel-premium",
    name: "Melse or Kelekel Premium",
    category: "Ceremony Photo & Video",
    serviceType: "Event-based Photography",
    price: "85,000 birr",
    duration: "FOR ONE DAY",
    description: "Event-based package for one day coverage with dedicated video cameras and custom album.",
    features: [
      "FOR ONE DAY Coverage",
      "Photo: 1 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
    ],
    whatsIncluded: [
      "Photo: 1 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "One Day Coverage",
      "Professional Color Grading",
      "Digital High-Res Files",
    ],
    highlights: [
      "Dual video camera setup",
      "Authentic cultural ceremony documentation",
      "Custom 30×60 cm heirloom album",
      "Experienced event crew",
    ],
    gallery: [
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
      "/images/wedding/wedding-7.jpg",
    ],
    related: ["melse-kelekel-standard", "melse"],
    popular: false,
  },
  {
    id: "melse-kelekel-standard",
    name: "Melse or Kelekel Standard",
    category: "Ceremony Photo & Video",
    serviceType: "Event-based Photography",
    price: "70,000 birr",
    duration: "FOR ONE DAY",
    description: "Event-based package for one day coverage with photo, video, and signature album.",
    features: [
      "FOR ONE DAY Coverage",
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60 CM ALBUM",
    ],
    whatsIncluded: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "One Day Coverage",
      "Full Retouching",
      "Digital Files Included",
    ],
    highlights: [
      "Comprehensive single photo & video team",
      "Cultural ceremony coverage",
      "Laminated 30×60 cm album",
      "Affordable event pricing",
    ],
    gallery: [
      "/images/wedding/wedding-6.jpg",
      "/images/wedding/wedding-7.jpg",
      "/images/wedding/wedding-8.jpg",
    ],
    related: ["melse-kelekel-premium", "kelkel"],
    popular: false,
  },

  // 3. Event Photography Packages
  {
    id: "teklil-premium",
    name: "TEKLIL Premium",
    category: "Event Photography",
    serviceType: "Ceremony Photography",
    price: "60,000 birr",
    duration: "FOR ONE DAY",
    description: "Our TEKLIL Premium package offers comprehensive coverage of your special ceremony with multiple cameras for both photo and video.",
    features: [
      "For One Day Coverage",
      "Photo: 2 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "Professional Editing",
      "Digital Files Included",
    ],
    whatsIncluded: [
      "For One Day Coverage",
      "Photo: 2 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "Professional Editing",
      "Digital Files Included",
    ],
    highlights: [
      "Dual camera setup for photos",
      "Complete video coverage",
      "Premium album",
      "Full day service",
    ],
    gallery: [
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
      "/images/wedding/wedding-1.jpg",
      "/images/wedding/wedding-3.jpg",
    ],
    related: ["teklil-standard", "melse"],
    popular: false,
  },
  {
    id: "teklil-standard",
    name: "TEKLIL Standard",
    category: "Event Photography",
    serviceType: "Ceremony Photography",
    price: "50,000 birr",
    duration: "FOR ONE DAY",
    description: "Our TEKLIL Standard package provides quality coverage for your ceremony with a focus on reliable video documentation.",
    features: [
      "For One Day Coverage",
      "Photo: 1 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "Professional Editing",
      "Digital Files Included",
    ],
    whatsIncluded: [
      "For One Day Coverage",
      "Photo: 1 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
      "Professional Editing",
      "Digital Files",
    ],
    highlights: [
      "Emphasis on video coverage",
      "Quality photo documentation",
      "Standard album",
      "Affordable package",
    ],
    gallery: [
      "/images/wedding/wedding-3.jpg",
      "/images/wedding/wedding-4.jpg",
      "/images/wedding/wedding-5.jpg",
    ],
    related: ["teklil-premium", "melse"],
    popular: false,
  },

  // 4. Special Event Packages
  {
    id: "melse",
    name: "Melse",
    category: "Special Event",
    serviceType: "Special Event Photography",
    price: "55,000 birr",
    duration: "FOR ONE DAY",
    description: "Authentic Melse ceremony captured with photo, video, and custom album.",
    features: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Professional Color Grading",
      "Digital Files Included",
    ],
    whatsIncluded: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Professional Color Grading",
      "High Resolution Digital Files",
    ],
    highlights: [
      "Authentic cultural celebration coverage",
      "Dedicated photo & video team",
      "Custom 30×60 album included",
      "Full event storytelling",
    ],
    gallery: [
      "/images/wedding/wedding-2.jpg",
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
    ],
    related: ["shimgelena", "kelkel"],
    popular: false,
  },
  {
    id: "shimgelena",
    name: "Shimgelena",
    category: "Special Event",
    serviceType: "Special Event Photography",
    price: "55,000 birr",
    duration: "FOR ONE DAY",
    description: "Traditional Shimgelena celebration documented with intimate warmth and timeless elegance.",
    features: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "High-Resolution Digital Files",
    ],
    whatsIncluded: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "High-Resolution Digital Files",
    ],
    highlights: [
      "Heartfelt family moments captured",
      "Respectful, unobtrusive coverage",
      "Signature laminated album",
      "Fast turnaround",
    ],
    gallery: [
      "/images/wedding/wedding-1.jpg",
      "/images/wedding/wedding-4.jpg",
      "/images/wedding/wedding-5.jpg",
    ],
    related: ["pre-wedding", "melse"],
    popular: false,
  },
  {
    id: "pre-wedding",
    name: "Pre Wedding",
    category: "Special Event",
    serviceType: "Special Event Photography",
    price: "40,000 birr",
    duration: "FOR ONE DAY",
    description: "Romantic pre-wedding photoshoot and video session in scenic locations.",
    features: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Location Assistance",
    ],
    whatsIncluded: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Location Assistance & Scouting",
      "Digital Gallery Delivery",
    ],
    highlights: [
      "Romantic couple portraiture",
      "Scenic backdrop storytelling",
      "Laminated 30×60 keepsake album",
      "Great for wedding day display",
    ],
    gallery: [
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
      "/images/wedding/wedding-4.jpg",
    ],
    related: ["landscape", "shimgelena"],
    popular: false,
  },
  {
    id: "kelkel",
    name: "Kelkel",
    category: "Special Event",
    serviceType: "Special Event Photography",
    price: "40,000 birr",
    duration: "FOR ONE DAY",
    description: "Traditional Kelkel ceremony captured with authentic elegance.",
    features: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Full Event Documentation",
    ],
    whatsIncluded: [
      "FOR ONE DAY Coverage",
      "PHOTO: 1 CAMERA",
      "VIDEO: 1 CAMERA",
      "ALBUM: 1 30X60",
      "Full Event Documentation",
      "Digital Files Included",
    ],
    highlights: [
      "Traditional customs documented",
      "Professional photo & video setup",
      "Keepsake album",
      "Affordable event coverage",
    ],
    gallery: [
      "/images/wedding/wedding-3.jpg",
      "/images/wedding/wedding-5.jpg",
      "/images/wedding/wedding-6.jpg",
    ],
    related: ["melse", "teklil-standard"],
    popular: false,
  },
];

export interface AdditionalService {
  id: string;
  name: string;
  price: string;
  description: string;
}

export const additionalServices: AdditionalService[] = [
  {
    id: "landscape-video",
    name: "LANDSCAPE VIDEO",
    price: "25,000 birr",
    description: "Cinematic 4K scenic landscape video production for your wedding story.",
  },
  {
    id: "landscape-photoshoot",
    name: "LANDSCAPE DAY PHOTOSHOOT",
    price: "20,000 birr",
    description: "Full day dedicated scenic outdoor photoshoot with master retouched frames.",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Founder & Lead Photographer",
    bio: "Founded Beclassic Photography in 2011 with a deep passion for authentic, timeless wedding storytelling.",
    image: "/images/others/other-1.jpg",
  },
  {
    id: "2",
    name: "Michael Vance",
    role: "Lead Videographer",
    bio: "Joined in 2015 to pioneer our destination weddings with film-grade compositions and drone cinematography.",
    image: "/images/others/other-2.jpg",
  },
  {
    id: "3",
    name: "Liya Bekele",
    role: "Creative Director",
    bio: "Master of elegant compositions and bohemian-inspired aesthetic celebrating unique couple love stories.",
    image: "/images/portrait/portrait-2.jpg",
  },
  {
    id: "4",
    name: "Dawit Haile",
    role: "Post-Production Lead",
    bio: "Dedicated colorist and editor turning every frame into an enduring, cherished heirloom.",
    image: "/images/portrait/portrait-3.jpg",
  },
];

export interface WhyChooseUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    icon: Camera,
    title: "Authentic",
    description: "Real emotions, genuine moments that tell your unique love story.",
  },
  {
    icon: Award,
    title: "Elegant",
    description: "Sophisticated vision, refined style with a focus on timeless compositions.",
  },
  {
    icon: Film,
    title: "Timeless",
    description: "Enduring beauty, lasting memories cherished for generations to come.",
  },
  {
    icon: Users,
    title: "Professional",
    description: "Experienced, attentive service ensuring a comfortable, joyful experience.",
  },
  {
    icon: Zap,
    title: "Passion for Love Stories",
    description: "We believe every love story is unique and deserves to be told in its own special way.",
  },
  {
    icon: Clock,
    title: "Attention to Detail",
    description: "We capture both the grand moments and the subtle details that make your day special.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  "Studio & Landscape Premium (85,000 birr)",
  "Studio & Landscape Standard (70,000 birr)",
  "Landscape Package (50,000 birr)",
  "Ceremony Photo & Video (With Drone) (220,000 birr)",
  "Ceremony Photo & Video (170,000 birr)",
  "Melse or Kelekel Premium (85,000 birr)",
  "Melse or Kelekel Standard (70,000 birr)",
  "TEKLIL Premium (60,000 birr)",
  "TEKLIL Standard (50,000 birr)",
  "Melse (55,000 birr)",
  "Shimgelena (55,000 birr)",
  "Pre Wedding (40,000 birr)",
  "Kelkel (40,000 birr)",
  "LANDSCAPE VIDEO (25,000 birr)",
  "LANDSCAPE DAY PHOTOSHOOT (20,000 birr)",
];

export const studioInfo = {
  name: "BeclassicPhotography",
  displayName: "Beclassic Photography",
  tagline: "Capturing your special moments with elegant sophistication",
  subTagline: "We believe in creating timeless memories that will be cherished for generations to come.",
  email: "contact@timelessmoments.com",
  phone: "093 251 2720",
  phoneSecondary: "+251 91 234 5678",
  phoneRaw: "251932512720",
  whatsapp: "251932512720",
  address: "Grace Plaza | Atlas | ግሬስ ፕላዛ | አትላስ, Namibia St, Bole Road, Near Edna Mall, Addis Ababa 1165, Ethiopia",
  locationShort: "Bole Road, Near Edna Mall, Addis Ababa, Ethiopia",
  hours: "Monday - Sunday: 9am - 8pm",
  mapUrl: "https://maps.app.goo.gl/FLgBPgRhvHBiCTwi6",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5794504561073!2d38.7842609!3d8.9924584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85038c7f960f%3A0xe54d3e52f5ad9ff1!2sEdna%20Mall%2C%20Bole%20Rd%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000",
  instagram: "https://www.instagram.com/be__classic_photography/",
  facebook: "https://www.facebook.com/be.classic.photography",
};

export interface StoryMilestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
}

export const storyMilestones: StoryMilestone[] = [
  {
    year: "2011",
    badge: "Our Beginning",
    title: "Founded with Passion for Authentic Weddings",
    description:
      "Founded by Sarah with a passion for authentic wedding photography. What began as a solo photographer capturing heartfelt emotions quickly earned a devoted following for its timeless aesthetic.",
    highlight: "Founded by Sarah with a passion for authentic wedding photography",
    image: "/images/wedding/wedding-1.jpg",
  },
  {
    year: "2015",
    badge: "Growing Team",
    title: "Destination Weddings & Cinematic Expansion",
    description:
      "Welcomed Michael and expanded our services to include destination weddings across scenic landscapes, adding film-grade video and drone aerials to our offerings.",
    highlight: "Welcomed Michael and expanded our services to include destination weddings",
    image: "/images/wedding/wedding-4.jpg",
  },
  {
    year: "2018",
    badge: "Award Recognition",
    title: "Best Wedding Photography Studio",
    description:
      "Received 'Best Wedding Photography Studio' at the Regional Wedding Awards, recognized for classic aesthetic, emotional depth, and elegant compositions.",
    highlight: 'Received "Best Wedding Photography Studio" at Regional Wedding Awards',
    image: "/images/commercial/commercial-1.jpg",
  },
  {
    year: "2022",
    badge: "Adaptation & Growth",
    title: "Intimate Weddings & Modern Digital Delivery",
    description:
      "Innovated with intimate wedding coverage and expanded digital delivery, creating comforting, seamless experiences for couples during changing times.",
    highlight: "Innovated with intimate wedding coverage and expanded digital delivery",
    image: "/images/wedding/wedding-2.jpg",
  },
  {
    year: "2026",
    badge: "Where We Are Today",
    title: "Timeless Moments & Cherished Memories",
    description:
      "Now in 2026, our tight-knit team continues capturing timeless moments for our couples. Today, Beclassic Photography celebrates over 500+ happy couples with enduring elegance and refined craft.",
    highlight: "A tight-knit team dedicated to capturing timeless moments for our couples in 2026",
    image: "/images/hero/hero-1.jpg",
  },
];

export interface StudioStatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const studioStats: StudioStatItem[] = [
  {
    id: "experience",
    value: 10,
    suffix: "+",
    label: "Years of Experience",
    description: "A decade of artistic dedication to wedding photography and film.",
  },
  {
    id: "couples",
    value: 500,
    suffix: "+",
    label: "Happy Couples",
    description: "Unique love stories documented with authentic emotion and joy.",
  },
  {
    id: "photos",
    value: 100,
    suffix: "K+",
    label: "Photos Delivered",
    description: "High-resolution memories cherished for generations to come.",
  },
  {
    id: "service",
    value: 100,
    suffix: "%",
    label: "Professional Service",
    description: "Experienced, attentive care for your special celebration.",
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getAllPackageIds(): string[] {
  return packages.map((p) => p.id);
}

