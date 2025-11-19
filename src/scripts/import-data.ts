import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'temp_data');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/data_dump.json');

interface RawProblem {
    Difficulty: string;
    Title: string;
    Frequency: string;
    'Acceptance Rate': string;
    Link: string;
    Topics: string;
}

interface Problem {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    acceptanceRate: number;
    frequency: number;
    url: string;
    topics: string[];
    companies: string[];
}

interface DataDump {
    problems: Problem[];
    companies: { name: string; slug: string; problemCount: number }[];
    topics: { name: string; slug: string; problemCount: number }[];
    meta: {
        totalProblems: number;
        totalCompanies: number;
        totalTopics: number;
        generatedAt: string;
    };
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

function generateId(title: string): string {
    return crypto.createHash('md5').update(title).digest('hex').slice(0, 8);
}

async function main() {
    console.log('Starting data import...');

    if (!fs.existsSync(DATA_DIR)) {
        console.error(`Data directory not found: ${DATA_DIR}`);
        process.exit(1);
    }

    const companyDirs = fs.readdirSync(DATA_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'));

    const problemsMap = new Map<string, Problem>();
    const companyMap = new Map<string, number>();

    for (const companyDir of companyDirs) {
        const companyName = companyDir.name;
        const companyPath = path.join(DATA_DIR, companyName);
        const files = fs.readdirSync(companyPath);

        // Prefer "All.csv", fallback to others if needed, but "All.csv" seems standard
        const csvFile = files.find(f => f.includes('All.csv'));

        if (!csvFile) {
            console.warn(`No 'All.csv' found for ${companyName}, skipping...`);
            continue;
        }

        const csvContent = fs.readFileSync(path.join(companyPath, csvFile), 'utf-8');

        try {
            const records = parse(csvContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            }) as RawProblem[];

            companyMap.set(companyName, records.length);

            for (const record of records) {
                const title = record.Title.trim();
                if (!title) continue;

                const id = generateId(title);

                if (!problemsMap.has(id)) {
                    problemsMap.set(id, {
                        id,
                        title,
                        slug: slugify(title),
                        difficulty: record.Difficulty.toUpperCase() || 'UNKNOWN',
                        acceptanceRate: parseFloat(record['Acceptance Rate']) || 0,
                        frequency: parseFloat(record.Frequency) || 0,
                        url: record.Link,
                        topics: record.Topics ? record.Topics.split(',').map(t => t.trim()).filter(Boolean) : [],
                        companies: [companyName],
                    });
                } else {
                    const problem = problemsMap.get(id)!;
                    if (!problem.companies.includes(companyName)) {
                        problem.companies.push(companyName);
                    }
                    // Update frequency or other stats if needed? For now, keep first found.
                }
            }
        } catch (err) {
            console.error(`Error parsing ${companyName}:`, err);
        }
    }

    // Aggregate Topics
    const topicCounts = new Map<string, number>();
    for (const problem of problemsMap.values()) {
        for (const topic of problem.topics) {
            topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        }
    }

    const problems = Array.from(problemsMap.values());

    const companies = Array.from(companyMap.entries()).map(([name, count]) => ({
        name,
        slug: slugify(name),
        problemCount: count,
    })).sort((a, b) => b.problemCount - a.problemCount);

    const topics = Array.from(topicCounts.entries()).map(([name, count]) => ({
        name,
        slug: slugify(name),
        problemCount: count,
    })).sort((a, b) => b.problemCount - a.problemCount);

    const dataDump: DataDump = {
        problems,
        companies,
        topics,
        meta: {
            totalProblems: problems.length,
            totalCompanies: companies.length,
            totalTopics: topics.length,
            generatedAt: new Date().toISOString(),
        },
    };

    // Ensure output dir exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dataDump, null, 2));
    console.log(`Import complete!`);
    console.log(`Problems: ${problems.length}`);
    console.log(`Companies: ${companies.length}`);
    console.log(`Topics: ${topics.length}`);
    console.log(`Data written to ${OUTPUT_FILE}`);
}

main();
