import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Mail from "../../assets/svgs/auth/Mail";
import Button from "../../components/shared/small/Button";
import TextField from "../../components/shared/small/TextField";
import { useForgetPasswordMutation } from "../../redux/apis/authApis";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please Enter Email first");
    try {
      const response = await forgetPassword({ email }).unwrap();
      console.log("response while forget password ", response);
      if (response.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(" Error While Forgetting Password In", error);
      toast.error(error?.data?.message || "Error occurred while logging in");
    }
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
        <Button disabled={isLoading} height="h-[48px]" text="Submit" bg="bg-primary-lightBlue" />
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
