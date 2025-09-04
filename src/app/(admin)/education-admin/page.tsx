import EducationTable from "./education-table/education-table";

const Education = () => {
  return (
    <>
      {/* Header Content */}
      <div className="flex-1 min-w-0">
        {/* Title with Animation */}
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Education Management
          </h1>
        </div>

        <p className="text-gray-700 text-sm md:text-md font-medium max-w-2xl">
          Manage and filter your educational background information
        </p>
      </div>

      {/* Data Table Container */}
      <div>
        <EducationTable />
      </div>
    </>
  );
};

export default Education;
