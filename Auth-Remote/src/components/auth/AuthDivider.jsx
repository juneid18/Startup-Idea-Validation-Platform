export function AuthDivider({ label = "or continue with email" }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-stone-200" />
      <span className="text-xs text-stone-400 font-medium whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  );
}
