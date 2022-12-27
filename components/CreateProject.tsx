import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PrimaryButton } from "./Button";
import PlusIcon from "./icons/PlusIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "utils/trpc";
import { useSession } from "next-auth/react";
import { FormFieldError } from "./FormFieldError";

export default function CreateProject() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const methods = useForm<CreateProjectType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateProject.validationSchema),
  });
  const { handleSubmit, register, formState } = methods;
  const { mutate } = trpc.createProject.useMutation();
  function onSubmit({ name }: CreateProjectType) {
    mutate({ name, user: userId! });
  }

  const error = formState.errors.name?.message;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <div className="flex flex-col gap-2">
            <div>
              <input
                type="text"
                {...register("name")}
                className="border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
            <FormFieldError error={error} />
          </div>
        </div>
        <div>
          <PrimaryButton type="submit">
            <div className="my-auto">
              <PlusIcon />
            </div>
            <span>Create</span>
          </PrimaryButton>
        </div>
      </form>
    </FormProvider>
  );
}

CreateProject.validationSchema = z.object({
  name: z.string().min(1).max(50),
});

type CreateProjectType = {
  name: string;
};
