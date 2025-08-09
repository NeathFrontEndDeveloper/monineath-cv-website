import ContactForm from "./content/contact-form";
import ContactInfo from "./content/contact-info";

export default function Page() {
  return (
    <div className="w-full min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* header section */}
        <div className="text-center mb-8">
          <span className="text-[#00ff99] text-xs xs:text-sm sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-1 xs:mb-2 block">
            Contact me
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            Get in Touch
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="flex-1 border border-white/10 p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <ContactForm />
          </div>

          {/* Contact Info (placeholder for now) */}
          <div className="flex-1 border border-white/10 p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
