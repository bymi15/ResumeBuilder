"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Landmark, MapPinIcon, UserRound } from "lucide-react";
import { forwardRef } from "react";
import { getTemplateTheme } from "./template-registry";

const StandardTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
  const theme = getTemplateTheme(data.templateTheme).theme;

  return (
    <div
      ref={ref}
      className={cn("mx-auto bg-white p-8 font-sans text-sm leading-relaxed", className)}
      style={
        {
          "--primary": theme.primaryColor,
          "--secondary": theme.secondaryColor,
          "--main-text": theme.mainTextColor,
          color: "var(--main-text)",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b border-[var(--secondary)] pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-[var(--primary)]">
            {data.fullName || "Your Name"}
          </h1>
          <p className="text-[var(--secondary)]">
            {data.currentRole ? (
              <>
                <span className="font-semibold">{data.currentRole}</span>
                {" | "}
              </>
            ) : (
              ""
            )}
            {data.email}
            {data.location?.city || data.location?.country
              ? ` | ${[data.location.city, data.location.country].filter(Boolean).join(", ")}`
              : ""}
          </p>
        </div>

        {data.links?.length ? (
          <div className="text-right text-sm text-blue-600 space-y-1">
            {data.links.map((link, i) => (
              <p key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-4">
          {/* Experience */}
          {data.workExperience?.length ? (
            <section>
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">
                Work Experience
              </h2>
              <div className="space-y-2">
                {data.workExperience.map((exp, i) => (
                  <div key={i}>
                    <h3 className="font-bold tracking-wide text-[var(--secondary)]">{exp.title}</h3>
                    <h5 className="font-semibold tracking-wide uppercase text-[var(--secondary)]">
                      {exp.company}
                    </h5>
                    <div className="flex gap-3 items-center">
                      <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDateRange(exp.dateRange)}</span>
                      </p>
                      {exp.location ? (
                        <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{exp.location}</span>
                        </p>
                      ) : null}
                    </div>
                    <ul className="list-disc pl-5 mt-1">
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
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold text-[var(--secondary)]">{edu.course}</p>
                    <p className="font-medium uppercase text-[var(--secondary)]">{edu.institute}</p>
                    <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateRange(edu.dateRange)}</span>
                    </p>
                    {edu.description && <p className="mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Projects */}
          {data.projects?.length ? (
            <section>
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">Projects</h2>
              <div className="space-y-2">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <p className="font-semibold text-[var(--secondary)]">{proj.title}</p>
                    <div className="flex gap-3 items-center">
                      <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDateRange(proj.dateRange)}</span>
                      </p>
                      <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                        <UserRound className="w-3 h-3" />
                        <span>{proj.type}</span>
                      </p>
                    </div>
                    <ul className="list-disc pl-5 mt-1">
                      {proj.description.map((desc, j) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <div className="space-y-4">
          {/* Skills */}
          {data.skills?.length ? (
            <section>
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {data.skills.map((skill, i) => (
                  <span key={i} className="bg-[var(--secondary)] text-white px-2 py-1 rounded">
                    {skill.value}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {/* Achievements */}
          {data.achievements?.length ? (
            <section>
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">
                Achievements
              </h2>
              <div className="space-y-2">
                {data.achievements.map((achievement, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold text-[var(--secondary)]">{achievement.title}</p>
                    <div className="flex gap-x-3 gap-y-1 items-center flex-wrap">
                      <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(achievement.date)}</span>
                      </p>
                      {achievement.institute ? (
                        <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                          <Landmark className="w-3 h-3" />
                          <span>{achievement.institute}</span>
                        </p>
                      ) : null}
                    </div>
                    {achievement.description ? (
                      <p className="text-xs">{achievement.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Activities */}
          {data.activities?.length ? (
            <section>
              <h2 className="font-bold uppercase text-base text-[var(--primary)] mb-2">
                Activities
              </h2>
              <div className="space-y-2">
                {data.activities.map((activity, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold text-[var(--secondary)]">{activity.title}</p>
                    <div className="flex gap-x-3 gap-y-1 items-center flex-wrap">
                      {activity.dateRange ? (
                        <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDateRange(activity.dateRange)}</span>
                        </p>
                      ) : null}
                      {activity.locationOrCompany ? (
                        <p className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                          <Landmark className="w-3 h-3" />
                          <span>{activity.locationOrCompany}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default StandardTemplate;
