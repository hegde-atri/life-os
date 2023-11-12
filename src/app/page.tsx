"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  TbMobiledata,
  TbMoodCheck,
  TbTimelineEventExclamation,
} from "react-icons/tb";

export default function Home() {
  let session = useSession();
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
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <TbMobiledata size={42} />
            <p>Balance your activites</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:mx-auto sm:flex-row sm:space-x-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <TbTimelineEventExclamation size={42} />
            <p>Prioritise tasks that matter</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:mx-auto sm:flex-row sm:space-x-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <TbMoodCheck size={42} />
            <p>Maintain a balanced lifestyle</p>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 flex"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.1 }}
        >
          {session.status === "loading" ||
          session.status === "unauthenticated" ? (
            <div className="mx-auto">
              <Button onClick={() => signIn("github")} color="primary">
                Get started
              </Button>
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
          ) : (
            <div className="mx-auto">
              <Button onClick={() => redirect("/dashboard")} color="primary">
                Dashboard
              </Button>
              <motion.p
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                or{" "}
                <button
                  onClick={() => signOut()}
                  className="text-center underline"
                >
                  signout
                </button>
              </motion.p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
