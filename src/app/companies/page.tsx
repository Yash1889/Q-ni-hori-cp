"use client";

import { useState, useEffect } from "react";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Company {
    name: string;
    slug: string;
    problemCount: number;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data client-side
        fetch("/data/data_dump.json")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data.companies);
                setLoading(false);
            });
    }, []);

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="text-center text-muted-foreground">Loading companies...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">Companies</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Browse {companies.length} companies and their LeetCode problem sets.
                </p>
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search companies by name..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {search && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Found {filteredCompanies.length} of {companies.length} companies
                    </p>
                )}
            </div>

            {filteredCompanies.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No companies found matching "{search}"
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCompanies.map((company) => (
                        <CompanyCard
                            key={company.slug}
                            name={company.name}
                            slug={company.slug}
                            problemCount={company.problemCount}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
