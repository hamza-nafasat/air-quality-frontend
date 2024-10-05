import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../../components/shared/small/TextField";
import Mail from "../../assets/svgs/auth/Mail";
import Button from "../../components/shared/small/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(email);
    setEmail("");
  };

  return (
    <article className=" flex flex-col gap-4 p-1">
      <h2 className="text-center text-2xl xl:text-4xl  font-[700] ">Forget Password</h2>
      <p className="text-center  text-md xl:text-xl px-5">
        Enter your email for the verification process, we will send 4 a digit code to your email
      </p>
      <form className="flex flex-col gap-10 p-1" onSubmit={formSubmitHandler}>
        <TextField
          Icon={<Mail />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          autoFocus
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

export default ForgetPassword;
