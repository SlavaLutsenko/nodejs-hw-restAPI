exports.serializeUserResponse = (user) => {
  return { user: serializeUser(user) };
};

const serializeUser = (user) => {
  return {
    email: user.email,
    subscription: user.subscription,
  };
};

exports.serializeLoginResponse = (user, token) => {
  const userSer = serializeUser(user);
  return { userSer, token };
};
