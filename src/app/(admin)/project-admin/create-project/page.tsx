"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Plus, MoveLeft } from "lucide-react";
import { useLoading } from "@/store/Loading/useLoading";
import { createProject } from "@/lib/api/project-api";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const ProjectFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  features: z.string().optional(),
  techStack: z.string().optional(),
  active: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

const CreateProjectForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { btnLoading, setBtnLoading } = useLoading.getState();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      features: "",
      techStack: "",
      active: false,
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setBtnLoading(true);

    try {
      const newProject = await createProject(values, image);
      console.log("Project created:", newProject);

      router.push("/project-admin");
    } catch (error) {
      console.error(error, "==error==");
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setBtnLoading(false);
  }, [pathname, setBtnLoading]);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <Button
              variant="secondary_admin"
              onClick={() => router.back()}
              className="group flex items-center gap-2"
            >
              <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-gray-900">
              Create New Project
            </h1>
            <p className="text-gray-400">Fill in details to create a project</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-semibold text-gray-900">
                    Project Title *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., E-commerce Dashboard"
                      className="transition-colors focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-semibold text-gray-900">
                    Project Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project's purpose, goals, and impact..."
                      className="min-h-[120px] transition-colors focus:ring-2 focus:ring-blue-500 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Be specific about what problem your project solves
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-900">
                    Key Features
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3"
                      className="min-h-[100px] transition-colors focus:ring-2 focus:ring-blue-500 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    List the main functionality and features
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-900">
                    Technology Stack
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, PostgreSQL, AWS..."
                      className="transition-colors focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Separate technologies with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* active boolean */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-semibold text-gray-900 tracking-tight">
                    Project Status
                  </FormLabel>

                  <FormControl>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <span
                            className={`text-sm font-semibold transition-colors duration-200 ${
                              field.value ? "text-blue-600" : "text-red-600"
                            }`}
                          >
                            {field.value ? "Completed" : "In Development"}
                          </span>
                          <span className="text-xs text-gray-700">
                            {field.value
                              ? "Project has been completed"
                              : "Project is in development"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          field.value ? "bg-blue-600" : "bg-red-600"
                        }`}
                      />
                    </div>
                  </FormControl>

                  <FormDescription className="text-xs text-gray-600 ml-1">
                    Toggle to mark project as completed or in development
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormItem className="md:col-span-2">
              <FormLabel className="text-sm font-semibold text-gray-900">
                Project Image
              </FormLabel>
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </FormControl>

              {image && (
                <div className="mt-4 space-y-2">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-40 w-70 rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              )}

              <FormDescription className="text-xs text-gray-500">
                Upload a screenshot or demo image (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>

          <div className="flex flex-col sm:flex-row space-x-2 pt-6 border-t">
            <Button
              type="button"
              variant="destructive"
              className="flex-1 sm:flex-none"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline_admin"
              className="flex-1 sm:flex-none"
              onClick={() => form.reset()}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              variant="primary_admin"
              className="group flex items-center gap-2"
            >
              {btnLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              )}
              <span>{btnLoading ? "Loading..." : "Create Project"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateProjectForm;
