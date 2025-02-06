import * as product from "./product/queries";
import * as manager from "./manager/queries"
class API {
	product: typeof product;
	manager: typeof manager;

	constructor() {
		this.product = product;
		this.manager = manager;
	}
}

const api = new API();

export default api;