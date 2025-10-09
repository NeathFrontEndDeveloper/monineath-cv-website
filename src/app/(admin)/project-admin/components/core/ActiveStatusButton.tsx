// "use client";

// import { useState, useEffect } from "react";
// import api from "@/lib/request";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";

// type ActiveStatusSwitchProps = {
//   documentId: string;
//   defaultActive?: boolean | null;
// };

// export default function ActiveStatusSwitch({
//   documentId,
//   defaultActive = null,
// }: ActiveStatusSwitchProps) {
//   const [active, setActive] = useState<boolean | null>(defaultActive);
//   const [loading, setLoading] = useState(false);

//   // Fetch initial status
//   //   useEffect(() => {
//   //     const fetchStatus = async () => {
//   //       try {
//   //         const res = await api.get(`/projects`, {
//   //           params: {
//   //             "filters[documentId][$eq]": documentId,
//   //             "fields[0]": "active",
//   //           },
//   //         });
//   //         const project = res.data?.data?.[0];
//   //         if (project) setActive(project.active);
//   //       } catch (error) {
//   //         console.error("Error fetching active status:", error);
//   //       }
//   //     };
//   //     fetchStatus();
//   //   }, [documentId]);

//   // Handle toggle switch
//   const handleToggle = async (checked: boolean) => {
//     try {
//       setLoading(true);
//       const newStatus = checked ? true : null;

//       await api.post(`/projects/${documentId}`, {
//         data: { active: newStatus },
//       });

//       setActive(newStatus);
//     } catch (error) {
//       console.error("Error updating project status:", error);
//       alert("Failed to update project status.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <Switch
//         id={`active-switch-${documentId}`}
//         checked={!!active}
//         onCheckedChange={handleToggle}
//         disabled={loading}
//       />
//       <Label
//         htmlFor={`active-switch-${documentId}`}
//         className="cursor-pointer select-none"
//       >
//         {loading ? "Updating..." : active ? "Completed" : "In Development"}
//       </Label>
//     </div>
//   );
// }
