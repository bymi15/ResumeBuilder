"use client";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Landmark, MapPinIcon, UserRound } from "lucide-react";
import { forwardRef } from "react";

const CompactTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto p-6 font-sans text-xs leading-normal bg-white text-gray-800",
        className
      )}
    >
      {/* Header */}
      <header className="flex justify-between border-b border-gray-300 pb-3 mb-3">
        <div>
          <h1 className="text-xl font-bold uppercase text-black">{data.fullName || "Your Name"}</h1>
          <p className="text-gray-600">
            {data.currentRole && <strong>{data.currentRole}</strong>}
            {data.email && ` | ${data.email}`}
            {data.location?.city || data.location?.country
              ? ` | ${[data.location.city, data.location.country].filter(Boolean).join(", ")}`
              : ""}
          </p>
        </div>
        {data.links?.length ? (
          <div className="text-right space-y-1">
            {data.links.map((link, i) => (
              <p key={i}>
                <a
                  href={link.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        ) : null}
      </header>

      <div className="grid grid-cols-3 gap-4">
        {/* Main column */}
        <main className="col-span-2 space-y-3">
          {/* Work Experience */}
          {data.workExperience?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Experience</h2>
              {data.workExperience.map((company, i) => (
                <div key={i} className="mb-3">
                  <h3 className="text-gray-800 font-bold text-sm">{company.company}</h3>
                  {company.roles?.map((role, j) => (
                    <div key={j} className="mb-2 pl-3 border-l border-gray-300">
                      <p className="font-semibold text-gray-700">{role.title}</p>
                      <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-600 mt-0.5">
                        {role.dateRange && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateRange(role.dateRange)}
                          </span>
                        )}
                        {role.location && (
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            {role.location}
                          </span>
                        )}
                      </div>
                      {role.description?.length ? (
                        <ul className="list-disc pl-5 mt-1 text-xs space-y-0.5">
                          {role.description.map((desc, k) => (
                            <li key={k}>{desc}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ) : null}

          {/* Education */}
          {data.education?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-gray-700">{edu.course}</p>
                  <p className="uppercase text-gray-600">{edu.institute}</p>
                  <p className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDateRange(edu.dateRange)}
                  </p>
                  {edu.description && <p className="text-xs mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </section>
          ) : null}

          {/* Projects */}
          {data.projects?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-gray-700">{proj.title}</p>
                  <div className="flex gap-x-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDateRange(proj.dateRange)}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserRound className="w-3 h-3" />
                      {proj.type}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-xs space-y-0.5">
                    {proj.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}
        </main>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Skills */}
          {data.skills?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs">
                    {skill.value}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {/* Achievements */}
          {data.achievements?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Achievements</h2>
              {data.achievements.map((ach, i) => (
                <div key={i} className="mb-1">
                  <p className="font-semibold text-gray-700">{ach.title}</p>
                  <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-500">
                    {ach.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ach.date)}
                      </span>
                    )}
                    {ach.institute && (
                      <span className="flex items-center gap-1">
                        <Landmark className="w-3 h-3" />
                        {ach.institute}
                      </span>
                    )}
                  </div>
                  {ach.description && <p className="text-xs mt-0.5">{ach.description}</p>}
                </div>
              ))}
            </section>
          ) : null}

          {/* Activities */}
          {data.activities?.length ? (
            <section>
              <h2 className="font-bold uppercase text-black mb-1">Activities</h2>
              {data.activities.map((act, i) => (
                <div key={i} className="mb-1">
                  <p className="font-semibold text-gray-700">{act.title}</p>
                  <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-500">
                    {act.dateRange && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(act.dateRange)}
                      </span>
                    )}
                    {act.locationOrCompany && (
                      <span className="flex items-center gap-1">
                        <Landmark className="w-3 h-3" />
                        {act.locationOrCompany}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
});

CompactTemplate.displayName = "CompactTemplate";
export default CompactTemplate;
