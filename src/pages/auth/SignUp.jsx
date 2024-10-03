import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lock from "../../assets/svgs/auth/Lock";
import Mail from "../../assets/svgs/auth/Mail";
import User from "../../assets/svgs/auth/User";
import Button from "../../components/shared/small/Button";
import TextField from "../../components/shared/small/TextField";
import { useRegisterMutation } from "../../redux/apis/authApis";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const [registerUser, { isLoading }] = useRegisterMutation("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return toast.error("Please fill all the fields");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      if (response?.success) {
        console.log("response while signUp ", response);
        toast.success(response?.message);
        return navigate("/dashboard");
      }
    } catch (error) {
      console.log(" Error While Signing Up", error);
    }
  };

  return (
    <article className="w-full flex flex-col gap-4">
      <h2 className="text-center text-2xl xl:text-4xl  font-[700] ">SignUp</h2>
      <form className="flex flex-col w-full gap-5 " onSubmit={formSubmitHandler}>
        <div className="flex flex-col xl:flex-row gap-4 min-w-full">
          <TextField
            Icon={<User />}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            autoFocus
            required
          />
          <TextField
            Icon={<User />}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <TextField
          Icon={<Mail />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
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
        <section className="border-primary-lightGray p-4 flex justify-between items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer">
            <input
              className="w-3 xl:w-6 h-3 xl:h-6 border-none outline-none "
              type="checkbox"
              name="check"
              checked={checked}
              onChange={() => setChecked(!checked)}
              id="check"
            />
            <p
              className="select-none w-full text-[12px] xl:text-[1rem]"
              onClick={() => setChecked(!checked)}
            >
              I’m agree with the{" "}
              <span className="text-primary-lightBlue font-bold text-[12px] xl:text-[1rem]">
                Terms & Conditions.
              </span>
            </p>
          </div>
        </section>
        <Button height="h-[48px]" text="SignUp" bg="bg-primary-lightBlue" />
      </form>

      <section className="flex w-full items-center justify-center gap-4 text-[12px] xl:text-[1rem]">
        <p>Already have account?</p>
        <Link to={"/"} className="text-primary-lightBlue">
          Login
        </Link>
      </section>
    </article>
  );
};

export default SignUp;
