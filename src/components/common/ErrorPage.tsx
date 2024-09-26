import Link from "next/link";
import React from "react";

import Button from "@/components/common/Button";

const ERROR_MESSAGE = {
  404: "Page not found",
  401: "Unauthorized",
  400: "Bad request",
  500: "Something went wrong",
};

type ErrorPageProps = {
  error: any;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const statusCode: keyof typeof ERROR_MESSAGE = error.status || 500;
  const errorMessage = ERROR_MESSAGE[statusCode];

  return (
    <div className='flex w-full items-start justify-center bg-white'>
      <div className='w-full max-w-sm p-8'>
        <h1 className='mb-4 text-6xl font-bold text-gray-800'>{statusCode}!</h1>

        <p className='mb-8 text-xl text-gray-700'>{errorMessage}</p>

        <div className='flex flex-col space-y-4'>
          <Button
            onClick={reset}
            className='btn-1 flex justify-center text-base'
          >
            Try again
          </Button>

          <Link
            href='/'
            className='hover:bg-primary-light rounded px-4 py-2 text-center font-semibold text-gray-700 transition duration-300'
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
