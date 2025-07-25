"use client";

import { Badge } from "@/components/ui/badge";
import { cn, dateRangeToDuration, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Landmark, MailIcon, MapPinIcon, UserRound } from "lucide-react";
import { forwardRef } from "react";

const SidebarTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  ({ className, data, theme }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto bg-white shadow p-0 grid grid-cols-3 font-sans", className)}
        style={
          {
            "--primary": theme.primaryColor,
            "--secondary": theme.secondaryColor,
            "--sidebar-text": theme.sidebarTextColor,
            "--sidebar-background": theme.sidebarBackgroundColor ?? theme.primaryColor,
            "--main-text": theme.mainTextColor,
            // fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontFamily: '"Lato", sans-serif',
          } as React.CSSProperties
        }
      >
        {/* Sidebar */}
        <aside
          className="col-span-1 p-6 text-sm space-y-5"
          style={{
            backgroundColor: "var(--sidebar-background)",
            color: "var(--sidebar-text)",
          }}
        >
          {data.profilePhoto ? (
            <div className="w-full p-5">
              <div
                style={{
                  clipPath: "circle(50% at 50% 50%)",
                }}
              >
                <img
                  className="object-cover w-full h-full"
                  src={data.profilePhoto}
                  alt="profile photo"
                />
              </div>
            </div>
          ) : null}

          {data.links?.length ? (
            <div>
              <h2 className="uppercase text-base font-bold mb-1">Links</h2>
              <ul className="space-y-1">
                {data.links.map((link, i) => (
                  <li key={i}>
                    <p className="font-bold">{link.label}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline break-all"
                    >
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {data.skills?.length ? (
            <div>
              <h2 className="uppercase text-base font-bold mb-1">Skills</h2>
              <div className="flex flex-wrap gap-2 font-semibold">
                {data.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="bg-white font-semibold">
                    {skill.value}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {data.achievements?.length ? (
            <div>
              <h2 className="uppercase text-base font-bold mb-1">Achievements</h2>
              <ul className="space-y-1">
                {data.achievements.map((achievement, i) => (
                  <li key={i}>
                    <p className="font-semibold">{achievement.title}</p>
                    <div className="flex gap-x-3 gap-y-1 items-center flex-wrap">
                      <p className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(achievement.date)}</span>
                      </p>
                      {achievement.institute ? (
                        <p className="flex items-center gap-1 text-xs">
                          <Landmark className="w-3 h-3" />
                          <span>{achievement.institute}</span>
                        </p>
                      ) : null}
                    </div>
                    {achievement.description ? (
                      <p className="text-xs">{achievement.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {data.activities?.length ? (
            <div>
              <h2 className="uppercase text-base font-bold mb-1">Activities</h2>
              <ul className="space-y-1">
                {data.activities.map((activity, i) => (
                  <li key={i}>
                    <p className="font-semibold">{activity.title}</p>
                    <div className="flex gap-x-3 gap-y-1 items-center flex-wrap">
                      {activity.dateRange ? (
                        <p className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDateRange(activity.dateRange)}</span>
                        </p>
                      ) : null}
                      {activity.locationOrCompany ? (
                        <p className="flex items-center gap-1 text-xs">
                          <Landmark className="w-3 h-3" />
                          <span>{activity.locationOrCompany}</span>
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        {/* Main Content */}
        <main className="col-span-2 p-8 space-y-5 text-sm text-(--main-text)">
          {/* Basic Details */}
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold text-(--primary) uppercase leading-none">
                {data.fullName}
              </h1>
              <p className="mt-1 font-semibold text-(--primary) uppercase">{data.currentRole}</p>
            </div>

            <div className="shrink-0 text-xs flex flex-col gap-1">
              {data.location?.city || data.location?.country ? (
                <div className="flex gap-1 items-center">
                  <MapPinIcon className="h-4 w-4 text-(--primary)" />
                  <p>{[data.location?.city, data.location?.country].filter(Boolean).join(", ")}</p>
                </div>
              ) : null}
              <div className="flex gap-1 items-center">
                <MailIcon className="h-4 w-4 text-(--primary)" />
                <p>{data.email}</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          {data.workExperience?.length ? (
            <section>
              <h2 className="text-base uppercase font-semibold text-(--primary) border-b-2 border-(--primary)">
                Work Experience
              </h2>
              {data.workExperience.map((companyExp, i) => (
                <div key={i} className="mt-3">
                  {/* Company Name */}
                  <h5 className="font-semibold text-(--secondary) tracking-wide uppercase">
                    {companyExp.company}
                  </h5>

                  {/* Roles within this company */}
                  {companyExp.roles.map((role, j) => (
                    <div key={j} className="ml-2 my-2 border-l-2 pl-3 border-(--primary)">
                      <h3 className="font-extrabold text-(--primary)">{role.title}</h3>
                      <div className="flex gap-3 items-center">
                        <p className="flex items-center gap-1 text-xs text-(--main-text)">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {formatDateRange(role.dateRange)} ·{" "}
                            {dateRangeToDuration(role.dateRange)}
                          </span>
                        </p>
                        {role.location && (
                          <p className="flex items-center gap-1 text-xs text-(--main-text)">
                            <MapPinIcon className="h-3 w-3" />
                            <span>{role.location}</span>
                          </p>
                        )}
                      </div>
                      {role.description?.length > 0 && (
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {role.description.map((d, k) => (
                            <li key={k}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ) : null}

          {/* Education */}
          {data.education?.length ? (
            <section>
              <h2 className="text-base uppercase font-semibold text-(--primary) border-b-2 border-(--primary)">
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="my-1">
                  <h5 className="font-semibold text-(--secondary) tracking-wide uppercase">
                    {edu.institute}
                  </h5>
                  <h3 className="font-extrabold text-(--primary)">{edu.course}</h3>
                  <p className="flex items-center gap-1 text-xs text-(--main-text)">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateRange(edu.dateRange)}</span>
                  </p>
                  {edu.description && <p className="mt-1">{edu.description}</p>}
                </div>
              ))}
            </section>
          ) : null}

          {/* Projects */}
          {data.projects?.length ? (
            <section>
              <h2 className="text-base uppercase font-semibold text-(--primary) border-b-2 border-(--primary)">
                Projects
              </h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="my-1">
                  <h5 className="font-semibold text-(--secondary)">{proj.title}</h5>

                  <div className="flex gap-3 items-center">
                    <p className="flex items-center gap-1 text-xs text-(--main-text)">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateRange(proj.dateRange)}</span>
                    </p>
                    <p className="flex items-center gap-1 text-xs text-(--main-text)">
                      <UserRound className="w-3 h-3" />
                      <span>{proj.type}</span>
                    </p>
                  </div>
                  <ul className="list-disc pl-6 mt-1">
                    {proj.description?.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}
        </main>
      </div>
    );
  }
);

SidebarTemplate.displayName = "SidebarTemplate";
export default SidebarTemplate;
