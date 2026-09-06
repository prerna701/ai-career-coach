import { industries } from "@/data/industries";
import { getUserProfile } from "@/actions/user";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = async () => {
    const profile = await getUserProfile();
    return (
        <main>
            <OnboardingForm industries={industries} initialData={profile} />
        </main>
    )

};
export default OnboardingPage;
