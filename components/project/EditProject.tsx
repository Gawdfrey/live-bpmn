import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { DangerButton, PrimaryButton } from "../Button";
import PlusIcon from "../icons/PlusIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "utils/trpc";
import { FormFieldError } from "../FormFieldError";
import CancelIcon from "components/icons/CancelIcon";
import { useRouter } from "next/router";

export function EditProject({
  callback,
  id,
  defaultValues,
}: {
  callback?: () => void;
  id: string;
  defaultValues: FormValues;
}) {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(EditProject.validationSchema),
  });
  const { handleSubmit, register, formState } = methods;
  const { mutate: submitMutatation, isLoading: submitIsLoading } =
    trpc.updateProjectById.useMutation();
  const { mutate: deleteMutation, isLoading: deleteIsLoading } =
    trpc.deleteProjectById.useMutation();
  function onSubmit({ name }: FormValues) {
    submitMutatation({ name, id });
    if (callback) callback();
  }

  function onDelete() {
    deleteMutation(id);
    router.push("/projects");
  }

  const error = formState.errors.name?.message;
  const isLoading = submitIsLoading || deleteIsLoading;
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
        <div className="flex gap-2">
          <PrimaryButton type="submit" isLoading={isLoading}>
            <div className="my-auto">
              <PlusIcon />
            </div>
            <span>Submit</span>
          </PrimaryButton>
          <DangerButton type="button" onClick={onDelete} isLoading={isLoading}>
            <div className="my-auto">
              <CancelIcon />
            </div>
            <span>Delete</span>
          </DangerButton>
        </div>
      </form>
    </FormProvider>
  );
}

EditProject.validationSchema = z.object({
  name: z.string().min(1).max(50),
});

type FormValues = z.infer<typeof EditProject.validationSchema>;
