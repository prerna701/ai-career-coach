"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { Loader2, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updatedUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      industry: "",
      subIndustry: "",
      experience: "",
      skills: "",
      bio: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry}`
        .toLowerCase()
        .replace(/ /g, "-");

      await updatedUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  const watchIndustry = watch("industry");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors`}>
      {/* Background */}
      <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg- qblack/50 dark:bg-black/70" />

        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800 shadow"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </button>

        {/* Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16 lg:py-24 h-full text-white dark:text-gray-200">
          {/* Left panel */}
          <div className="max-w-lg space-y-6 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold">
              Unlock Your Career Potential 
            </h1>
            <p className="text-lg opacity-90">
              Let’s complete your profile in just a few steps.
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-300/40 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <p className="text-sm">Step {step} of 3</p>
          </div>

          {/* Right panel (form) */}
          <Card className="w-full max-w-md bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl rounded-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {step === 1 && "Step 1: Industry"}
                {step === 2 && "Step 2: Experience & Skills"}
                {step === 3 && "Step 3: Bio"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {step === 1 && "Choose your industry & specialization"}
                {step === 2 && "Tell us about your experience and skills"}
                {step === 3 && "Write a short professional bio"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Step 1: Industry */}
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        onValueChange={(value) => {
                          setValue("industry", value);
                          setSelectedIndustry(
                            industries.find((ind) => ind.id === value)
                          );
                          setValue("subIndustry", "");
                        }}
                      >
                        <SelectTrigger id="industry" className="bg-white dark:bg-gray-800">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem value={ind.id} key={ind.id}>
                              {ind.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.industry && (
                        <p className="text-sm text-red-500">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>

                    {watchIndustry && (
                      <div className="space-y-2">
                        <Label htmlFor="subIndustry">Specialization</Label>
                        <Select
                          onValueChange={(value) => {
                            setValue("subIndustry", value);
                          }}
                        >
                          <SelectTrigger id="subIndustry" className="bg-white dark:bg-gray-800">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedIndustry?.subIndustries?.map((ind, idx) => (
                              <SelectItem value={ind} key={idx}>
                                {ind}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.subIndustry && (
                          <p className="text-sm text-red-500">
                            {errors.subIndustry.message}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Step 2: Experience & Skills */}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="Enter years of experience"
                        className="bg-white dark:bg-gray-800"
                        {...register("experience")}
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Input
                        id="skills"
                        placeholder="e.g Python, JavaScript, Project Management"
                        className="bg-white dark:bg-gray-800"
                        {...register("skills")}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Separate skills with commas
                      </p>
                      {errors.skills && (
                        <p className="text-sm text-red-500">
                          {errors.skills.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Step 3: Bio */}
                {step === 3 && (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      className="h-32 bg-white dark:bg-gray-800"
                      placeholder="Write your professional bio..."
                      {...register("bio")}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-500">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Step Controls */}
                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-1/2 rounded-md bg-gray-800 font-bold shadow-lg hover:scale-105 transition-transform duration-300 gradient-title border border-white"

                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
