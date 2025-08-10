import { TEXTS } from "@/constant/color";

const ContactInfo = () => {
  return (
    <div>
      <h1 className={`text-3xl font-semibold mb-4 ${TEXTS}`}>Contact Info</h1>
      <p className="text-white/70">
        Contact details, address, and other info will go here.
      </p>
    </div>
  );
};

export default ContactInfo;
