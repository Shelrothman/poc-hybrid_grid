# MUI X DataGrid Hybrid Demo

A proof-of-concept demonstrating **both column groups and row grouping** in MUI X DataGrid Premium. This demo showcases a legal e-billing analytics dashboard with hierarchical data organization.

## Features Demonstrated

- **[Column Groups](https://mui.com/x/react-data-grid/column-groups/)**: Organized into logical sections (Legal Structure, Matter Details, Billing Analytics, Time Tracking Analytics)
- **[Row Grouping](https://mui.com/x/react-data-grid/row-grouping/)**: Legal matters grouped by department with aggregation functions
- **Data Aggregation**: Automatic sum/average calculations for grouped data
- **Unique Sortable Data**: 50 distinct legal matters with realistic e-billing data
- **Smart Expansion**: First department group expanded by default, others collapsed

## Tech Stack

- **React 19** with TypeScript
- **MUI X DataGrid Premium 8.14.1** for advanced grid features
- **Vite** for development and building
- **Material-UI** for consistent theming

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation & Running

```bash
# Clone the repository
git clone <repository-url>
cd poc-hybrid_grid

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
pnpm preview
```

## Data Structure

The demo generates 50 unique legal matters with:
- **12 departments**: Litigation, Corporate Law, IP, Employment, etc.
- **Varied practice areas**: Commercial Disputes, M&A, Patents, etc.
- **Attorney levels**: Partner, Senior Associate, Associate, etc.
- **Financial metrics**: Hourly rates, expenses, quarterly hours, total billing
- **Performance data**: Client satisfaction ratings, matter timelines

## Key Implementation Details

- Uses `GridRowGroupingModel` for department-based grouping
- Implements `GridColumnGroupingModel` for nested column organization
- Custom `isGroupExpandedByDefault` function for selective expansion
- Aggregation functions (sum, average) for meaningful group summaries
