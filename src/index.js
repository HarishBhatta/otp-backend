import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});
app.get("/api/hello", (req, res) => {
  res.send("Hello Worl");
});
app.post("/api/otp", async (req, res) => {
  try {
    const otp = req.body.otp;
    if (otp.toString().length === 6 && otp % 10 !== 7) {
      res.status(200).json({ message: "OTP Success" });
    } else if (otp.toString().length === 6 && otp % 10 === 7) {
      res.status(400).json({ message: "Last digit of OTP must not be 7" });
    } else {
      res.status(400).json({ message: "Verification Error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app;
