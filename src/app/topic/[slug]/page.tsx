import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { ProblemTable } from "@/components/problems/ProblemTable";

async function getData() {
    const filePath = path.join(process.cwd(), "src/data/data_dump.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
}

export async function generateStaticParams() {
    const data = await getData();
    return data.topics.map((topic: any) => ({
        slug: topic.slug,
    }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getData();
    const topic = data.topics.find((t: any) => t.slug === slug);

    if (!topic) {
        notFound();
    }

    // Filter problems for this topic
    const problems = data.problems.filter((p: any) =>
        p.topics.includes(topic.name)
    );

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">{topic.name}</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    {problems.length} problems found for {topic.name}.
                </p>
            </div>
            <ProblemTable problems={problems} />
        </div>
    );
}
