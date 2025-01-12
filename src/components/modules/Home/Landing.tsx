import { Input } from "@nextui-org/input";

import { SearchIcon } from "../../ui/icons";

const Landing = () => {
  return (
    <div className="bg-[url('/lostimage.jpeg')] h-screen bg-cover">
      <div className="pt-32 max-w-xl mx-auto">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          placeholder="Search"
          size="lg"
          startContent={<SearchIcon />}
        />
      </div>
    </div>
  );
};

export default Landing;
