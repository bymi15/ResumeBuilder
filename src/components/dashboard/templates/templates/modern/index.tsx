"use client";

import { Badge } from "@/components/ui/badge";
import { cn, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Mail, MapPinIcon, UserRound } from "lucide-react";
import { Fragment, forwardRef } from "react";

const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data, className, theme }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto p-8 bg-white font-sans text-sm leading-relaxed", className)}
        style={
          {
            "--primary": theme.primaryColor,
            "--secondary": theme.secondaryColor,
            "--main-text": theme.mainTextColor,
            color: "var(--main-text)",
            fontFamily: '"Segoe UI", Arial, sans-serif',
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <header className="border-b-2 border-[var(--secondary)] pb-4 mb-6">
          <h1 className="text-2xl font-bold text-[var(--primary)] uppercase">
            {data.fullName || "Your Name"}
          </h1>
          <h5 className="text-base font-medium text-[var(--primary)]">{data.currentRole}</h5>
          <div className="flex flex-wrap gap-4 text-xs text-(--secondary) mt-2">
            {data.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {data.email}
              </span>
            )}
            {data.location?.city || data.location?.country ? (
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" />
                {[data.location.city, data.location.country].filter(Boolean).join(", ")}
              </span>
            ) : null}
            <div className="ml-auto flex gap-1">
              {data.links?.map((link, i) => (
                <Fragment key={i}>
                  <a
                    key={link.url}
                    href={link.url}
                    className="text-blue-600 hover:underline break-words"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                  {i !== data.links!.length - 1 && <span className="text-gray-400">|</span>}
                </Fragment>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-1 space-y-5">
            {/* Skills */}
            {data.skills?.length ? (
              <section>
                <h2 className="text-[var(--primary)] font-bold uppercase mb-2">Skills</h2>
                <div className="text-xs flex flex-wrap gap-1">
                  {data.skills.map((skill, i) => (
                    <Badge variant="outline" className="text-(--primary) border-gray-200" key={i}>
                      {skill.value}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Projects */}
            {data.projects?.length ? (
              <section>
                <h2 className="text-[var(--primary)] font-bold uppercase mb-2">Key Projects</h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-[var(--secondary)]">{proj.title}</p>
                    <div className="flex gap-x-3 text-[10px] text-(--secondary)">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(proj.dateRange)}
                      </span>
                      {proj.type && (
                        <span className="flex items-center gap-1">
                          <UserRound className="w-3 h-3" />
                          {proj.type}
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-5 mt-1 text-xs space-y-0.5">
                      {proj.description.map((desc, j) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ) : null}

            {/* Activities */}
            {data.activities?.length ? (
              <section>
                <h2 className="text-[var(--primary)] font-bold uppercase mb-2">Activities</h2>
                {data.activities.map((activity, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-[var(--secondary)]">{activity.title}</p>
                    {activity.locationOrCompany ? (
                      <p className="font-semibold text-[var(--secondary)]">
                        {activity.locationOrCompany}
                      </p>
                    ) : null}
                    <div className="text-[10px] text-(--secondary)">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(activity.dateRange)}
                      </span>
                    </div>
                  </div>
                ))}
              </section>
            ) : null}
          </aside>

          {/* Main Column */}
          <main className="col-span-2 space-y-6">
            {/* Experience */}
            {data.workExperience?.length ? (
              <section>
                <h2 className="text-[var(--primary)] font-bold uppercase mb-2">
                  Professional Experience
                </h2>
                {data.workExperience.map((company, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-base font-bold text-[var(--secondary)]">
                      {company.company}
                    </h3>

                    {/* Roles */}
                    {company.roles?.map((role, j) => (
                      <div key={j} className="ml-3 border-l border-gray-200 pl-3 mt-2">
                        <p className="font-semibold">{role.title}</p>
                        {role.dateRange && (
                          <p className="text-[10px] text-(--secondary)">
                            {formatDateRange(role.dateRange)}
                          </p>
                        )}
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
                <h2 className="text-[var(--primary)] font-bold uppercase mb-2">Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">{edu.course}</p>
                    <p className="text-[var(--secondary)] uppercase">{edu.institute}</p>
                    <p className="flex items-center gap-1 text-[10px] text-(--secondary)">
                      <Calendar className="w-3 h-3" />
                      {formatDateRange(edu.dateRange)}
                    </p>
                  </div>
                ))}
              </section>
            ) : null}
          </main>
        </div>
      </div>
    );
  }
);

ModernTemplate.displayName = "ModernTemplate";
export default ModernTemplate;
