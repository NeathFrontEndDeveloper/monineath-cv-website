import ContactTable from "./contact-table/contact-table";

const contact = () => {
  return (
    <>
      {/* Header Content */}
      <div className="flex-1 min-w-0">
        {/* Title with Animation */}
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Contact Management
          </h1>
        </div>

        <p className="text-gray-700 text-sm md:text-md font-medium max-w-2xl">
          View your contact messages and manage them effectively.
        </p>
      </div>

      {/* Data Table Container */}
      <div>
        <ContactTable />
      </div>
    </>
  );
};

export default contact;
