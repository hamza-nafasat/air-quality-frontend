import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lock from "../../assets/svgs/auth/Lock";
import Button from "../../components/shared/small/Button";
import TextField from "../../components/shared/small/TextField";
import { useResetPasswordMutation } from "../../redux/apis/authApis";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location?.search?.split("=")?.[1];
  const [ResetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!password || !confirmPassword) return toast.error("Please fill all the fields");
      if (password !== confirmPassword) return toast.error("Passwords do not match");
      const response = await ResetPassword({ password, token }).unwrap();
      console.log("response while reset password ", response);
      if (response?.success) {
        toast.success(response?.message);
        return navigate("/login");
      }
    } catch (error) {
      console.log(" Error While Resetting Password In", error);
      toast.error(error?.data?.message || "Error occurred while logging in");
    }
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

export default ResetPassword;
