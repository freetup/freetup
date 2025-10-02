"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

const groupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z.string().optional(),
  logo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type GroupFormValues = z.infer<typeof groupSchema>;

const STEPS = [
  {
    id: 1,
    name: "Group Details",
    description: "Basic information about your group",
  },
  { id: 2, name: "Customize", description: "Add a logo and description" },
  { id: 3, name: "Review", description: "Review and create your group" },
];

export default function StartPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      logo: "",
    },
  });

  const onSubmit = async (data: GroupFormValues) => {
    const { error } = await authClient.organization.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      logo: data.logo,
    });

    if (error) {
      form.setError("root", { message: error.message });
      console.error(error);
    } else {
      console.log("Group created");

      router.push(`/${data.slug}`);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await form.trigger(["name", "slug"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["description", "logo"]);
    }

    if (isValid) {
      nextStep();
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    form.setValue("name", value);
    if (!form.formState.touchedFields.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Start a new group
          </h1>
          <p className="text-muted-foreground">
            Create your community and start organizing events
          </p>
        </div>

        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                      currentStep === step.id &&
                        "border-primary bg-primary text-primary-foreground",
                      currentStep > step.id &&
                        "border-primary bg-primary text-primary-foreground",
                      currentStep < step.id &&
                        "border-muted bg-background text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <svg
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>Completed</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-0.5 flex-1 transition-colors",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Group Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Awesome Community"
                          {...field}
                          onChange={(e) => handleNameChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a name that represents your community
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            freetup.com/
                          </span>
                          <Input
                            placeholder="my-awesome-community"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        This will be your group's unique URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Customize */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Tell people what your group is about..."
                          className="flex min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Help members understand what your group is about
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/logo.png"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add a logo to make your group more recognizable
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg border bg-muted/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Review Your Group
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Group Name
                      </p>
                      <p className="text-base">{form.watch("name")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        URL
                      </p>
                      <p className="text-base">
                        freetup.com/{form.watch("slug")}
                      </p>
                    </div>
                    {form.watch("description") && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Description
                        </p>
                        <p className="text-base">{form.watch("description")}</p>
                      </div>
                    )}
                    {form.watch("logo") && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Logo
                        </p>
                        <img
                          src={form.watch("logo")}
                          alt="Group logo"
                          className="mt-2 size-16 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              {currentStep < STEPS.length ? (
                <Button type="button" onClick={handleContinue}>
                  Continue
                </Button>
              ) : (
                <Button type="submit">Create Group</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
