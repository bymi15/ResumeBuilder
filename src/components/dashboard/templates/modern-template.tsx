"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Landmark, MapPinIcon, UserRound } from "lucide-react";
import { forwardRef } from "react";
import { getTemplateTheme } from "./template-registry";

const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, className }, ref) => {
  const theme = getTemplateTheme(data.templateTheme).theme;

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-4xl mx-auto bg-white text-black grid grid-cols-3 min-h-screen",
        className
      )}
      style={
        {
          "--primary": theme.primaryColor,
          "--secondary": theme.secondaryColor,
          "--sidebar-text": theme.sidebarTextColor,
          "--sidebar-background": theme.sidebarBackgroundColor ?? theme.primaryColor,
          "--main-text": theme.mainTextColor,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <aside className="bg-[--sidebar-background] text-[--sidebar-text] p-6 space-y-6 col-span-1">
        <div>
          <h1 className="text-xl font-bold uppercase">{data.fullName || "Your Name"}</h1>
          <p className="text-sm">
            {data.currentRole && (
              <>
                {data.currentRole} <br />
              </>
            )}
            {data.email} <br />
            {[data.location?.city, data.location?.country].filter(Boolean).join(", ")}
          </p>
        </div>

        {data.skills?.length ? (
          <section>
            <h2 className="text-sm font-bold uppercase mb-2">Skills</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill.value}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {data.links?.length ? (
          <section>
            <h2 className="text-sm font-bold uppercase mb-2">Links</h2>
            <ul className="space-y-1 text-sm">
              {data.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      {/* Main Content */}
      <main className="col-span-2 p-8 text-[--main-text] space-y-6">
        {/* Work Experience */}
        {data.workExperience?.length ? (
          <section>
            <h2 className="text-lg font-semibold uppercase text-[--primary] mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-base">{exp.title}</h3>
                  <p className="text-sm italic">{exp.company}</p>
                  <div className="flex gap-4 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDateRange(exp.dateRange)}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Education */}
        {data.education?.length ? (
          <section>
            <h2 className="text-lg font-semibold uppercase text-[--primary] mb-3">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold">{edu.course}</h3>
                  <p className="italic">{edu.institute}</p>
                  <p className="text-xs text-gray-600">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {formatDateRange(edu.dateRange)}
                  </p>
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Projects */}
        {data.projects?.length ? (
          <section>
            <h2 className="text-lg font-semibold uppercase text-[--primary] mb-3">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <h3 className="font-semibold">{proj.title}</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDateRange(proj.dateRange)}
                    <UserRound className="w-3 h-3 ml-3" />
                    {proj.type}
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {proj.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Achievements */}
        {data.achievements?.length ? (
          <section>
            <h2 className="text-lg font-semibold uppercase text-[--primary] mb-3">Achievements</h2>
            <ul className="space-y-2">
              {data.achievements.map((ach, i) => (
                <li key={i}>
                  <p className="font-semibold">{ach.title}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    {ach.date && (
                      <>
                        <Calendar className="w-3 h-3" />
                        {formatDate(ach.date)}
                      </>
                    )}
                    {ach.institute && (
                      <>
                        <Landmark className="w-3 h-3 ml-3" />
                        {ach.institute}
                      </>
                    )}
                  </p>
                  {ach.description && <p className="text-sm mt-1">{ach.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Activities */}
        {data.activities?.length ? (
          <section>
            <h2 className="text-lg font-semibold uppercase text-[--primary] mb-3">Activities</h2>
            <ul className="space-y-2">
              {data.activities.map((act, i) => (
                <li key={i}>
                  <p className="font-semibold">{act.title}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    {act.dateRange && (
                      <>
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(act.dateRange)}
                      </>
                    )}
                    {act.locationOrCompany && (
                      <>
                        <Landmark className="w-3 h-3 ml-3" />
                        {act.locationOrCompany}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
});

export default ModernTemplate;
