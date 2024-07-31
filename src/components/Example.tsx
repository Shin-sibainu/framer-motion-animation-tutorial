import { motion } from "framer-motion";

const Example = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.5,
          damping: 10,
          stiffness: 100,
        }}
        className="w-28 h-28 bg-red-500 rounded-full"
      ></motion.div>
    </div>
  );
};

export default Example;
