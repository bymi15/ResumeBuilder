import zxcvbn from "zxcvbn";

const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-green-600",
];

export function PasswordStrengthMeter({ password }: { password: string }) {
  const result = zxcvbn(password);
  const score = result.score;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex h-2 rounded bg-gray-200 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-full transition-all duration-300 ${
              i <= score - 1 ? strengthColors[score] : "bg-gray-200"
            }`}
            style={{ width: "20%" }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {password.length > 0 ? strengthLabels[score] : "Enter a password"}
      </p>
      {result.feedback.warning && (
        <p className="text-xs text-yellow-600">{result.feedback.warning}</p>
      )}
      {result.feedback.suggestions.length > 0 && (
        <ul className="text-xs text-muted-foreground list-disc list-inside">
          {result.feedback.suggestions.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
