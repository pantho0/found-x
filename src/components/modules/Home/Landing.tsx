"use client";
import { Input } from "@nextui-org/input";

import { SearchIcon } from "../../ui/icons";
import { useForm } from "react-hook-form";

const Landing = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-[url('/lostimage.jpeg')] h-screen bg-cover">
      <div className="pt-32 max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("search")}
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            placeholder="Search"
            size="lg"
            startContent={<SearchIcon />}
          />
        </form>
      </div>
    </div>
  );
};

export default Landing;
