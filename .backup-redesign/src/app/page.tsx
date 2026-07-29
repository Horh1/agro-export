import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Partners />
      <ContactForm />
    </>
  );
}