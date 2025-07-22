import { getTemplateByID } from "@/components/dashboard/templates/templates";
import { TemplateProps } from "@/types/template";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";

export const useTemplateByID = (
  id: string
): {
  Template: ForwardRefExoticComponent<TemplateProps & RefAttributes<HTMLDivElement>> | null;
  isPending: boolean;
  isError: boolean;
} => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [Template, setTemplate] = useState<ForwardRefExoticComponent<
    TemplateProps & RefAttributes<HTMLDivElement>
  > | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      setIsPending(true);
      try {
        const result = await getTemplateByID(id);
        setTemplate(result.component);
      } catch (err) {
        console.error("Failed to load template:", err);
        setTemplate(null);
        setIsError(true);
      }
      setIsPending(false);
    };

    loadTemplate();
  }, [id]);

  return { Template, isPending, isError };
};
