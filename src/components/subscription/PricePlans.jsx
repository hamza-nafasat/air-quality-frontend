/* eslint-disable react/prop-types */
import { planCards } from "../../data/data";
import PriceCard from "./PriceCard";

const PricePlans = ({ onSelectPlan }) => {
  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between items-center">
        <div className="my-2 md:my-5">
          <h4 className="text-base lg:text-lg font-[600] text-[#414141] leading-[27px]">My Subscription Plans</h4>
          <p className="text-[#03A5E0] text-sm  lg:text-base leading-[27px]">Manage Your Plans</p>
        </div>
        {/* <Button text="Trials End in" className="w-full xl:w-fit p-5 " /> */}
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {planCards.map((card, i) => (
          <PriceCard key={i} card={card} onSelectPlan={onSelectPlan} />
        ))}
      </div>
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:gap-0 gap-2">
        <div>
          <h1 className="text-base lg:text-lg font-[500]">Experience Our Service for Free!</h1>
          <p className=" text-xs lg:text-sm text-[#00000070] ">
            Get full access to all features with a no-obligation 14-day free trial
          </p>
        </div>

        {/* <Button text="Start Your Free Trial Now " width="w-fit" /> */}
      </section>
    </div>
  );
};

export default PricePlans;
