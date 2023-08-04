import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="shadow-md">
        <div className="max-w-6xl mx-auto">
          <Navbar />
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}
