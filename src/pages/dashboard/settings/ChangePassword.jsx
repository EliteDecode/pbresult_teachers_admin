import React, { useState } from "react";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import settingsImg from "../../../assets/icons/padlock.png";
import { Box, Grid } from "@mui/material";
import UpdatePasswordForm from "@/components/Forms/UpdatePasswordForm";

const ChangePassword = () => {
  return (
    <Box>
      <HeaderTitle
        img={settingsImg}
        title="Settings"
        subtitle="Update your password"
      />

      <Box className="mt-5">
        <UpdatePasswordForm />
      </Box>
    </Box>
  );
};

export default ChangePassword;
