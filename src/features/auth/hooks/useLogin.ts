import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppForm } from "@/lib/form";
import { useToast } from "@/components/ui/Toast";
import { getCurrentUser, signInWithPassword } from "@/lib/supabase/auth";

import { loginSchema } from "../schema/loginSchema";


//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const DEFAULT_VALUES = {
  email: "",
  password: ""
}
 
//-----------------------------------------------------------
// SETUP ACCOUNT HOOK
//-----------------------------------------------------------

export function useLogin() {

  const navigate = useNavigate();
  const toast = useToast();
  
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: z.infer<typeof loginSchema>) => {
      await signInWithPassword(email, password)
      return getCurrentUser();
    },
    onSuccess: (user) => {
      toast.success("Successfully logged in", {
        title: "Welcome back",
      });
      navigate(user.role === "admin" ? "/admin/dashboard" : "/users/dashboard");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Failed to sign in. Check your email and password.", {
        title: "Login Error",
      });
    },
  });

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value);
    },
  });

  return { form, signInMutation };
}