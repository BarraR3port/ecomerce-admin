import { getStockCount, getTotalRevenue, getTotalSales } from "@/actions/dashboard";
import { getGraphRevene } from "@/actions/graph";
import Overview from "@/components/overview/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { priceFormatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
	params: {
		storeId: string;
	};
}

export default async function DashboardPage(props: DashboardPageProps) {
	const { storeId } = props.params;

	const totalRevenue = await getTotalRevenue(storeId);
	const salesCount = await getTotalSales(storeId);
	const stockCount = await getStockCount(storeId);
	const graphRevenue = await getGraphRevene(storeId);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<Heading title="Dashboard" description="Bienvenido a tu dashboard" />
				<Separator />
				<div className="grid gap-4 grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
							<DollarSign className="w-6 h-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{priceFormatter.format(totalRevenue)}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Ventas</CardTitle>
							<CreditCard className="w-6 h-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+{salesCount}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Productos en Stock</CardTitle>
							<Package className="w-6 h-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+{stockCount}</div>
						</CardContent>
					</Card>
				</div>
				<Card className="col-span-4">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Estadísticas</CardTitle>
					</CardHeader>
					<CardContent>
						<Overview data={graphRevenue} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
