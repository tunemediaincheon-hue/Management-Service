/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  bgGradient: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  category: string;
  views: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  content: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface SiteSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  logoText: string;
  logoSubText: string;
  accentColor: string;
  fontFamily: 'sans' | 'mono' | 'serif';
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;
  companyName: string;
  ceo: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
  headOfficeAddress?: string;
}
