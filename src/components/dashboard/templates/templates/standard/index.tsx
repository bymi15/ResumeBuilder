"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { forwardRef } from "react";

const StandardTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-auto bg-white px-8 py-6 font-sans text-[13px] leading-[1.6]", className)}
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold uppercase text-black tracking-wide">
          {data.fullName || "Your Name"}
        </h1>
        <p className="text-black mt-1">
          {data.currentRole && <span className="font-bold">{data.currentRole}</span>}
          {" | "}
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
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Work Experience
            </h2>
            <div className="space-y-2">
              {data.workExperience.map((exp, i) => (
                <div key={i}>
                  <div className="font-extrabold text-black text-base mb-[-5px]">{exp.company}</div>
                  {exp.roles.map((role, j) => (
                    <div key={j} className="mt-1 text-sm">
                      <div className="font-semibold text-black">{role.title}</div>
                      <div className="text-gray-800">
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
            </div>
          </section>
        ) : null}

        {/* Education */}
        {data.education?.length ? (
          <section>
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <span className="text-base font-extrabold text-black">{edu.institute}</span>
                  <div className="text-sm text-gray-800">
                    <span className="font-semibold text-black">{edu.course}</span> |{" "}
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
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Projects
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="font-extrabold text-base text-black">{proj.title}</div>
                  <div className="text-sm">
                    <span className="font-semibold text-black">{proj.type}</span> |{" "}
                    {formatDateRange(proj.dateRange)}
                  </div>
                  <ul className="list-disc pl-5 mt-1 text-sm">
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
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-bold bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs"
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
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Achievements
            </h2>
            <div className="space-y-1">
              {data.achievements.map((a, i) => (
                <div key={i}>
                  <div className="font-extrabold text-base text-black">{a.title}</div>
                  <div className="text-sm text-gray-800">
                    {a.institute ? (
                      <>
                        <span className="font-semibold text-black">{a.institute}</span>
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
            <h2 className="font-bold uppercase text-sm text-black border-b-2 border-gray-500 pb-1 mb-1">
              Activities
            </h2>
            <div className="space-y-1">
              {data.activities.map((act, i) => (
                <div key={i}>
                  <div className="font-extrabold text-base text-black">{act.title}</div>
                  <div className="text-sm text-gray-800">
                    {act.locationOrCompany ? (
                      <>
                        <span className="font-semibold text-black">{act.locationOrCompany}</span>
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
});

StandardTemplate.displayName = "StandardTemplate";
export default StandardTemplate;
