import { Briefcase, ImageIcon, Settings2 } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Professional Templates",
    description: "Choose from modern and elegant templates tailored to your industry.",
  },
  {
    icon: ImageIcon,
    title: "Image Upload",
    description: "Upload your photo and customize your profile with ease.",
  },
  {
    icon: Settings2,
    title: "Fully Customizable",
    description: "Adjust every section to match your skills, projects, and experience.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-foreground">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-background p-8 rounded-2xl shadow-sm border transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mx-auto mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
