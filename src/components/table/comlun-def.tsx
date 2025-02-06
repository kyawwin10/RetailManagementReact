import { CartPayload, GetAllProductyPayload, ProductDeletePayload, ProductUpdatePayload } from "@/api/product/types"
import { ColumnDef } from "@tanstack/react-table"
import 'primeicons/primeicons.css';
import { Button } from "@/components/ui/button"
import { addToCart, decrementQuantity, increaseQuantity } from "@/store/features/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { GetAllSalePayload } from "@/api/manager/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const columns = (
    editClick: (data: ProductUpdatePayload) => void,
    deleteClick: (data: ProductDeletePayload) => void
): ColumnDef<GetAllProductyPayload, CartPayload>[] => [
        {
            accessorKey: "productID",
            header: () => <div className="text-center"> No </div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium" > {row.index + 1} </div>;
            },
        },
        {
            accessorKey: "productName",
            header: () => <div className="text-center"> Product Name </div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium" > {row.getValue("productName")} </div>;
            },
        },
        // {
        //     accessorKey: "productName",
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //             >
        //                 Product Name
        //                 <ArrowUpDown className="text-center font-bold" />
        //             </Button>
        //         )
        //     },
        // },
        {
            accessorKey: "price",
            header: () => <div className="text-center"> Price </div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium" > {row.getValue("price")} </div>;
            },
        },
        {
            accessorKey: "stock",
            header: () => <div className="text-center"> Stock </div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium" > {row.getValue("stock")} </div>;
            },
        },
        {
            accessorKey: "profitPerItem",
            header: () => <div className="text-center"> ProfitPerItem </div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium" > {row.getValue("profitPerItem")} </div>;
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center"> Action </div>,
            cell: ({ row }) => {
                const product = row.original as ProductUpdatePayload;
                const dispatch = useAppDispatch();
                const items = useAppSelector((state: RootState) => state.cart?.items || [])

                return (
                    <>
                        <div className="flex flex-row justify-center">
                            {items.some((item: CartPayload) => item.productID === row.original.productID) ? (
                                <div className="">
                                    {(() => {
                                        const cartItem = items.find((item: CartPayload) => item.productID === row.original.productID);

                                        return cartItem ? (
                                            <>
                                                <span
                                                    onClick={() => dispatch(decrementQuantity(cartItem))}
                                                    className="text-center"
                                                >
                                                    <i className="pi pi-minus-circle text-lg text-red-500"></i>
                                                </span>

                                                {/* Display Quantity */}
                                                <span className="text-center text-xl ml-2 font-semibold">{cartItem.quantity}</span>

                                                <span
                                                    onClick={() => dispatch(increaseQuantity(cartItem))}
                                                    className="text-center"
                                                >
                                                    <i className="pi pi-plus-circle text-lg ml-2 text-green-500"></i>
                                                </span>
                                            </>
                                        ) : null;
                                    })()}
                                </div>
                            ) : (
                                <Button
                                    className="bg-blue-500 p-2 hover:bg-blue-800"
                                    onClick={() => dispatch(addToCart(row.original))}
                                >
                                    <i className="pi pi-cart-plus"></i>
                                    <span className="hidden md:block">Add To Cart</span>
                                </Button>
                            )}


                            <Button className="bg-yellow-500 p-2 ml-2 hover:bg-yellow-800" onClick={() => editClick(product)}>
                                <i className="pi pi-pen-to-square"></i>
                                <span className="hidden md:block">Edit</span>
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="bg-red-500 p-2 ml-2 hover:bg-red-800">
                                        <i className="pi pi-trash"></i>
                                        <span className="hidden md:block">Delete</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-center font-bold">Are You Sure want to Delete?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteClick(product)}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {/* <Button className="bg-red-500 p-2 ml-2 hover:bg-red-800" onClick={() => deleteClick(product)}>
                            <i className="pi pi-trash"></i>
                            <span className="hidden md:block">Delete</span>
                        </Button> */}
                        </div>
                    </>
                )
            },
        },
    ];

export const col: ColumnDef<GetAllSalePayload>[] = [
    {
        accessorKey: "saleID",
        header: () => <div className="text-center"> No </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.index + 1} </div>;
        },
    },
    {
        accessorKey: "productID",
        header: () => <div className="text-center"> ProductID </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.getValue("productID")} </div>;
        },
    },
    {
        accessorKey: "quantitySold",
        header: () => <div className="text-center"> Quantity Sold </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.getValue("quantitySold")} </div>;
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-center"> Total Amount </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.getValue("totalAmount")} </div>;
        },
    },
    {
        accessorKey: "totalProfit",
        header: () => <div className="text-center"> Total Profit </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.getValue("totalProfit")} </div>;
        },
    },
    {
        accessorKey: "salesDate",
        header: () => <div className="text-center"> Sale Date </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.getValue("salesDate")} </div>;
            // const rawDate = row.getValue("salesDate") as string | number | Date; // Type Assertion
            // const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A"; // Formatting Date

            // return <div className="text-center font-medium">{formattedDate}</div>;
        },
    }
];