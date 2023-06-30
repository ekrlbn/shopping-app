import { createWebHistory, createRouter } from 'vue-router';
import ProductCardsVue from './components/ProductCards.vue';
import ProductVue from './components/Product.vue';
import CartVue from './components/Cart.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/products',
			component: ProductCardsVue,
		},
		{
			path: '/product',
			component: ProductVue,
			children: [
				{
					path: ':id',
					component: ProductVue,
				},
			],
		},
		{
			path: '/cart',
			component: CartVue,
		},
	],
});

export { router };
