import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutDialog } from "@/components/dialogs"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks"

const ProfileBox = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { userLogout } = useAuth()

	const logoutClick = () => {
		userLogout()
		navigate("/auth/login")
	}
	return (
		<>
			<div className="flex items-center justify-between md:justify-start">
				<div className="md:hidden">
					<Drawer>
						<DrawerTrigger><i className="pi pi-bars" style={{ color: 'slateblue' }}></i></DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle className="text-center text-yellow-500 font-semibold mt-8">Retail Management</DrawerTitle>
							</DrawerHeader>
							<DrawerDescription>
								<div className="text-center space-y-4">
									<Link to="/stock" className="flex justify-center">
										<div
											className={`w-40 p-2 rounded-sm shadow flex items-center gap-2 justify-center text-white 
            ${location.pathname === "/stock" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-warehouse"></i>
											<span className="text-md font-md">Stock Page</span>
										</div>
									</Link>

									<Link to="/cart" className="flex justify-center">
										<div
											className={`w-40 p-2 rounded-sm shadow flex items-center gap-2 justify-center text-white 
            ${location.pathname === "/cart" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-shopping-cart"></i>
											<span className="text-md font-md">Cart Page</span>
										</div>
									</Link>

									<Link to="/cashier" className="flex justify-center">
										<div
											className={`w-40 p-2 rounded-sm shadow flex items-center gap-2 justify-center text-white 
            ${location.pathname === "/cashier" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-wallet"></i>
											<span className="text-md font-md">Cashier Page</span>
										</div>
									</Link>

									<Link to="/manager" className="flex justify-center">
										<div
											className={`w-40 p-2 rounded-sm shadow flex items-center gap-2 justify-center text-white 
            ${location.pathname === "/manager" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-warehouse"></i>
											<span className="text-md font-md">Manager Page</span>
										</div>
									</Link>
								</div>

							</DrawerDescription>
							<DrawerFooter>
								<DrawerClose>
									<i className="pi pi-times-circle absolute top-2 right-2 z-10 text-lg text-red-500"></i>
									
										<Button className="bg-gray-400 w-40 hover:bg-gray-700 rounded-sm shadow" onClick={logoutClick}>Logout</Button>
									
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								<div className="flex gap-3 items-center">
									<Avatar className="w-8 h-8">
										<AvatarImage
											src="https://i.pinimg.com/originals/41/93/b8/4193b809d92b4c203271ac784b6dd011.jpg"
											alt="Profile Image"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="text-left">
										<h5 className="text-[13px] font-semibold">
											Zin Moe
										</h5>
										<p className="text-primary text-[10px]">
											Junior Programmer
										</p>
									</div>
								</div>
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="max-w-[200px] min-w-[180px] p-1">
									<h5 className="p-1 text-sm font-bold">
										My Account
									</h5>

									<hr />

									<LogoutDialog>
										<li className="p-1 text-[13px] hover:bg-accent m-1 rounded-lg text-destructive cursor-pointer">
											Log out
										</li>
									</LogoutDialog>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</>
	)
}

export default ProfileBox