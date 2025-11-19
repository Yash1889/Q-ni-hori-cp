"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Layers, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
            {/* Animated background gradients */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] opacity-20 blur-[120px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" />
                <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] opacity-15 blur-[100px] bg-gradient-to-tl from-cyan-400 via-indigo-500 to-purple-600 rounded-full" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            <span>Premium LeetCode Problem Explorer</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                                Master the Interview
                            </span>
                        </h1>
                        <p className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed">
                            Explore <span className="font-semibold text-foreground">1,820+ LeetCode problems</span> organized by{" "}
                            <span className="font-semibold text-foreground">470 companies</span> and{" "}
                            <span className="font-semibold text-foreground">71 topics</span>.
                            <br />
                            Prepare smarter with curated company-wise problem lists.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="mt-12 flex flex-col gap-4 sm:flex-row"
                    >
                        <Link
                            href="/companies"
                            className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <Building2 className="h-5 w-5" />
                            Explore Companies
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/topics"
                            className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-border bg-background/50 backdrop-blur-sm px-8 text-base font-semibold shadow-md transition-all hover:bg-accent hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <Layers className="h-5 w-5" />
                            Browse Topics
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="mt-16 grid grid-cols-3 gap-8 md:gap-12"
                    >
                        <div className="flex flex-col items-center">
                            <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
                                1,820+
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">Problems</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-500">
                                470
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">Companies</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-400 to-orange-500">
                                71
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">Topics</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
