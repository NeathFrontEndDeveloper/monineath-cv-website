import { TEXTS } from "@/constant/color";
import SocialLinks from "@/components/shared/socialLinks";

const ContactInfo = () => {
  const contactInfo = [
    { label: "Phone Number", data: "+855 882 906 535" },
    { label: "Email", data: "salmonineath31@gmail.com" },
    { label: "Address", data: "Phnom Penh, Cambodia" },
  ];

  return (
    <>
      <div>
        <h1 className={`text-3xl font-semibold mb-4 ${TEXTS}`}>Contact Info</h1>
        <p className="text-white/70 mb-6">
          Contact details, address, and other info will go here.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        {contactInfo.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-1"
          >
            <span className="font-medium text-[#00ff7b] w-32">
              {item.label}:
            </span>
            <span className="text-white break-words">{item.data}</span>
          </div>
        ))}
      </div>

      {/* social icons link */}
      <div className="flex items-center p-2 space-x-2">
        <SocialLinks />
      </div>

      <div className="flex items-center space-x-2 mt-6 bg-[#00ff7b]/10 border border-[#00ff7b] rounded-lg px-3 py-2 w-fit">
        {/* Indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff7b] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff7b]"></span>
        </span>
        {/* Text */}
        <span className="text-sm font-medium text-[#00ff7b]">
          I&apos;ll get back to you within 24 hours.
        </span>
      </div>
    </>
  );
};

export default ContactInfo;
