import { promises as fs } from "fs";
import path from "path";

async function getData() {
    const filePath = path.join(process.cwd(), "src/data/data_dump.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
}

export default async function DevMapPage() {
    const data = await getData();

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">Developer Map</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Diagnostics and data mapping statistics for the LeetCode Explorer.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Total Problems</div>
                    <div className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
                        {data.meta.totalProblems}
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Total Companies</div>
                    <div className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-500">
                        {data.meta.totalCompanies}
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Total Topics</div>
                    <div className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-pink-400 to-orange-500">
                        {data.meta.totalTopics}
                    </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Generated At</div>
                    <div className="text-sm font-semibold mt-2">
                        {new Date(data.meta.generatedAt).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Top Companies by Problem Count</h2>
                    <div className="space-y-3">
                        {data.companies.slice(0, 10).map((c: any, i: number) => (
                            <div key={c.slug} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-muted-foreground w-6">#{i + 1}</span>
                                    <span className="font-medium">{c.name}</span>
                                </div>
                                <span className="font-mono text-sm font-semibold text-muted-foreground">
                                    {c.problemCount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Top Topics by Problem Count</h2>
                    <div className="space-y-3">
                        {data.topics.slice(0, 10).map((t: any, i: number) => (
                            <div key={t.slug} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-muted-foreground w-6">#{i + 1}</span>
                                    <span className="font-medium">{t.name}</span>
                                </div>
                                <span className="font-mono text-sm font-semibold text-muted-foreground">
                                    {t.problemCount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
