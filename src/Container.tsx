import { cn } from "./utilities";

const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-white flex py-4 rounded-xl shadow-sm",
        props.className
      )}
    />
  );
};

export default Container;
