"use client";
import { Divider } from "@heroui/divider";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";
import { allDistict } from "@bangladeshi/bangladesh-address";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";

import { AddIcon, TrashIcon } from "@/src/assets/icons";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import FXTextarea from "@/src/components/form/FXTextArea";
import dateToIso from "@/src/utils/dateToIso";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/ui/Loading";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    };
  });

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();
  const { mutate: handleCreatePost, isPending, isSuccess } = useCreatePost();
  const router = useRouter();

  const methods = useForm();
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      questions: data?.questions.map((que: { value: string }) => que?.value),
      dateFound: dateToIso(data.dateFound),
      user: user?._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
  };

  if (!isPending && isSuccess) {
    router.push("/");
  }

  return (
    <div>
      {isPending && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FXInput label="Title" name="title" />
            </div>
            <div className="min-w-fit flex-1">
              <FXDatePicker label="Found date" name="dateFound" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FXInput label="Location" name="location" />
            </div>
            <div className="min-w-fit flex-1">
              <FXSelect label="City" name="city" options={cityOptions} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FXSelect
                disabled={!categorySuccess}
                label="Category"
                name="category"
                options={categoryOption}
              />
            </div>
            <div className="min-w-fit flex-1">
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                multiple
                className="hidden"
                id="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </div>

          {imagePreviews.length > 0 && (
            <div className="flex gap-5 my-5 flex-wrap">
              {imagePreviews.map((imageDataUrl) => (
                <div
                  key={imageDataUrl}
                  className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                >
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                    src={imageDataUrl}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap-reverse gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FXTextarea label="Description" name="description" />
            </div>
          </div>

          <Divider className="my-5" />

          <div className="flex justify-between items-center mb-5">
            <h1 className="text-xl">Owner verification questions</h1>
            <Button isIconOnly onClick={() => handleFieldAppend()}>
              <AddIcon />
            </Button>
          </div>

          <div className="space-y-5">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FXInput label="Question" name={`questions.${index}.value`} />
                <Button
                  isIconOnly
                  className="h-14 w-16"
                  onClick={() => remove(index)}
                >
                  <TrashIcon />
                </Button>
              </div>
            ))}
          </div>

          <Divider className="my-5" />
          <div className="flex justify-end">
            <Button size="lg" type="submit">
              Post
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePost;
