import { cn } from "../../utils/cn.ts";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const motionProps = animate
    ? {
        variants,
        initial: "initial",
        animate: "animate",
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        },
        style: { backgroundSize: "400% 400%" },
      }
    : {};

  const backgroundClass = cn(
    "absolute inset-0 rounded-3xl z-[1] will-change-transform",
    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
  );

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        {...motionProps}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          backgroundClass
        )}
      />
      <motion.div {...motionProps} className={backgroundClass} />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
