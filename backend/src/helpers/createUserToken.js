import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    "<?MyS3cr3t!>"
  );

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
      },
      token: token,
    },
  });
};

export default createUserToken;
