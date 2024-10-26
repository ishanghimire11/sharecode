import React from "react";
import { auth } from "@clerk/nextjs/server";

import Dashboard from "./dashboard/page";

const Home = async () => {
  const { userId } = await auth();
  if (userId) {
    return <Dashboard />;
  }
  return <div>Home</div>;
};

export default Home;
