"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import type { Store } from "@prisma/client";
import { Button } from "@ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	stores: Store[];
}

export default function StoreSwitcher({ className, stores = [] }: StoreSwitcherProps) {
	const [open, setOpen] = useState(false);
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	const formattedStores = stores.map(store => ({
		label: store.name,
		value: store.id
	}));

	const currentStore = formattedStores.find(store => store.value === params.storeId);

	const onStoreSelect = (store: { label: string; value: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Seleccionar tienda"
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className="mr-2 h-4 w-4" />
					{currentStore?.label}
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Buscar tienda..." />

					<CommandEmpty>Tienda no encontrada</CommandEmpty>
					<CommandList>
						<CommandGroup>
							{formattedStores.map(store => {
								console.log(store, currentStore?.value === store.value, currentStore, store.value);
								return (
									<CommandItem
										key={store.value}
										value={store.value}
										onSelect={() => onStoreSelect(store)}
										className={cn(currentStore?.value === store.value && "bg-background-container")}
									>
										<StoreIcon className="mr-2 h-4 w-4" />
										{store.label}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												currentStore?.value === store.value ? "text-success-500" : "opacity-0"
											)}
										/>
									</CommandItem>
								);
							})}
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className="mr-2 h-5 w-5" />
								Crear tienda
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
