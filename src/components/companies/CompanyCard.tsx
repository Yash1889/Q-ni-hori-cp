import Link from "next/link";
import { Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
    name: string;
    slug: string;
    problemCount: number;
    className?: string;
}

export function CompanyCard({ name, slug, problemCount, className }: CompanyCardProps) {
    return (
        <Link
            href={`/company/${slug}`}
            className={cn(
                "group relative flex flex-col justify-between rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/50",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-primary transition-all group-hover:scale-110 group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                    <Building2 className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {problemCount}
                </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors text-base">
                    {name}
                </h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
        </Link>
    );
}
