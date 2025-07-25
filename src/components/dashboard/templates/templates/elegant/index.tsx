"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { MailIcon, MapPinIcon } from "lucide-react";
import { forwardRef } from "react";

const ElegantTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto bg-white text-gray-800 font-[Inter] text-[13px] leading-[1.6] grid grid-cols-[30%_1fr] min-h-screen border border-gray-300",
        className
      )}
    >
      {/* Left Sidebar */}
      <aside className="bg-gray-50 px-6 py-6 border-r border-gray-200 flex flex-col">
        {/* Name & Role */}
        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-900 uppercase">
            {data.fullName || "Your Name"}
          </h1>
          {data.currentRole && (
            <p className="text-sm font-medium text-[#2563EB]">{data.currentRole}</p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-1 mb-6 text-sm">
          {data.email ? (
            <div className="flex items-center gap-1 text-xs text-gray-700">
              <MailIcon className="h-3 w-3" />
              <p>{data.email}</p>
            </div>
          ) : null}
          {data.location?.city || data.location?.country ? (
            <div className="flex items-center gap-1 text-xs text-gray-700">
              <MapPinIcon className="h-3 w-3" />
              {[data.location.city, data.location.country].filter(Boolean).join(", ")}
            </div>
          ) : null}
          {data.links?.length ? (
            <div className="text-[#2563EB] text-xs space-y-1 mt-3">
              {data.links.map((link, i) => (
                <div key={i}>
                  <a href={link.url} className="hover:underline" target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Skills */}
        {data.skills?.length ? (
          <div className="mb-6">
            <h2 className="uppercase text-xs font-semibold border-b border-gray-300 pb-1 mb-2 text-gray-800">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#2563EB]/10 text-[#2563EB] font-semibold px-2 py-0.5 rounded"
                >
                  {skill.value}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Achievements */}
        {data.achievements?.length ? (
          <section className="mb-6">
            <h2 className="uppercase text-xs font-semibold border-b border-gray-300 pb-1 mb-2 text-gray-800">
              Achievements
            </h2>
            <div className="space-y-2">
              {data.achievements.map((a, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-900">{a.title}</div>
                  <div className="text-xs text-gray-500">
                    {a.institute ? `${a.institute} | ` : ""}
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
          <section className="mb-6">
            <h2 className="uppercase text-xs font-semibold border-b border-gray-300 pb-1 mb-2 text-gray-800">
              Activities
            </h2>
            <div className="space-y-2">
              {data.activities.map((act, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-900">{act.title}</div>
                  <div className="text-xs text-gray-500">
                    {act.locationOrCompany ? `${act.locationOrCompany} | ` : ""}
                    {act.dateRange ? formatDateRange(act.dateRange) : ""}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </aside>

      {/* Right Content */}
      <main className="px-8 py-6">
        {/* Experience */}
        {data.workExperience?.length ? (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 border-b border-gray-300">
              Experience
            </h2>
            <div className="space-y-3">
              {data.workExperience.map((exp, i) => (
                <div key={i}>
                  <div className="font-bold text-[#2563EB]">{exp.company}</div>
                  {exp.roles.map((role, j) => (
                    <div key={j} className="mt-1">
                      <div className="text-sm font-semibold text-gray-800">{role.title}</div>
                      <div className="text-xs text-gray-600">
                        {formatDateRange(role.dateRange)}
                        {role.location ? ` | ${role.location}` : ""}
                      </div>
                      {role.description?.length ? (
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-0.5">
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
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 border-b border-gray-300">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold text-[#2563EB]">{edu.institute}</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {edu.course}
                    <span className="font-normal text-xs text-gray-600">
                      {" | "}
                      {formatDateRange(edu.dateRange)}
                    </span>
                  </div>
                  {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Projects */}
        {data.projects?.length ? (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 border-b border-gray-300">
              Projects
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="font-bold text-[#2563EB]">{proj.title}</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {proj.type}
                    <span className="font-normal text-xs text-gray-600">
                      {" | "}
                      {formatDateRange(proj.dateRange)}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                    {proj.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
});

ElegantTemplate.displayName = "ElegantTemplate";
export default ElegantTemplate;
