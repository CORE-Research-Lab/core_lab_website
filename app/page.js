import Hero from "@/Components/Hero/Hero";
import About from "@/Components/About/About";
import PublicationHighlight from "@/Components/Home/PublicationHighlight";
import InstitutionalSupport from "@/Components/Home/InstitutionalSupport";

export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <PublicationHighlight/>
      <InstitutionalSupport/>
    </>
  );
}
