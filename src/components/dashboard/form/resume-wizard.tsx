"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateResumeMutation } from "@/hooks/api/resumes/use-create-resume-mutation";
import { useResumeByIdQuery } from "@/hooks/api/resumes/use-resume-by-id-query";
import { useUpdateResumeMutation } from "@/hooks/api/resumes/use-update-resume-mutation";
import { ResumeSchema, resumeSchema } from "@/lib/schemas/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  CheckCircle,
  FolderKanban,
  GraduationCap,
  LayoutPanelTop,
  Link,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormStepAchievements } from "./form-step-achievements";
import { FormStepActivities } from "./form-step-activities";
import { FormStepEducation } from "./form-step-education";
import { FormStepLinks } from "./form-step-links";
import { FormStepPersonalInfo } from "./form-step-personal-info";
import { FormStepProjects } from "./form-step-projects";
import { FormStepReview } from "./form-step-review";
import { FormStepSkills } from "./form-step-skills";
import FormStepTemplate from "./form-step-template";
import { FormStepWorkExperience } from "./form-step-work-experience";

const sectionFields: Record<string, (keyof ResumeSchema)[]> = {
  Template: ["template", "templateTheme"],
  "Personal Info": ["fullName", "email", "location", "currentRole", "profilePhoto"],
  Education: ["education"],
  "Work Experience": ["workExperience"],
  Projects: ["projects"],
  Achievements: ["achievements"],
  Activities: ["activities"],
  Skills: ["skills"],
  Links: ["links"],
  Review: [],
};

export default function ResumeWizard() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeTitle, setResumeTitle] = useState("");

  const { data: resumeData, isPending: isLoadingResume } = useResumeByIdQuery(id);
  const { mutateAsync: createResume } = useCreateResumeMutation();
  const { mutateAsync: updateResume } = useUpdateResumeMutation();
  const methods = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      template: "1",
      templateTheme: "1",
    },
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = methods;

  const hasErrors = useCallback(
    (label: string) => {
      return sectionFields[label].some((field) => !!errors[field]);
    },
    [errors]
  );

  const steps = [
    {
      label: "Template",
      icon: LayoutPanelTop,
      component: <FormStepTemplate />,
    },
    {
      label: "Personal Info",
      icon: User,
      component: <FormStepPersonalInfo />,
    },
    {
      label: "Education",
      icon: GraduationCap,
      component: <FormStepEducation />,
    },
    {
      label: "Work Experience",
      icon: Briefcase,
      component: <FormStepWorkExperience />,
    },
    {
      label: "Projects",
      icon: FolderKanban,
      component: <FormStepProjects />,
    },
    {
      label: "Achievements",
      icon: Trophy,
      component: <FormStepAchievements />,
    },
    {
      label: "Activities",
      icon: BookOpen,
      component: <FormStepActivities />,
    },
    {
      label: "Skills",
      icon: Settings,
      component: <FormStepSkills />,
    },
    {
      label: "Links",
      icon: Link,
      component: <FormStepLinks />,
    },
    {
      label: "Review",
      icon: CheckCircle,
      component: <FormStepReview resumeTitle={resumeTitle} setResumeTitle={setResumeTitle} />,
    },
  ];

  useEffect(() => {
    if (isEditMode && resumeData) {
      reset(resumeData.data);
      setResumeTitle(resumeData.title);
    }
  }, [resumeData, isEditMode, reset]);

  const onSubmit = async (formData: ResumeSchema) => {
    if (!isValid || !resumeTitle.trim()) return;

    try {
      if (isEditMode) {
        await updateResume({
          id,
          title: resumeTitle.trim(),
          data: formData,
        });
        toast.success("Your resume has been updated", {
          description: "Your resume is now saved with the latest changes.",
        });
        router.push(`/dashboard/resume/${id}`);
      } else {
        const id = await createResume({
          title: resumeTitle.trim(),
          data: formData,
        });
        toast.success("Your resume has been created", {
          description: "Your resume is now saved and ready to be edited or downloaded.",
        });
        router.push(`/dashboard/resume/${id}`);
      }
    } catch (err) {
      console.error("Failed to create/update resume:", err);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} resume. Please try again.`);
    }
  };

  const nextStep = () => goToStep(Math.min(currentStep + 1, steps.length - 1));
  const prevStep = () => goToStep(Math.max(currentStep - 1, 0));
  const goToStep = async (index: number) => {
    if (index === steps.length - 1) {
      trigger();
    } else {
      const fieldsToValidate = sectionFields[steps[currentStep].label];
      trigger(fieldsToValidate);
    }
    setCurrentStep(index);
  };

  if (isEditMode && isLoadingResume) {
    return (
      <main className="flex" style={{ height: "calc(100vh - var(--header-height))" }}>
        <aside className="w-64 bg-gray-100 border-r p-4">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-300 rounded animate-pulse" />
            ))}
          </div>
        </aside>
        <section className="flex-1 p-8">
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-[400px] bg-gray-200 rounded-md animate-pulse mt-6" />
            <div className="flex justify-between mt-6">
              <div className="h-10 w-24 bg-gray-300 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="flex flex-col lg:flex-row"
      style={{ height: "calc(100vh - var(--header-height))" }}
    >
      {/* Mobile dropdown */}
      <div className="lg:hidden w-full px-4 py-3">
        <Select value={String(currentStep)} onValueChange={(val) => goToStep(Number(val))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select step" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {steps.map(({ label, icon: Icon }, index) => (
              <SelectItem
                key={index}
                value={String(index)}
                className="w-full justify-start text-left"
              >
                <div className="flex items-center w-full gap-2">
                  <Icon size={20} />
                  <span>{label}</span>
                  {hasErrors(label) && <AlertCircle size={16} className="text-red-500" />}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-64 bg-gray-100 dark:bg-gray-800 border-r p-4 overflow-y-auto">
        <nav className="space-y-2">
          {steps.map(({ label, icon: Icon }, index) => {
            const error = hasErrors(label);
            return (
              <Button
                variant="ghost"
                key={index}
                onClick={() => goToStep(index)}
                className={`w-full flex justify-start items-center gap-3 p-2 rounded ${
                  currentStep === index
                    ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-50 hover:text-blue-600 dark:hover:text-blue-50 font-semibold hover:bg-blue-100 dark:hover:bg-blue-950"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
                {error && <AlertCircle size={18} className="text-red-500" />}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Form Section */}
      <section className="flex-1 p-8 overflow-y-auto">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {steps[currentStep].component}
            <div className="mt-6 flex justify-between">
              <Button type="button" disabled={currentStep <= 0} onClick={prevStep}>
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={!isValid || !resumeTitle.trim()}>
                  {isEditMode ? "Save" : "Create"} Resume
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
