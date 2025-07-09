'use server';

export async function getEnvironmentVariables() {
  // In a real application, be extremely careful about exposing environment variables.
  // We are only doing this for debugging purposes in a controlled development environment.
  
  const envVars = process.env;

  return {
    ...envVars,
  };
}

