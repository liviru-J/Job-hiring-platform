import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp fallbackRedirectUrl={"/"} signUpUrl={"/sign-up"} />
    </div>
  );
};

export default SignUpPage;
