"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { TbSticker } from "react-icons/tb";

export default function Home() {
  return (
    <main className="mx-auto mt-5 w-11/12 scroll-auto md:w-3/4">
      <div className="mt-48">
        <motion.h1
          className="text-center text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Life OS
        </motion.h1>
        <div className="mt-32 flex flex-col space-y-8">
          <motion.div
            className="flex flex-col items-center sm:mx-auto sm:flex-row sm:space-x-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <TbSticker size={42} />
            <p>Point 1</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:mx-auto sm:flex-row sm:space-x-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <TbSticker size={42} />
            <p>Point 2</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:mx-auto sm:flex-row sm:space-x-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <TbSticker size={42} />
            <p>Point 3</p>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 flex"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.1 }}
        >
          <Button
            onClick={() => signIn("github")}
            className="mx-auto"
            color="primary"
          >
            Get started
          </Button>
        </motion.div>
        <motion.p
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.3 }}
        >
          or{" "}
          <button
            onClick={() => signIn("github")}
            className="text-center underline"
          >
            login
          </button>
        </motion.p>
      </div>
    </main>
  );
}
