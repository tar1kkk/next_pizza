import {redirect} from "next/navigation";
import {getUserSession} from "@/shared/lib/get-user-sesson";
import {prisma} from "@/prisma/prisma-client";
import {ProfileForm} from "@/shared/components/shared/profile-form";

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id)
        }
    });

    if (!user) {
        return redirect('/not-found');  // Перенаправление, если пользователь не найден
    }

    return <ProfileForm data={user} />
}
