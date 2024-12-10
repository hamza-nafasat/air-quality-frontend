import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/shared/small/Button";
import TextField from "../../components/shared/small/TextField";
import Lock from "../../assets/svgs/auth/Lock";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);

    setPassword("");
    setConfirmPassword("");
  };
  return (
    <article className="w-full flex flex-col gap-4">
      <h2 className="text-center text-2xl xl:text-4xl  font-[700] ">Reset Password</h2>
      <form className="flex flex-col w-full gap-5 " onSubmit={formSubmitHandler}>
        <TextField
          Icon={<Lock />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          Icon={<Lock />}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button height="h-[48px]" text="Submit" bg="bg-primary-lightBlue" />
      </form>

      <section className="flex w-full items-center justify-center gap-4 text-[12px] xl:text-[1rem]">
        <p>New User?</p>
        <Link to={"/signup"} className="text-primary-lightBlue">
          Signup
        </Link>
      </section>
    </article>
  );
};

export default ResetPassword;
