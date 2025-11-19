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
    return data.companies.map((company: any) => ({
        slug: company.slug,
    }));
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getData();
    const company = data.companies.find((c: any) => c.slug === slug);

    if (!company) {
        notFound();
    }

    // Filter problems for this company
    const problems = data.problems.filter((p: any) =>
        p.companies.includes(company.name)
    );

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">{company.name}</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    {problems.length} problems found for {company.name}.
                </p>
            </div>
            <ProblemTable problems={problems} />
        </div>
    );
}
