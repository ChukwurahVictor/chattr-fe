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

export type PostType = {
    id: string;
    title: string;
    content: string;
    image: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
    },
    comments: {
      id: string;
      body: string;
      userId: string;
    }[];
    likes: {
      id: string;
      userId: string
    }[];
    createdAt: string;
};