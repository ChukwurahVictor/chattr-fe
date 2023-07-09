export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthResponseType = {
  data: {
    user: User;
    accessToken: string;
  };
};
