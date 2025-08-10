"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TEXTS } from "@/constant/color";

// Enhanced validation schema with better error messages
const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
}

const ContactForm = ({ onSubmit, className = "" }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - show toast with formatted data
        toast.success("Message sent successfully!", {
          description: `Thank you, ${data.fullName}! We'll get back to you soon.`,
        });
      }

      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <div className={className}>
      <Form {...form}>
        <div className="mb-6">
          <h2 className={`font-semibold text-3xl mb-2 ${TEXTS}`}>Contact Me</h2>
          <p className="text-gray-400 text-sm">
            Fill out the form below and I'll get back to you as soon as
            possible.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">
                  Full Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className={
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">
                  Email Address <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className={
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">
                  Message <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here..."
                    rows={5}
                    className={`resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-sm text-gray-400">
                    {field.value.length}/1000
                  </span>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            // disabled={isSubmitting || !isDirty || !isValid}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
