import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    "<?MyS3cr3t!>"
  );

  return res.status(201).json({
    user: {
      id: user.id,
      name: user.name,
    },
    token: token,
  });
};

export default createUserToken;
