import { FieldError } from "react-hook-form";

export default function ErrorLabel({ error }: { error: FieldError | undefined }) {
  return error ? <p className="mt-[-10px] ml-2 text-xs text-red-500">{error.message}</p> : null;
}
