// client/src/components/SEO.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage = '/images/default-og.jpg',
  canonical,
  structuredData
}) => {
  const location = useLocation();
  // www is the canonical host: selaleisitme.com redirects there, and the sitemap lists www URLs.
  const siteUrl = import.meta.env.DEV
  ? window.location.origin
  : 'https://www.selaleisitme.com';
  const fullUrl = canonical || `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return; // Skip if no content
      
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Şelale İşitme Merkezi');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', `${siteUrl}${ogImage}`, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', 'tr_TR', true);
    updateMetaTag('og:site_name', 'Şelale İşitme Merkezi', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${siteUrl}${ogImage}`);
    updateMetaTag('twitter:url', fullUrl);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Add structured data (JSON-LD) if provided
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, ogImage, fullUrl, siteUrl, structuredData]);

  // This component doesn't render anything
  return null;
};

export default SEO;
