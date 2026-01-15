import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DisclaimerBanner } from "@/components/home/DisclaimerBanner";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <DisclaimerBanner />
    </Layout>
  );
};

export default Index;
