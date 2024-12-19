import { useRouter } from "next/navigation";
import React, { FC } from "react";

type DisplayNameProps = {
  name: string;
  isClickable: boolean;
  routePath?: string
};

const DisplayName: FC<DisplayNameProps> = ({ name, isClickable, routePath = '' }) => {
    const router = useRouter();
  return (
    <p
      onClick={() => router.push(routePath)}
      className={`text-primary-text-dark hover:text-primary-hover ${isClickable ? "cursor-pointer" : "cursor-default"}`}
    >
      {name}
    </p>
  );
};

export default DisplayName;
