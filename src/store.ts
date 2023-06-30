import { createStore } from 'vuex';
import axios from 'axios';

export type Product = {
	id: string;
	maker: string;
	img: string;
	title: string;
	description: string;
	ratings: number[];
	price: number;
	quantity: number;
};
const random = (multiplier: number) =>
	10 + Math.floor(Math.random() * multiplier);

const store = createStore({
	state() {
		return {
			all: [],
			product: null,
			cart: [],
		};
	},
	mutations: {
		setProducts(state, products: Product[]) {
			state.all = products;
			// cart is updated too
			const cart: Product[] = [];
			products.forEach((element: Product) => {
				state.cart.forEach((cartElement: Product) => {
					if (cartElement.id === element.id)
						cart.push({
							id: element.id,
							maker: element.maker,
							img: element.img,
							title: element.title,
							description: element.description,
							ratings: element.ratings,
							price: element.price,
							quantity: cartElement.quantity,
						});
				});
			});
			state.cart = cart;
		},
		setProduct(state, id: string) {
			const found: Product = state.all.find(
				(product: Product) => product.id === id,
			);
			if (found) state.product = found;
		},

		addCart(state, product: Product) {
			let found: boolean = false;
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === product.id) {
					found = true;
					arr[index].quantity++;
				}
			});
			if (!found) state.cart.push(product);
		},
		removeItem(state, id: string) {
			state.cart = state.cart.filter((item: Product) => item.id !== id);
		},
		addOne(state, id: string) {
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === id) {
					arr[index].quantity++;
				}
			});
		},
		removeOne(state, id: string) {
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === id) {
					arr[index].quantity--;
				}
			});
		},
	},
	actions: {
		async fetch(ctx) {
			const URL =
				'https://raw.githubusercontent.com/dotnet-presentations/ContosoCrafts/master/src/wwwroot/data/products.json';
			const request = await axios.get(URL);
			const data = request.data;

			const products = data.map((data: any) => ({
				id: data.Id,
				maker: data.Maker,
				img: data.img,
				title: data.Title,
				description: data.Description,
				ratings: data.Ratings,
				price: random(100),
				quantity: 1,
			}));

			ctx.commit('setProducts', products);
		},
	},
	getters: {},
});

export { store };
