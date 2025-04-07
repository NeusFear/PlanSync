"use client";

import {
    faBook,
    faBookmark,
    faBuilding,
    faGear,
    faHome,
    faListCheck,
    faPlus, faSquareCaretDown,
    faUser,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {usePathname} from "next/navigation";
import {mergeClasses} from "@/lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CompanyType} from "@/lib/types";
import React from "react";
import Link from "next/link";

export type NavigationPage = {
    page: string;
    pageTitle: string;
    icon?: IconDefinition;
    subpages?: string[];
}

export function DashboardNavigation({company}: { company: CompanyType }) {

    const navigation = new Map<string, Map<string, NavigationPage>>([
        ["Main Pages", new Map<string, NavigationPage>([
            ["home", {page: "", pageTitle: "Home", icon: faHome}],
            ["projects", {page: "projects", pageTitle: "Projects", icon: faBuilding}],
            ["tasks", {page: "tasks", pageTitle: "Tasks", icon: faListCheck}],
            ["templates", {page: "templates", pageTitle: "Templates", icon: faBookmark, subpages: ["departments", "project-types"]}],
        ])],
        ["Knowledgebase", new Map<string, NavigationPage>([
            ["users", {page: "users", pageTitle: "User Directory", icon: faUser}],
            ["Wiki", {page: "wiki", pageTitle: "Company Wiki", icon: faBook}],
        ])],
        ["Admin Area", new Map<string, NavigationPage>([
            ["settings", {page: "settings", pageTitle: "settings", icon: faGear}],
            ["company-invite", {page: "invite", pageTitle: "Invite People", icon: faPlus}],
        ])],
    ]);

    const pathName = usePathname();

    return(
        <div className="w-64 bg-zinc-50 h-full flex flex-col pb-6">
            {Array.from(navigation.entries()).map(([sectionName, pagesMap]) => (
                <DashboardNavSection key={sectionName} name={sectionName} breakBefore={sectionName == "Admin Area"}>
                {Array.from(pagesMap.entries()).map(([key, pageData]) => (
                        <DashboardNavButton
                            key={key}
                            companyRoute={company.id}
                            pageRoute={pageData.page}
                            pageTitle={pageData.pageTitle}
                            icon={pageData?.icon}
                            active={pathName.split("/")[3] == pageData.page || (!pathName.split("/")[3] && pageData.pageTitle == "Home")}
                            subpages={pageData.subpages}
                        />
                ))}
                </DashboardNavSection>
            ))}
        </div>
    )
}

export function DashboardNavSection({name, children, breakBefore = false}: {
    name: string,
    children?: React.ReactNode,
    breakBefore?: boolean
}) {
    return(
        <div className={breakBefore ? "mt-auto" : ""}>
            <p className="text-zinc-500 pl-4 uppercase text-xs pt-6 font-semibold mb-1">{name}</p>
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    )
}

export function DashboardNavButton(
    {pageTitle, companyRoute, pageRoute, icon, active, subpages}: {
        pageTitle: string,
        icon?: IconDefinition,
        active: boolean,
        subpages?: string[],
        companyRoute?: string,
        pageRoute?: string
    }) {

    const pathName = usePathname();

    return(
        <div className="flex flex-col">
            <DashboardNavSubButton pageTitle={pageTitle} companyRoute={companyRoute} pageRoute={pageRoute} icon={icon} hasChildren={!!subpages} active={active && !pathName.split("/")[4]} />
            {active && subpages?.map(subPageRoute =>
                <DashboardNavSubButton key={subPageRoute} pageTitle={subPageRoute} companyRoute={companyRoute} pageRoute={pageRoute + "/" + subPageRoute} active={pathName.split("/")[3] == pageRoute && pathName.split("/")[4] == subPageRoute} />)
            }
        </div>
    )
}

export function DashboardNavSubButton(
    {pageTitle, companyRoute, pageRoute, icon, active, hasChildren = false}: {
        pageTitle: string,
        companyRoute?: string,
        pageRoute?: string,
        icon?: IconDefinition,
        active: boolean,
        hasChildren?: boolean
    }) {

    return(
        <Link
            href={"/dashboard/" + companyRoute + "/" + pageRoute}
            className={
                mergeClasses(
                    "flex flex-row gap-2 mx-2 px-2 py-0.5 group hover:bg-zinc-100 cursor-pointer",
                    active && "border-l-blue-400 bg-zinc-200 rounded-md hover:bg-zinc-200"
                )}>
            {icon && <FontAwesomeIcon className="mt-1.5 h-3 w-3 text-zinc-700 mx-2" icon={icon} />}
            <p
                className={
                    mergeClasses(
                        "text-zinc-500 group-hover:text-zinc-700 capitalize",
                        active && "text-zinc-900 font-semibold group-hover:text-black",
                        !icon && "ml-9"
                    )}>
                {pageTitle}
            </p>
            {hasChildren && <FontAwesomeIcon icon={faSquareCaretDown} className={
                mergeClasses(
                    "mt-1.25 h-3 w-3 text-zinc-300 ml-auto mr-1",
                    active && "text-zinc-400",
                )
            } />}
        </Link>
    )
}