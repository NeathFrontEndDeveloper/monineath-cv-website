import { ProjectAdminType } from "@/types/project-type";

export const ProjectForm = ({ project }: { project: ProjectAdminType }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Project Title */}
    <FormField label="Project Title" value={project.title} />
    {/* Status */}
    <FormField
      label="Status"
      value={project.active ? "Completed" : "In Development"}
    />
    {/* Description */}
    <FormField
      label="Description"
      value={project.description}
      type="textarea"
    />
    {/* Features */}
    <FormField label="Key Features" value={project.features} type="textarea" />
    {/* Tech Stack */}
    <FormField label="Tech Stack" value={project.techStack} />
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
};

const FormField = ({ label, value, type = "input" }: FormFieldProps) => (
  <div className="space-y-2 lg:col-span-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        readOnly
        rows={4}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);
