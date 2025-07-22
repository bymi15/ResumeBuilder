import { useMutation } from "@tanstack/react-query";

export function useContactMutation() {
  return useMutation({
    mutationFn: async (formData: { email: string; message: string }) =>
      await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }),
  });
}
