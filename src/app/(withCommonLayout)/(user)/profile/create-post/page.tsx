"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const CreatePost = () => {
  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FXInput name="title" label="Title" />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePost;
