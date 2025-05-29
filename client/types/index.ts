import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};



export type AuthResponse = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    __typename: "User";
  };
  accessToken: string;
  refreshToken: string;
  __typename: "AuthResponse";
};