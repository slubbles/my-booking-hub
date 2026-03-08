import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PageProgressBar from "@/components/PageProgressBar";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollToTop />
    <PageProgressBar />
    <AnnouncementBanner />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
  </div>
);

export default Layout;
