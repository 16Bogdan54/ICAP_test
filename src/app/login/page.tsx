import React from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/store";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
