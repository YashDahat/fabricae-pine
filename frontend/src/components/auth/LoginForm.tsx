"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
// Import AuthUser from AuthContext
import { ROUTES } from "@/routes";

const formSchema = z.object({
  username: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await login(values.username, values.password);
      toast.success("Login successful!");

      // Determine redirect based on user role
      if (user?.role === "ADMIN") {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.CLIENT_DASHBOARD);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Please try again."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Phone</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com or +919876543210" {...field} data-testid="login-username" />
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
                <Input type="password" placeholder="********" {...field} data-testid="login-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C2A02F] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="login-submit">
          Login
        </Button>
      </form>
    </Form>
  );
}