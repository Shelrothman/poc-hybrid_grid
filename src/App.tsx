/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	DataGridPremium,
	type GridColumnGroupingModel,
	type GridRowGroupingModel,
	useGridApiRef,
} from '@mui/x-data-grid-premium';
import { Box, Typography, Paper, List, ListItem, Link } from '@mui/material';
import './App.css';

// Generate fake data for our POC
const generateFakeData = () => {
	// Create a flatter structure with more departments for variety
	const departments = [
		'Litigation',
		'Corporate Law',
		'Intellectual Property',
		'Employment Law',
		'Real Estate',
		'Tax Law',
		'Banking & Finance',
		'Healthcare Law',
		'Environmental Law',
		'Immigration Law',
		'Criminal Defense',
		'Family Law',
	];

	const practiceAreas = [
		'Commercial Disputes',
		'Securities Litigation',
		'Class Actions',
		'Appeals',
		'M&A',
		'Securities',
		'Corporate Governance',
		'Compliance',
		'Patents',
		'Trademarks',
		'Data Privacy',
		'Tech Transactions',
		'Labor Relations',
		'Employment Disputes',
		'Benefits',
		'Immigration',
		'Real Estate Transactions',
		'Development',
		'Leasing',
		'Zoning',
		'Tax Planning',
		'Tax Litigation',
		'International Tax',
		'Estate Planning',
		'Banking Regulations',
		'Financial Services',
		'Investment Law',
		'Insurance',
		'Healthcare Compliance',
		'Medical Malpractice',
		'Healthcare M&A',
		'FDA Matters',
		'Environmental Compliance',
		'Climate Law',
		'Water Rights',
		'Land Use',
		'Visa Processing',
		'Deportation Defense',
		'Citizenship',
		'Business Immigration',
		'White Collar Defense',
		'Criminal Appeals',
		'Regulatory Investigations',
		'DUI Defense',
		'Divorce',
		'Child Custody',
		'Adoption',
		'Domestic Relations',
	];

	const clientTypes = [
		'Fortune 500 Corp',
		'Tech Startup',
		'Healthcare System',
		'Financial Institution',
		'Manufacturing Co',
		'Retail Chain',
		'Energy Company',
		'Real Estate Developer',
		'Government Agency',
		'Non-Profit Org',
		'Private Equity Fund',
		'Insurance Company',
		'Pharmaceutical Co',
		'Biotech Firm',
		'Media Company',
		'Transportation Co',
	];

	// Predefined matter names for uniqueness and realism
	const matterNames = [
		'Apex Corp Acquisition',
		'Patent Infringement Defense',
		'Employment Class Action',
		'Real Estate Development Project',
		'Securities Fraud Investigation',
		'Trademark Opposition',
		'M&A Due Diligence',
		'Labor Union Negotiations',
		'IP Licensing Agreement',
		'Commercial Lease Dispute',
		'Antitrust Investigation',
		'Data Privacy Compliance',
		'Product Liability Suit',
		'Corporate Restructuring',
		'Contract Negotiation',
		'Zoning Variance Appeal',
		'Trade Secret Litigation',
		'Executive Compensation Review',
		'Environmental Compliance',
		'Shareholder Derivative Suit',
		'Technology Transfer Agreement',
		'Construction Defect Claims',
		'Insurance Coverage Dispute',
		'Regulatory Investigation',
		'Joint Venture Formation',
		'Immigration Visa Processing',
		'Tax Audit Defense',
		'Bankruptcy Proceedings',
		'International Arbitration',
		'Software Licensing Dispute',
	];

	// Create unique rate tiers for different attorney levels
	const rateTiers = {
		Partner: [850, 900, 950, 1000, 1050, 1100, 1150, 1200],
		'Senior Associate': [550, 575, 600, 625, 650, 675, 700, 725],
		Associate: [350, 375, 400, 425, 450, 475, 500, 525],
		'Senior Counsel': [750, 775, 800, 825, 850, 875, 900, 925],
		'Of Counsel': [650, 675, 700, 725, 750, 775, 800, 825],
		'Staff Attorney': [250, 275, 300, 325, 350, 375, 400, 425],
		Paralegal: [150, 165, 180, 195, 210, 225, 240, 255],
		'Patent Agent': [450, 475, 500, 525, 550, 575, 600, 625],
		'Real Estate Specialist': [400, 425, 450, 475, 500, 525, 550, 575],
	};

	const data: any[] = [];
	let id = 1;
	let matterNameIndex = 0;
	let rateIndex = 0;

	// Create unique expense amounts (in increments of $750 for clear sorting)
	const expenseBase = 5000;

	// Generate diverse matters across different departments and practice areas
	for (let i = 0; i < 50; i++) {
		// Generate 50 unique matters
		const department = departments[i % departments.length];
		const practiceArea = practiceAreas[i % practiceAreas.length];
		const clientType = clientTypes[i % clientTypes.length];

		// Create more varied attorney levels not tied to specific departments
		const allAttorneyLevels = [
			'Partner',
			'Senior Associate',
			'Associate',
			'Senior Counsel',
			'Of Counsel',
			'Staff Attorney',
			'Paralegal',
		];
		const attorneyLevel = allAttorneyLevels[i % allAttorneyLevels.length];

		// Get unique hourly rate based on attorney level
		const availableRates = rateTiers[
			attorneyLevel as keyof typeof rateTiers
		] || [400, 450, 500];
		const hourlyRate = availableRates[rateIndex % availableRates.length];
		rateIndex++;

		// Create unique quarterly hours with clear differences for sorting
		const q1Hours = 50 + id * 12.5; // Incremental pattern for clear sorting
		const q2Hours = 75 + id * 8.7; // Different increment pattern
		const q3Hours = 60 + id * 9.3; // Another unique pattern
		const q4Hours = 40 + id * 11.2; // Yet another pattern

		// Create unique expenses with clear increments
		const expenses = expenseBase + id * 750; // $750 increments

		// Create varied client satisfaction scores
		const clientSatisfaction = 65 + ((id * 2.3) % 35); // Varies from 65-100

		// Create unique start dates spread across different months/years
		const startYear = 2023 + (id % 3); // 2023, 2024, 2025
		const startMonth = (id * 2) % 12; // Different months
		const startDay = ((id * 7) % 28) + 1; // Different days

		// Create more descriptive matter names including client type
		const baseMatterName = matterNames[matterNameIndex % matterNames.length];
		const matterName = `${baseMatterName} (${clientType})`;

		data.push({
			id: id++,
			matterName,
			department,
			practiceArea,
			attorneyLevel,
			hourlyRate,
			expenses,
			totalBilled: 0, // Will calculate below
			q1Hours: Math.round(q1Hours * 10) / 10, // Round to 1 decimal
			q2Hours: Math.round(q2Hours * 10) / 10,
			q3Hours: Math.round(q3Hours * 10) / 10,
			q4Hours: Math.round(q4Hours * 10) / 10,
			totalHours: 0, // Will calculate below
			clientSatisfaction: Math.round(clientSatisfaction),
			matterStartDate: new Date(startYear, startMonth, startDay)
				.toISOString()
				.split('T')[0],
		});
		matterNameIndex++;
	}

	// Calculate derived fields
	data.forEach((row) => {
		row.totalHours = row.q1Hours + row.q2Hours + row.q3Hours + row.q4Hours;
		row.totalBilled = row.totalHours * row.hourlyRate + row.expenses;
	});

	return data;
};

function App() {
	const apiRef = useGridApiRef();
	const rows = React.useMemo(() => generateFakeData(), []);

	// Define base columns that are always visible (needed for grouping structure)
	const baseColumns = [
		{
			field: 'department',
			headerName: 'Department',
			width: 130,
		},
		{
			field: 'practiceArea',
			headerName: 'Practice Area',
			width: 150,
		},
	];

	// Define detail columns that show when groups are expanded
	const detailColumns = [
		{
			field: 'matterName',
			headerName: 'Matter Name',
			width: 150,
			flex: 1,
		},
		{
			field: 'attorneyLevel',
			headerName: 'Attorney Level',
			width: 130,
		},
		{
			field: 'hourlyRate',
			headerName: 'Rate ($/hr)',
			width: 100,
			type: 'number',
			valueFormatter: (value: number) => `$${value?.toLocaleString() || 0}`,
		},
		{
			field: 'matterStartDate',
			headerName: 'Start Date',
			width: 120,
			type: 'date',
			valueGetter: (value: string) => (value ? new Date(value) : null),
		},
		// Billing Analytics Group
		{
			field: 'totalHours',
			headerName: 'Total Hours',
			width: 110,
			type: 'number',
			valueFormatter: (value: number) => `${value?.toFixed(1) || 0}h`,
		},
		{
			field: 'expenses',
			headerName: 'Expenses',
			width: 110,
			type: 'number',
			valueFormatter: (value: number) => `$${value?.toLocaleString() || 0}`,
		},
		{
			field: 'totalBilled',
			headerName: 'Total Billed',
			width: 120,
			type: 'number',
			valueFormatter: (value: number) => `$${value?.toLocaleString() || 0}`,
		},
		// Time Analytics Group - Quarterly Hours
		{
			field: 'q1Hours',
			headerName: 'Q1 Hours',
			width: 90,
			type: 'number',
			valueFormatter: (value: number) => `${value?.toFixed(1) || 0}h`,
		},
		{
			field: 'q2Hours',
			headerName: 'Q2 Hours',
			width: 90,
			type: 'number',
			valueFormatter: (value: number) => `${value?.toFixed(1) || 0}h`,
		},
		{
			field: 'q3Hours',
			headerName: 'Q3 Hours',
			width: 90,
			type: 'number',
			valueFormatter: (value: number) => `${value?.toFixed(1) || 0}h`,
		},
		{
			field: 'q4Hours',
			headerName: 'Q4 Hours',
			width: 90,
			type: 'number',
			valueFormatter: (value: number) => `${value?.toFixed(1) || 0}h`,
		},
		{
			field: 'clientSatisfaction',
			headerName: 'Client Rating',
			width: 110,
			type: 'number',
			valueFormatter: (value: number) => `${value || 0}%`,
		},
	];

	// Always show detailed columns
	const columns = [...baseColumns, ...detailColumns];

	// Define column grouping model - always detailed view
	const columnGroupingModel: GridColumnGroupingModel = [
		{
			groupId: 'structure',
			headerName: 'Legal Structure',
			children: [{ field: 'department' }, { field: 'practiceArea' }],
		},
		{
			groupId: 'matter',
			headerName: 'Matter Details',
			children: [
				{ field: 'matterName' },
				{ field: 'attorneyLevel' },
				{ field: 'hourlyRate' },
				{ field: 'matterStartDate' },
			],
		},
		{
			groupId: 'billing',
			headerName: 'Billing Analytics',
			children: [
				{ field: 'totalHours' },
				{ field: 'expenses' },
				{ field: 'totalBilled' },
			],
		},
		{
			groupId: 'timeTracking',
			headerName: 'Time Tracking Analytics',
			children: [
				{
					groupId: 'quarterlyHours',
					headerName: 'Quarterly Hours',
					children: [
						{ field: 'q1Hours' },
						{ field: 'q2Hours' },
						{ field: 'q3Hours' },
						{ field: 'q4Hours' },
					],
				},
				{ field: 'clientSatisfaction' },
			],
		},
	];

	// Define row grouping model - single level grouping by department only
	const rowGroupingModel: GridRowGroupingModel = ['department'];

	const initialState = {
		rowGrouping: {
			model: rowGroupingModel,
		},
		aggregation: {
			model: {
				totalHours: 'sum',
				expenses: 'sum',
				totalBilled: 'sum',
				hourlyRate: 'avg',
				q1Hours: 'sum',
				q2Hours: 'sum',
				q3Hours: 'sum',
				q4Hours: 'sum',
				clientSatisfaction: 'avg',
			},
		},
	};

	return (
		<Box sx={{ padding: 3 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				MUI X DataGrid Demo Row Grouping & Column Groups
			</Typography>
			<Paper
				elevation={2}
				sx={{ padding: 2, marginBottom: 2, width: 'fit-content' }}
			>
				<Typography variant="h6" gutterBottom>
					Features Demonstrated:
				</Typography>
				<List>
					<ListItem>
						{/* <a
							href="https://mui.com/x/react-data-grid/column-groups/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Column Groups
						</a> */}
						<Link
							href="https://mui.com/x/react-data-grid/column-groups/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Column Groups
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href="https://mui.com/x/react-data-grid/row-grouping/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Row Grouping
						</Link>
					</ListItem>
				</List>
			</Paper>{' '}
			<Box sx={{ height: 600, width: '100%' }}>
				<DataGridPremium
					apiRef={apiRef}
					rows={rows}
					columns={columns as any}
					columnGroupingModel={columnGroupingModel}
					initialState={initialState}
					defaultGroupingExpansionDepth={0}
					isGroupExpandedByDefault={(node) => {
						// Only expand the first department group by default
						const firstDepartment = rows.find(
							(row) => row.department
						)?.department;
						return node.groupingKey === firstDepartment;
					}}
					groupingColDef={{
						headerName: 'Legal Structure',
						width: 250,
					}}
					sx={{
						'& .MuiDataGrid-columnHeader': {
							backgroundColor: '#f5f5f5',
							fontWeight: 'bold',
						},
						'& .MuiDataGrid-columnGroupHeader': {
							backgroundColor: '#e3f2fd',
							fontWeight: 'bold',
							fontSize: '0.875rem',
						},
						'& .MuiDataGrid-row--group': {
							backgroundColor: '#f9f9f9',
							fontWeight: 'bold',
						},
					}}
				/>
			</Box>
		</Box>
	);
}

export default App;
