/* eslint-disable react/prop-types */

const TextField = ({ label, Icon, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm md:text-base font-[600]">{label}</label>}
      <section className="w-full border rounded-[10px] border-primary-lightGray px-4 flex items-center gap-3">
        {Icon && Icon}
        <input
          autoCapitalize="off"
          className="w-full border-none bg outline-none text-sm md:text-base h-[50px] md:h-[55px]"
          {...rest}
        />
      </section>
    </div>
  );
};

export default TextField;
