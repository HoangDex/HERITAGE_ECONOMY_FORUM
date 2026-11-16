import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Diễn đàn -> Forum
      {
        source: "/dien-dan",
        destination: "/forum",
        permanent: true,
      },
      {
        source: "/dien-dan/:path*",
        destination: "/forum/:path*",
        permanent: true,
      },
      // Giới thiệu -> About
      {
        source: "/gioi-thieu",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/gioi-thieu/hoi-dong",
        destination: "/about/council",
        permanent: true,
      },
      {
        source: "/gioi-thieu/ban-dieu-hanh",
        destination: "/about/executive",
        permanent: true,
      },
      {
        source: "/gioi-thieu/:path*",
        destination: "/about/:path*",
        permanent: true,
      },
      // Giải thưởng -> Awards
      {
        source: "/giai-thuong",
        destination: "/awards",
        permanent: true,
      },
      {
        source: "/giai-thuong/:path*",
        destination: "/awards/:path*",
        permanent: true,
      },
      // Tin tức -> News
      {
        source: "/tin-tuc",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/tin-tuc/:path*",
        destination: "/news/:path*",
        permanent: true,
      },
      // Dự án -> Projects
      {
        source: "/projects/proposal",
        destination: "/contact?loai=du-an#contact-form",
        permanent: false,
      },
      {
        source: "/du-an",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/du-an/de-xuat",
        destination: "/contact?loai=du-an#contact-form",
        permanent: true,
      },
      {
        source: "/du-an/:path*",
        destination: "/projects/:path*",
        permanent: true,
      },
      {
        source: "/heritage",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/heritage/:path*",
        destination: "/projects/:path*",
        permanent: true,
      },
      // Liên hệ -> Contact
      {
        source: "/lien-he",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/lien-he/:path*",
        destination: "/contact/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
