import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PageProgressBar from "@/components/PageProgressBar";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
    >
      Skip to content
    </a>
    <ScrollToTop />
    <PageProgressBar />
    <AnnouncementBanner />
    <Navbar />
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
  </div>
);

export default Layout;
