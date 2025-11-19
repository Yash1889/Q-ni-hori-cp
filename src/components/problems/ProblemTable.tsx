"use client";

import { useState } from "react";
import { Circle, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Problem {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    acceptanceRate: number;
    frequency: number;
    url: string;
    topics: string[];
}

interface ProblemTableProps {
    problems: Problem[];
}

export function ProblemTable({ problems }: ProblemTableProps) {
    const [search, setSearch] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);

    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = filterDifficulty ? problem.difficulty === filterDifficulty : true;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <div className="space-y-6">
            {/* Filter Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-muted/40 p-4 rounded-lg border">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search problems by title..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground my-auto mr-2">Filter:</span>
                    {["EASY", "MEDIUM", "HARD"].map((diff) => (
                        <button
                            key={diff}
                            onClick={() => setFilterDifficulty(filterDifficulty === diff ? null : diff)}
                            className={cn(
                                "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all h-9 px-4 border-2",
                                filterDifficulty === diff
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-background border-border hover:bg-accent hover:border-accent-foreground/20"
                            )}
                        >
                            {diff.charAt(0) + diff.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="bg-muted/50">
                            <tr className="border-b">
                                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[50px]">
                                    Status
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                                    Problem
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[120px]">
                                    Difficulty
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[100px]">
                                    Acceptance
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground w-[120px]">
                                    Frequency
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProblems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="h-32 text-center text-muted-foreground">
                                        No problems found. Try adjusting your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredProblems.map((problem) => (
                                    <tr
                                        key={problem.id}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <td className="p-4 align-middle">
                                            <button
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                aria-label="Mark as completed"
                                            >
                                                <Circle className="h-5 w-5" />
                                            </button>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={problem.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium hover:text-primary hover:underline flex items-center gap-1.5 transition-colors"
                                                    >
                                                        {problem.title}
                                                        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                                                    </a>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {problem.topics.slice(0, 4).map((topic) => (
                                                        <span
                                                            key={topic}
                                                            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border"
                                                        >
                                                            {topic}
                                                        </span>
                                                    ))}
                                                    {problem.topics.length > 4 && (
                                                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                                            +{problem.topics.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Badge
                                                variant={
                                                    problem.difficulty === "EASY"
                                                        ? "success"
                                                        : problem.difficulty === "MEDIUM"
                                                            ? "warning"
                                                            : "destructive"
                                                }
                                                className="font-semibold"
                                            >
                                                {problem.difficulty}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className="font-medium">
                                                {(problem.acceptanceRate * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                                                        style={{ width: `${Math.min(problem.frequency, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-8 text-right">
                                                    {problem.frequency.toFixed(0)}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                <span>
                    Showing <span className="font-medium text-foreground">{filteredProblems.length}</span> of{" "}
                    <span className="font-medium text-foreground">{problems.length}</span> problems
                </span>
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="text-primary hover:underline"
                    >
                        Clear search
                    </button>
                )}
            </div>
        </div>
    );
}
