import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <Hero />
      {/* Additional sections can be added here later */}
    </div>
  );
}
