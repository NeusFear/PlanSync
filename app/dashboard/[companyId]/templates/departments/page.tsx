import {DepartmentType, InternalUserType, UserType} from "@/lib/types";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import DepartmentsPageUI from "@/components/dashboard/templates/departments/DepartmentsPageUI";

export default async function CompanyDashboardTemplatesDepartmentsPage({ params }: { params: { companyId: string } }) {

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/signin");
    }

    const { data: user, error: userError } = await supabase.from("user").select("*").eq("auth_id", authData.user.id).single<UserType>();

    if (userError || !user) {
        redirect("/account");
    }

    const { companyId } = await params;

    const { data: internalUser, error: internalUserError } = await supabase.from("internal_user").select("*").eq("user", user.id).eq("company", companyId).single<InternalUserType>();

    if (internalUserError || !internalUser) {
        return (
            <div>
                <p>{internalUserError?.message}</p>
                <p>{user.id}</p>
            </div>
        )
    }

    const { data: department } = await supabase.from("department")
        .select(`
            id,
            name,
            description,
            code,
            company (
                id
            ),
            department_head (
                id,
                user (
                    first,
                    last
                )
            )
        `)
        .eq("company.id", internalUser?.company)
        .overrideTypes<Array<DepartmentType>, object>();

    return(
        <DepartmentsPageUI departments={department!} />
    )
}
