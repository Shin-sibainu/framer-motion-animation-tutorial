import { motion } from "framer-motion";
import ThreeModel from "./components/ThreeModel";

//https://www.framer.com/motion/three-introduction/
function App() {
  return (
    <motion.main className="w-screen bg-slate-900 h-screen">
      <div className="container mx-auto w-full px-2">
        {/* header */}
        <motion.header
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            delay: 0.5,
            stiffness: 130,
          }}
          className="flex items-center justify-between h-16 text-white"
        >
          <span className="font-bold text-2xl">-Framer Website-</span>

          <nav className="hidden sm:block">
            <ul className="flex items-center gap-4">
              <li className="">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Examples</a>
              </li>
            </ul>
          </nav>
        </motion.header>

        {/* hero */}
        <section className="py-16 md:py-24 lg:py-48">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 0.7,
                  stiffness: 130,
                }}
                className="text-white lg:text-9xl font-bold tracking-tight lg:max-w-[40rem]"
              >
                Framer 3D Website
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 0.8,
                  stiffness: 130,
                }}
                className="text-white lg:max-w-[40rem] lg:text-5xl font-semibold"
              >
                The
                <span className="text-orange-500"> next </span>
                generation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 0.9,
                  stiffness: 130,
                }}
                className="flex items-center text-white gap-4"
              >
                <button className="py-3 px-6 border-2 rounded-md my-4 hover:translate-y-1 duration-150">
                  <span className="font-bold">More Details</span>
                </button>
                <button className="py-3 px-6 border-2 border-orange-500 rounded-md my-4 hover:translate-y-1 duration-150">
                  <span className="text-orange-500 font-bold">Samples</span>
                </button>
              </motion.div>
            </div>

            {/* 3d model */}
            <div className="w-1/2">
              <ThreeModel />
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}

export default App;
