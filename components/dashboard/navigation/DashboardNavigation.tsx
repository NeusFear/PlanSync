"use client";

import {
    faBuilding,
    faGear,
    faHome,
    faListCheck,
    faPlus,
    faUser,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {usePathname, useRouter} from "next/navigation";
import {mergeClasses} from "@/lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CompanyType} from "@/lib/types";
import React from "react";

export type NavigationPage = {
    page: string;
    pageTitle: string;
    icon: IconDefinition;
}

export function DashboardNavigation({company}: { company: CompanyType }) {

    const navigation = new Map<string, Map<string, NavigationPage>>([
        ["Main Pages", new Map<string, NavigationPage>([
            ["home", {page: "", pageTitle: "Home", icon: faHome}],
            ["users", {page: "users", pageTitle: "Users", icon: faUser}],
            ["projects", {page: "projects", pageTitle: "Projects", icon: faBuilding}],
            ["tasks", {page: "tasks", pageTitle: "Tasks", icon: faListCheck}],
        ])],
        ["Admin Area", new Map<string, NavigationPage>([
            ["settings", {page: "settings", pageTitle: "settings", icon: faGear}],
            ["company-invite", {page: "invite", pageTitle: "Invite People", icon: faPlus}],
        ])],
    ]);

    const router = useRouter();
    const pathName = usePathname();

    const handleClick = (pageRoute: string) => {
        router.push("/dashboard/" + company.id + "/" + pageRoute);
    }

    return(
        <div className="w-64 bg-zinc-50 h-full flex flex-col pb-6">
            {Array.from(navigation.entries()).map(([sectionName, pagesMap]) => (
                <DashboardNavSection key={sectionName} name={sectionName} breakBefore={sectionName == "Admin Area"}>
                {Array.from(pagesMap.entries()).map(([key, pageData]) => (
                        <DashboardNavButton
                        key={key}
                        pageTitle={pageData.pageTitle}
                        icon={pageData.icon}
                        active={pathName.split("/")[3] == pageData.page || (!pathName.split("/")[3] && pageData.pageTitle == "Home")}
                        click={() => handleClick(pageData.page)}/>
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
    {pageTitle, icon, active, click}: {
        pageTitle: string,
        icon: IconDefinition,
        active: boolean,
        click?: () => void
    }) {

    return(
        <button onClick={click} className={mergeClasses("flex flex-row gap-2 mx-2 px-2 py-0.5 group hover:bg-zinc-100 cursor-pointer",
        active && "border-l-blue-400 bg-zinc-200 rounded-md hover:bg-zinc-200")}>
        <FontAwesomeIcon className="mt-1.5 h-3 w-3 text-zinc-700 hover:text-blue-400 mx-2" icon={icon} />
        <p className={mergeClasses("text-zinc-500 group-hover:text-zinc-700 capitalize", active && "text-zinc-900 font-semibold group-hover:text-black")}>{pageTitle}</p>
        </button>
    )
}