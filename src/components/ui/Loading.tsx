import { Spinner } from "@heroui/spinner";

const Loading = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner color="success" size="lg" />
    </div>
  );
};

export default Loading;
