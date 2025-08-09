"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const ContactSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must be less than 50 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message must be less than 1000 characters." }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof ContactSchema>) {
    toast("Form submitted!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4 text-white overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ),
    });
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
