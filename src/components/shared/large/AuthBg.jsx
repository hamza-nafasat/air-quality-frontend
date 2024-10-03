/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import authBg from "../../../assets/images/auth/auth.png";
import authLogo from "../../../assets/images/auth/logo.png";
import smAuthLogo from "../../../assets/images/logo.png";
import Button from "../small/Button";

const AuthBg = ({ Form }) => {
  return (
    <article
      className="bg-cover bg-center min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      <div className="container mx-auto min-h-screen  flex flex-col  min-w-screen ">
        <header className="w-full  py-4 flex items-center justify-between">
          <img
            className="w-32 lg:w-44 hidden xl:block"
            src={authLogo}
            alt="Air Quality"
          />

          <img src={smAuthLogo} alt="" className="w-10 h-9  block xl:hidden" />

          <section className="flex gap-1 md:gap-3">
            <Link to="/">
              <Button text="Login" width="w-[85px]" borderColor="#03a5e0" />
            </Link>
            <Link to="/signup">
              <Button
                text="Signup"
                width="w-[85px]"
                bg="bg-[none]"
                borderColor="white"
              />
            </Link>
          </section>
        </header>
        <main className="flex items-center  flex-grow  justify-center lg:justify-end w-full p-4 xl:p-0">
          <section className=" bg-white w-[40rem] p-4 py-10 lg:p-14 rounded-2xl ">
            <Form />
          </section>
        </main>
      </div>
    </article>
  );
};

export default AuthBg;
