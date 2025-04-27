import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/home/HeroSection";
import { KeyFeaturesSection } from "../components/home/KeyFeaturesSection";
import { MissionSection } from "../components/home/MissionSection";
import { UniqueFeaturesSection } from "../components/home/UniqueFeaturesSection";
import { ContactSection } from "../components/home/ContactSection";
import { DentalClinicSchema } from "../components/seo/SchemaMarkup";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Bhandari Dental Clinic | Invisalign & Dental Implants Specialist in Pune</title>
        <meta 
          name="description" 
          content="Bhandari Dental Clinic in Pune specializes in Invisalign clear aligners, guided dental implants, and complete smile makeovers. Schedule your consultation today." 
        />
        <DentalClinicSchema />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KeyFeaturesSection />
        <MissionSection />
        <UniqueFeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
