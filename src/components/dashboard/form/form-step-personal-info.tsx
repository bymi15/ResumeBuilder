import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { memo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ErrorLabel from "./error-label";

export const FormStepPersonalInfo = memo(function FormStepPersonalInfo({
  register,
  watch,
  setValue,
  errors,
}: {
  register: UseFormRegister<ResumeSchema>;
  watch: UseFormWatch<ResumeSchema>;
  setValue: UseFormSetValue<ResumeSchema>;
  errors: FieldErrors<ResumeSchema>;
}) {
  const imagePreview = watch("profilePhoto");

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue("profilePhoto", base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Info</h2>
        <Input placeholder="Full Name" {...register("fullName")} />
        <ErrorLabel error={errors.fullName} />

        <Input placeholder="Email" {...register("email")} />
        <ErrorLabel error={errors.email} />

        <Input placeholder="Current Role" {...register("currentRole")} />
        <ErrorLabel error={errors.currentRole} />

        <Input placeholder="City" {...register("location.city")} />
        <ErrorLabel error={errors.location?.city} />
        <Input placeholder="Country" {...register("location.country")} />
        <ErrorLabel error={errors.location?.country} />

        <div className="space-y-2">
          <label className="block font-semibold">Profile Photo</label>
          <Input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
          <ErrorLabel error={errors.profilePhoto} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full mt-2"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
});
