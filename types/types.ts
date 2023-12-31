export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  followedBy: any;
  following: any;
  posts: any;
};

export type AuthResponseType = {
  data: {
    user: User;
    accessToken: string;
  };
};

export type PostType = {
  post: {
    id: string;
    title: string;
    content: string;
    image: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
    };
    comments: {
      id: string;
      body: string;
      userId: string;
      user: {
        firstName: string;
        lastName: string;
        displayName: string;
      };
      createdAt: string;
    }[];
    likes: {
      id: string;
      userId: string;
    }[];
    createdAt: string;
  };
};

export type SinglePostType = {
  id: string;
  title: string;
  content: string;
  image: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  comments: {
    id: string;
    body: string;
    userId: string;
    user: {
      firstName: string;
      lastName: string;
      displayName: string;
    };
    createdAt: string;
  }[];
  likes: {
    id: string;
    userId: string;
  }[];
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  posts: PostType[];
};

export type FollowType = {
  id: string;
  followerId: string;
  followingId: string;
  follower: string;
  following: string;
}