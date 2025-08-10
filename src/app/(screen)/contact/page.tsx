import ContactForm from "./content/contact-form";
import ContactInfo from "./content/contact-info";

export default function Page() {
  return (
    <div className="w-full min-h-screen">
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 lg:py-16">
        {/* Enhanced header section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[#00ff99] text-xs xs:text-sm sm:text-sm md:text-base font-semibold uppercase tracking-wider">
              Let&apos;s Connect
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight mb-4 animate-fade-in">
            Get in Touch
          </h1>

          <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Ready to bring your ideas to life? Drop me a message and let&apos;s
            start building something amazing together.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Enhanced Contact Form */}
          <div className="flex-1 group">
            <div className="relative">
              {/* Form container */}
              <div className="relative border border-[#35f592]/40 p-6 lg:p-8 rounded-xl bg-white/5 transition-all duration-300 hover:border-[#35f592]/60 hover:shadow-2xl hover:shadow-[#00ff99]/20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff99] to-transparent"></div>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="flex-1 group">
            <div className="relative">
              {/* Info container */}
              <div className="relative border border-[#35f592]/40 p-6 lg:p-8 rounded-xl bg-white/5 transition-all duration-300 hover:border-[#35f592]/60 hover:shadow-2xl hover:shadow-[#00ff99]/20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
