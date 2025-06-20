"use client";

import React from "react";
import CreateGroupModal from "../contacts/_components/create-group-modal";

const page = () => {
  return (
    <div>
      <CreateGroupModal isOpen={true} />
    </div>
  );
};

export default page;
