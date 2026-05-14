import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  linux: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  windows: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  dev: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  segurança: "bg-red-500/10 text-red-400 border-red-500/20",
  hardware: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  dicas: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function getColorClasses(category: string): string {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(categoryColors)) {
    if (key.includes(k)) return v;
  }
  return "bg-amber-500/10 text-amber-400 border-amber-500/20";
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
        getColorClasses(category),
        className
      )}
    >
      {category}
    </span>
  );
}
