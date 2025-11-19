import Link from "next/link";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-8 flex items-center space-x-2">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            LeetCode Explorer
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/companies"
                            className="transition-colors hover:text-primary text-foreground/80 hover:underline underline-offset-4"
                        >
                            Companies
                        </Link>
                        <Link
                            href="/topics"
                            className="transition-colors hover:text-primary text-foreground/80 hover:underline underline-offset-4"
                        >
                            Topics
                        </Link>
                        <Link
                            href="/dev-map"
                            className="transition-colors hover:text-primary text-foreground/80 hover:underline underline-offset-4"
                        >
                            Dev Map
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ThemeToggle />
                    <Link
                        href="https://github.com/liquidslr/leetcode-company-wise-problems"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 px-4 gap-2"
                    >
                        <Github className="h-4 w-4" />
                        <span className="hidden sm:inline">View Source</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
