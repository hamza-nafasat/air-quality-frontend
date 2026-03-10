// components/SecureImage.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SecureImage = ({ src, alt, className, fallbackSrc = '/default-thumbnail.png', ...props }) => {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sanitizeAndLoadImage = async () => {
      try {
        // Step 1: Sanitize the URL
        const sanitizedUrl = await sanitizeImageUrl(src);

        if (!sanitizedUrl) {
          setImageSrc(fallbackSrc);
          setLoading(false);
          return;
        }

        // Step 2: Pre-validate by trying to load the image
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          setImageSrc(sanitizedUrl);
          setLoading(false);
        };

        img.onerror = () => {
          setImageSrc(fallbackSrc);
          setLoading(false);
        };

        img.src = sanitizedUrl;

        // Timeout for slow/invalid URLs
        const timeout = setTimeout(() => {
          if (loading) {
            setImageSrc(fallbackSrc);
            setLoading(false);
          }
        }, 5000);

        return () => clearTimeout(timeout);
      } catch (error) {
        setImageSrc(fallbackSrc);
        setLoading(false);
      }
    };

    sanitizeAndLoadImage();
  }, [src, fallbackSrc]);

  // URL sanitization function
  const sanitizeImageUrl = async (url) => {
    if (!url || typeof url !== 'string') return null;

    // Remove any JavaScript protocol attempts
    let sanitized = url.replace(/^(javascript:|data:text\/html|vbscript:)/i, '');

    // If empty after sanitization, return null
    if (!sanitized.trim()) return null;

    try {
      // Parse the URL
      const parsedUrl = new URL(sanitized, window.location.origin);

      // Restrict to allowed protocols only
      const ALLOWED_PROTOCOLS = ['http:', 'https:', 'data:'];
      if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
        return null;
      }

      // Additional restrictions for data URLs
      if (parsedUrl.protocol === 'data:') {
        // Only allow image data URLs with safe MIME types
        const safeImageMimeTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
        ];

        const mimeMatch = parsedUrl.pathname.match(/^data:([^;,]+)/i);
        if (!mimeMatch || !safeImageMimeTypes.includes(mimeMatch[1].toLowerCase())) {
          return null;
        }

        // Limit data URL size (e.g., 1MB)
        const base64Data = parsedUrl.pathname.split(',')[1];
        if (base64Data && base64Data.length > 1024 * 1024) {
          // 1MB
          return null;
        }
      }

      // For HTTP/HTTPS URLs, ensure they're from allowed domains
      if (parsedUrl.protocol.startsWith('http')) {
        const ALLOWED_DOMAINS = [
          window.location.hostname,
          'your-cdn-domain.com',
          'your-image-service.com',
        ];

        if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
          return null;
        }

        // Ensure it has an image file extension
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        if (!imageExtensions.test(parsedUrl.pathname)) {
          return null;
        }
      }

      return parsedUrl.toString();
    } catch (error) {
      // If it's a relative path
      if (sanitized.startsWith('/')) {
        return sanitized;
      }

      // Reject malformed URLs
      return null;
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${loading ? 'opacity-50' : ''}`}
      loading="lazy"
      crossOrigin="anonymous"
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
        e.currentTarget.onerror = null; // Prevent infinite loop
      }}
      {...props}
    />
  );
};

SecureImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallbackSrc: PropTypes.string,
};

export default SecureImage;
