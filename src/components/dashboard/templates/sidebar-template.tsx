"use client";

import { Badge } from "@/components/ui/badge";
import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { Calendar, Landmark, MailIcon, MapPinIcon, UserRound } from "lucide-react";
import { forwardRef } from "react";
import { getTemplateTheme } from "./template-registry";

const SidebarTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ className, data }, ref) => {
  const theme = getTemplateTheme(data.templateTheme).theme;

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto bg-white shadow p-0 grid grid-cols-3 min-h-screen font-sans",
        className
      )}
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
              <img className="object-cover w-full h-full" src={data.profilePhoto} />
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
      <main className="col-span-2 p-8 space-y-5 text-sm" style={{ color: "var(--main-text)" }}>
        {/* Basic Details */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-(--primary) uppercase leading-none">
              {data.fullName}
            </h1>
            <p className="mt-1 font-semibold text-(--secondary) uppercase">{data.currentRole}</p>
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
            <h2 className="text-lg font-semibold text-(--primary)">Work Experience</h2>
            {data.workExperience.map((exp, i) => (
              <div key={i} className="mb-2">
                <h3 className="font-bold text-(--secondary) tracking-wide">{exp.title}</h3>
                <h5 className="font-bold text-(--secondary) tracking-wide uppercase">
                  {exp.company}
                </h5>
                <div className="flex gap-3 items-center">
                  <p className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateRange(exp.dateRange)}</span>
                  </p>
                  {exp.location ? (
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </p>
                  ) : null}
                </div>
                <ul className="list-disc pl-6 mt-1">
                  {exp.description?.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ) : null}

        {/* Education */}
        {data.education?.length ? (
          <section>
            <h2 className="text-lg font-semibold text-(--primary)">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <h3 className="font-bold text-(--secondary)">{edu.course}</h3>
                <h5 className="font-bold text-(--secondary) tracking-wide uppercase">
                  {edu.institute}
                </h5>
                <p className="flex items-center gap-1 text-xs text-gray-500">
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
            <h2 className="text-lg font-semibold text-(--primary)">Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <h3 className="font-bold text-(--secondary)">{proj.title}</h3>

                <div className="flex gap-3 items-center">
                  <p className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateRange(proj.dateRange)}</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs text-gray-500">
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
});

export default SidebarTemplate;
