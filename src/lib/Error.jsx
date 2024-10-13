import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import errorImg from "../assets/images/error.png";
const Error = ({ message = "Something went wrong..." }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <img src={errorImg} alt="Error" className="w-1/3 max-w-xs mb-6" />
      <Alert variant="destructive" className="max-w-md w-full mb-6">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="space-y-3 w-full max-w-xs">
        <Button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors">
          Refresh
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Error;
