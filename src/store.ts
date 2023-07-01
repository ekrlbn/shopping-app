import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

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
export interface State {
	all: Product[];
	product: Product | null;
	cart: Product[];
}
export const key: InjectionKey<Store<State>> = Symbol();
const random = (multiplier: number) =>
	10 + Math.floor(Math.random() * multiplier);

const store = createStore<State>({
	state() {
		return {
			all: [],
			product: null,
			cart: [],
		};
	},
	mutations: {
		setProducts(state: State, products: Product[]) {
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
		setProduct(state: State, id: string) {
			const found: Product | undefined = state.all.find(
				(product: Product) => product.id === id,
			);
			if (found) state.product = found;
		},

		addCart(state: State, product: Product) {
			let found: boolean = false;
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === product.id) {
					found = true;
					arr[index].quantity++;
				}
			});
			if (!found) state.cart.push(product);
		},
		removeItem(state: State, id: string) {
			state.cart = state.cart.filter((item: Product) => item.id !== id);
		},
		addOne(state: State, id: string) {
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === id) {
					arr[index].quantity++;
				}
			});
		},
		removeOne(state: State, id: string) {
			state.cart.forEach((item: Product, index: number, arr: Product[]) => {
				if (item.id === id) {
					arr[index].quantity--;
				}
			});
		},
	},
	actions: {
		async fetch(ctx: any) {
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
