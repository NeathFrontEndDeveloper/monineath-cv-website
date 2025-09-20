"use client";

import * as React from "react";
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

const ProjectFormSchema = z.object({
  title: z
    .string()
    // .nonempty({ message: "This field can't be empty" })
    .optional(),
  description: z
    .string()
    // .nonempty({ message: "This field can't be empty" })
    .optional(),

  features: z
    .string()
    // .nonempty({ message: "This field can't be empty" })
    .optional(),
  techStack: z
    .string()
    // .nonempty({ message: "This field can't be empty" })
    .optional(),
});

type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

const CreateProjectForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { pageLoading } = useLoading();
  const setPageLoading = useLoading.getState().setPageLoading;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      features: "",
      techStack: "",
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setPageLoading(true);

    try {
      let imageId = null;
      if (image) {
        const formData = new FormData();
        formData.append("files", image);

        const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const error = await uploadRes.json();
          throw new Error(error?.error?.message || "Failed to upload image.");
        }

        const uploadResult = await uploadRes.json();
        imageId = uploadResult[0].id;
      }

      const projectData = {
        ...values,
        image: imageId,
      };

      const res = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: projectData }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error?.message || "Failed to create project.");
      }

      const result = await res.json();
      console.log("Project created:", result);
      router.push("/project-admin");
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  React.useEffect(() => {
    setPageLoading(false);
  }, [pathname]);

  const handleBack = () => {
    router.push("/project-admin");
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <Button
              variant="secondary_admin"
              onClick={handleBack}
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
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-40 rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = ""; // clears file input
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

            {/* active boolean */}
            <div></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline_admin"
              className="flex-1 sm:flex-none"
              onClick={() => form.reset()}
              // disabled={loadin`g}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              variant="primary_admin"
              className="group flex items-center gap-2"
              // disabled={loading || !form.formState.isValid}
            >
              {pageLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              )}
              <span>{pageLoading ? "Loading..." : "Create Project"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateProjectForm;
