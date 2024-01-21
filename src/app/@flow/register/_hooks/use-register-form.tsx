import React, { useReducer } from "react";

export type RegisterUser = {
  username?: string;
  email?: string;
  password?: string;
  dob: {
    month?: string;
    day?: string;
    year?: string;
  };
};
export const RegisterUserContext = React.createContext<RegisterUser | null>(
  null,
);
export const RegisterUserDispatchContext = React.createContext<
  React.Dispatch<Partial<RegisterUser>>
>(() => {});

export const RegisterUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, dispatch] = useReducer(reducerFn, {
    username: "",
    email: "",
    password: "",
    dob: {},
  });
  return (
    <RegisterUserContext.Provider value={user}>
      <RegisterUserDispatchContext.Provider value={dispatch}>
        {children}
      </RegisterUserDispatchContext.Provider>
    </RegisterUserContext.Provider>
  );
};

const reducerFn = (
  current: RegisterUser,
  update: Partial<RegisterUser> | null,
): RegisterUser => {
  const newState = { ...current, ...update };
  return newState;
};
