import { ProjectAdminType } from "@/types/project-type";

export const ProjectForm = ({ project }: { project: ProjectAdminType }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Project Title */}
    <FormField label="Project Title" value={project.title ?? ""} />

    {/* Status */}
    <FormField
      label="Status"
      value={project.active ? "Completed" : "In Development"}
      badge={project.active}
    />

    {/* Description */}
    <FormField
      label="Description"
      value={project.description ?? ""}
      type="textarea"
      fullWidth
    />

    {/* Features */}
    <FormField
      label="Key Features"
      value={project.features ?? ""}
      type="textarea"
      fullWidth
    />

    {/* Tech Stack */}
    <FormField label="Tech Stack" value={project.techStack ?? ""} />

    {/* Created At */}
    <FormField
      label="Created At"
      value={new Date(project.createdAt).toLocaleString()}
    />
  </div>
);

type FormFieldProps = {
  label: string;
  value: string;
  type?: "input" | "textarea";
  badge?: boolean;
  fullWidth?: boolean;
};

const FormField = ({
  label,
  value,
  type = "input",
  badge = false,
  fullWidth = false,
}: FormFieldProps) => (
  <div className={`space-y-2 ${fullWidth ? "lg:col-span-2" : ""}`}>
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value ?? ""}
        readOnly
        rows={4}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 shadow-sm hover:border-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    ) : (
      <div className="relative">
        <input
          type="text"
          value={value ?? ""}
          readOnly
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 shadow-sm hover:border-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {badge && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            Active
          </span>
        )}
      </div>
    )}
  </div>
);
