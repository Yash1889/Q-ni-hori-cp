"use client";

import { useState, useEffect } from "react";
import { TopicCard } from "@/components/topics/TopicCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Topic {
    name: string;
    slug: string;
    problemCount: number;
}

export default function TopicsPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data client-side
        fetch("/data/data_dump.json")
            .then((res) => res.json())
            .then((data) => {
                setTopics(data.topics);
                setLoading(false);
            });
    }, []);

    const filteredTopics = topics.filter((topic) =>
        topic.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="text-center text-muted-foreground">Loading topics...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">Topics</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Browse {topics.length} algorithmic topics and their problem sets.
                </p>
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search topics by name..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {search && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Found {filteredTopics.length} of {topics.length} topics
                    </p>
                )}
            </div>

            {filteredTopics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No topics found matching "{search}"
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTopics.map((topic) => (
                        <TopicCard
                            key={topic.slug}
                            name={topic.name}
                            slug={topic.slug}
                            problemCount={topic.problemCount}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
