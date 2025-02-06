import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Button } from "../button"
import 'primeicons/primeicons.css';
import TableLoadingBar from "@/components/table/TableLoadingBar"
// import { totalQuantity } from "@/store/features/cartSlice"
// import { useAppSelector } from "@/store"
// import { useNavigate } from "react-router-dom"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<any>("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
  });

  // let cartItems = useAppSelector(totalQuantity) || 0;

  // const navigate = useNavigate()

  // const cartClick = () => {
  //   navigate("/cart");
  // }


  return (
    <>
      {/* Global Filter Input */}
      <div className="flex flex-row py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-60"
        />

        {/* CartItems */}
        {/* <i
          className="pi pi-cart-plus text-3xl relative text-blue-500 hover:text-blue-800 transition-colors duration-200 ml-24"
          onClick={cartClick}
        >
          <span className="absolute text-white text-xs font-semibold px-2 py-1 rounded-full bg-green-500 -top-2 -right-3 shadow-lg border-2 border-white">
            {cartItems}
          </span>
        </i> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg shadow border overflow-auto hidden md:block">
        <Table>
          <TableHeader className="bg-gray-200 border-b-2 border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-2 text-sm font-semibold tracking-wide">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              loading ? (
                <TableRow className="hover:bg-blue-200 hover:scale-105 cursor-pointer duration-300">
                  <TableCell colSpan={table.getAllColumns().length} className="p-0 align-top">
                    <TableLoadingBar />
                  </TableCell>
                </TableRow>
              ) :
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      


      {/* Responsive Table Tailwind CSS */}
      <div className="grid gap-4 md:hidden">
        {loading ? (
          <TableLoadingBar />
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.id} className="bg-white p-4 rounded-lg shadow border">
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="flex justify-between py-2 last:border-0">
                  <span className="font-semibold">{flexRender(cell.column.columnDef.header, cell.getContext())}</span>
                  <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </>
  )
}
