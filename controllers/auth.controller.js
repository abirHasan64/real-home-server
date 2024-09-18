import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //  Step : 1 -   Hash the password (npm i bcrypt)
    //  hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //    Step : 2 -   create a new user and save in the database
    //    create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Faile to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //   Step : 5 - Check user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //   Step : 6 - Check if password is correct
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    //   Step : 7 - if password is correct generate a cookie token and send it to the user
    res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
  } catch (err) {
    console.log(first);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {};
