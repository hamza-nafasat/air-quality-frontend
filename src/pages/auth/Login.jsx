import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SlLock } from "react-icons/sl";
import TextField from "../../components/shared/small/TextField";
import { Link } from "react-router-dom";
import Button from "../../components/shared/small/Button";
import Mail from "../../assets/svgs/auth/Mail";
import Lock from "../../assets/svgs/auth/Lock";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <article className=" flex flex-col gap-4 p-1">
      <h2 className="text-center text-2xl xl:text-4xl  font-[700] ">Login</h2>
      <form className="flex flex-col gap-5 p-1" onSubmit={formSubmitHandler}>
        <TextField
          Icon={<Mail />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          autoFocus
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
        <section className="border-primary-lightGray p-4 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              className="w-3 xl:w-6 h-3 xl:h-6 border-none outline-none "
              type="checkbox"
              name="check"
              checked={checked}
              onChange={() => setChecked(!checked)}
              id="check"
            />
            <p
              className="select-none text-[12px] xl:text-[1rem]"
              onClick={() => setChecked(!checked)}
            >
              Remember Me
            </p>
          </div>

          <Link
            to={"/forget-password"}
            className="border-none outline-none bg-transparent text-primary-lightBlue text-[12px] xl:text-[1rem] font-[500]"
          >
            Forget Password?
          </Link>
        </section>
        <Button height="h-[4 8px]" text="Login" bg="bg-primary-lightBlue" />
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

export default Login;
