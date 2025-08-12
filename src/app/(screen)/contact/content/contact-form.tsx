"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

// import { Button } from "@/components/shared/button";
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
import { IoSend } from "react-icons/io5";
// import { motion } from "framer-motion";

// Enhanced validation schema with better error messages
const contactSchema = z.object({
  full_name: z.string().nonempty({ message: "Full Name is required" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Please enter a valid email address"),

  message: z
    .string()
    .nonempty({ message: "Message is requried" })
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
      full_name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - show toast with formatted data
        toast.success("Message sent successfully!", {
          description: `Thank you, ${data.full_name}! We'll get back to you soon.`,
        });
      }

      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
      console.log(error, "===error===");
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    formState: {},
  } = form;

  return (
    <div className={className}>
      <Form {...form}>
        <div className="mb-6">
          <h2 className={`font-semibold text-3xl mb-2 ${TEXTS}`}>Contact Me</h2>
          <p className="text-gray-400 text-sm">
            Fill out the form below and I&lsquo;ll get back to you as soon as
            possible.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6 text-white"
          noValidate
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">
                  Full Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00ff7b] text-[#1c1c22] border border-transparent 
             hover:bg-transparent hover:border-[#00ff7b] hover:text-[#00ff7b] 
             transition-all duration-300 ease-in-out cursor-pointer"
            // disabled={isSubmitting || !isDirty || !isValid}
          >
            <span className="font-medium">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>

            <span className="flex items-center">
              <IoSend size={18} />
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
