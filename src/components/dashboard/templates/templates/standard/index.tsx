"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { forwardRef } from "react";

const StandardTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  ({ className, data, theme }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto bg-white px-8 py-6 font-sans text-[13px] leading-[1.6]", className)}
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
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold uppercase text-[var(--primary)] tracking-wide">
            {data.fullName || "Your Name"}
          </h1>
          <p className="text-[var(--secondary)] mt-1">
            {data.currentRole && <span className="font-bold">{data.currentRole} | </span>}
            {data.email}
            {data.location?.city || data.location?.country
              ? ` | ${[data.location.city, data.location.country].filter(Boolean).join(", ")}`
              : ""}
          </p>
          {data.links?.length ? (
            <p className="text-sm text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
              {data.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                  {i !== (data.links?.length ?? 1) - 1 && <span className="mx-1">·</span>}
                </a>
              ))}
            </p>
          ) : null}
        </div>

        {/* Body Sections */}
        <div className="space-y-4">
          {/* Experience */}
          {data.workExperience?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-2">
                {data.workExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)] text-base">
                      {exp.company}
                    </div>
                    {exp.roles.map((role, j) => (
                      <div key={j} className="mt-1">
                        <div className="text-sm font-bold text-[var(--primary)]">{role.title}</div>
                        <div className="text-xs text-[var(--main-text)]">
                          {formatDateRange(role.dateRange)}
                          {role.location ? ` | ${role.location}` : ""}
                        </div>
                        {role.description?.length ? (
                          <ul className="list-disc pl-5 mt-1">
                            {role.description.map((desc, k) => (
                              <li key={k}>{desc}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
                {/* {data.workExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)]">{exp.title}</div>
                    <div className="text-sm text-[var(--main-text)]">
                      <span className="font-semibold">{exp.company}</span> |{" "}
                      {formatDateRange(exp.dateRange)}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </div>
                    <ul className="list-disc pl-5 mt-1">
                      {exp.description.map((desc, j) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))} */}
              </div>
            </section>
          ) : null}

          {/* Education */}
          {data.education?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)]">{edu.course}</div>
                    <div className="text-sm text-[var(--main-text)]">
                      <span className="font-semibold">{edu.institute}</span> |{" "}
                      {formatDateRange(edu.dateRange)}
                    </div>
                    {edu.description && <p className="mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Projects */}
          {data.projects?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)]">{proj.title}</div>
                    <div className="text-sm text-[var(--main-text)]">
                      <span className="font-semibold">{proj.type}</span> |{" "}
                      {formatDateRange(proj.dateRange)}
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

          {/* Skills */}
          {data.skills?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="font-bold bg-[var(--secondary)] text-white px-2 py-0.5 rounded text-xs"
                  >
                    {skill.value}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {/* Achievements */}
          {data.achievements?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Achievements
              </h2>
              <div className="space-y-1">
                {data.achievements.map((a, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)]">{a.title}</div>
                    <div className="text-sm text-[var(--main-text)]">
                      {a.institute ? (
                        <>
                          <span className="font-semibold">{a.institute}</span>
                          {" | "}
                        </>
                      ) : (
                        ""
                      )}
                      {formatDate(a.date)}
                    </div>
                    {a.description && <p className="text-sm mt-1">{a.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Activities */}
          {data.activities?.length ? (
            <section>
              <h2 className="font-bold uppercase text-sm text-[var(--primary)] border-b-2 border-[var(--secondary)] pb-1 mb-2">
                Activities
              </h2>
              <div className="space-y-1">
                {data.activities.map((act, i) => (
                  <div key={i}>
                    <div className="font-extrabold text-[var(--secondary)]">{act.title}</div>
                    <div className="text-sm text-[var(--main-text)]">
                      {act.locationOrCompany ? (
                        <>
                          <span className="font-semibold">{act.locationOrCompany}</span>
                          {" | "}
                        </>
                      ) : (
                        ""
                      )}
                      {act.dateRange ? formatDateRange(act.dateRange) : ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    );
  }
);

StandardTemplate.displayName = "StandardTemplate";
export default StandardTemplate;
