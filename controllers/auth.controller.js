import bcrypt from "bcrypt";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Step : 1 -   Hash the password (npm i bcrypt)
  //Step : 2 -   create a new user and save in the database
  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  console.log("register endpoint", req.body);
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
