import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import 'primeicons/primeicons.css';
import { Button } from '@/components/ui/button';
import { decrementQuantity, increaseQuantity, removeFromCart } from '@/store/features/cartSlice';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartPage: React.FC = () => {
    const items = useAppSelector((state: RootState) => state.cart?.items || []);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const checkOutClick = () => {
        navigate("/cashier");
    }
    return (
        <>
            <h1 className='text-center font-semibold'>Cart Page!</h1>
            {items.length === 0 ? (

                <div className='flex justify-center items-center flex-col h-screen'>
                    <img src="img/p2.avif" className='w-80 h-80' alt="" />
                    {/* <FontAwesomeIcon icon={faCartShopping} className="mt-4" size="6x" /> */}
                    <p className='text-lg text-gray-500 font-bold mt-4'>Your Cart is Empty!</p>
                </div>
            ) : (

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>No</TableHead>
                            <TableHead className='text-center'>Product Name</TableHead>
                            <TableHead className='text-center'>Price</TableHead>
                            <TableHead className='text-center'>Quantity</TableHead>
                            <TableHead className='text-center'>Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length > 0 && items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center'>{index + 1}</TableCell>
                                <TableCell className='text-center'>{item.productName}</TableCell>
                                <TableCell className='text-right'>{item.price}</TableCell>
                                <TableCell className='text-center'>
                                    <div>
                                        <span onClick={() => dispatch(decrementQuantity(item))}><i className="pi pi-minus-circle" style={{ color: 'red' }}></i></span>
                                        <span className='font-semibold ml-2'>{item.quantity}</span>
                                        <span onClick={() => dispatch(increaseQuantity(item))}><i className="pi pi-plus-circle ml-2" style={{ color: 'green' }}></i></span>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Button onClick={() => item.productID && dispatch(removeFromCart(item.productID))} className='bg-red-500 hover:bg-500-red'><i className="pi pi-times-circle"></i></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">${calculateTotal().toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter> */}
                </Table>
            )}
            {items.length > 0 && (
                <div className="flex justify-center mt-4">
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
                        onClick={checkOutClick}
                    >
                        Checkout
                    </Button>
                </div>
            )}
        </>
    );
};

export default CartPage;