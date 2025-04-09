import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { usePathname, useRouter } from "next/navigation";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_CONGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_CONGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

//expand these two get better understand of whats happening, its basically a breakdown of componnents.
const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          RENT
          <span className="text-secondary-500 font-light hover:!text-primary-300">
            IFUL
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please signin/signup to
          continue
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4 ">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign up here
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          <Authenticator.SignUp.FormFields />{" "}
          {/*  is a built-in component of Amplify UI. , it You're overriding it inside SignUp by defining a FormFields() function inside components.SignUp   you're overriding Amplify's default behavior.*/}
          <RadioGroupField
            legend="Role"
            name="custom:role" // this is being extracted on the api.ts for getAuth query
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            {" "}
            {/** Try reserach on this FormFields a lil more too, */}
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },

    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

//this was the initial configuration
// const Auth = ({ children }: { children: React.ReactNode }) => {
//      const {user}=useAuthenticator((context)=>[context.user])
//   return (
//     <div className="h-full">
//       <Authenticator>{() => <>{children}</>}</Authenticator>
//     </div>
//   );
// };
// export default Auth;

const Auth = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]); //extracts the users, regardless of manager or tenant

  // Allow public routes without authentication
  // if (PUBLIC_ROUTES.includes(pathname) || user) {
  //   return <>{children}</>;
  // }

  const isAuthpage = pathname.match(/^\/(signup|signin)$/);

  const isDashboard =
    pathname.startsWith("tenant") || pathname.startsWith("manager"); // these are all protected routes, i.e any protected route starts with these 2

  useEffect(() => {
    if (user && isAuthpage) {
      router.push("/");
    }
  }, [user, isAuthpage, router]);

  //no auth for these pagges, as in landing, initial seaarch
  if (!isAuthpage && !isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="h-full   text-white">
      <Authenticator
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
      ;
    </div>
  );
};

export default Auth;

// dashboard? done
// Redirect authenticated users away from auth pages
// Allow access to public pages without authentication
