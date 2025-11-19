# LeetCode Company Explorer

A premium, production-ready front-end web application that presents LeetCode problems grouped by company and topic.

## Features

- **Company Explorer**: Browse problems by top tech companies (Google, Amazon, Meta, etc.).
- **Topic Explorer**: Explore problems by algorithmic topics (DP, Graphs, Trees, etc.).
- **Interactive UI**: 3D-inspired hero section, smooth animations, and responsive design.
- **Search & Filter**: Client-side search and filtering by difficulty.
- **Developer Map**: Diagnostics page showing data mapping statistics.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd leetcode-company-explorer
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Data Import

The application uses a static JSON file (`src/data/data_dump.json`) generated from the [liquidslr/leetcode-company-wise-problems](https://github.com/liquidslr/leetcode-company-wise-problems) repository.

To regenerate the data:

1.  Clone the source repository into `temp_data`:
    ```bash
    git clone https://github.com/liquidslr/leetcode-company-wise-problems.git temp_data
    ```

2.  Run the import script:
    ```bash
    npx tsx src/scripts/import-data.ts
    ```

3.  Clean up:
    ```bash
    rm -rf temp_data
    ```

## Build

To build for production:

```bash
npm run build
```

## Project Structure

- `src/app`: Next.js App Router pages.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions.
- `src/scripts`: Data import scripts.
- `src/data`: Generated data files.

## License

MIT
