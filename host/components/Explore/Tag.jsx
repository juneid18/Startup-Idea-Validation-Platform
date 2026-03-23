const Tag = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    stone: "bg-stone-50 text-stone-600 border-stone-100",
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100"
  };
  return (
    <span className={`text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default Tag;