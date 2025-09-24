"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import api from "@/lib/request";
import { useAuthStore } from "@/store/auth/useAuth";

const LoginSchema = z.object({
  identifier: z
    .string()
    .nonempty({ message: "Email or Username is required." }),
  password: z.string().nonempty({ message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const { loading, setLoading, setAuth, setError } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setLoading(true);
      setError(null);

      const { data: result } = await api.post("/auth/local", data);

      document.cookie = `token=${
        result.jwt
      }; path=/; secure; samesite=strict; max-age=${60 * 60 * 24}`;

      setAuth(result.jwt, result.user);

      toast.success("Login successful!", {
        description: `Welcome back, ${result.user.username}`,
      });

      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);

      toast.error("Login failed", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email or username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
