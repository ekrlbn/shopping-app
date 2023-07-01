<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Product, key } from '../store';

const removeOne = (id: string) => {
	store.commit('removeOne', id);
};
const addOne = (id: string) => {
	store.commit('addOne', id);
};
const store = useStore(key);
const cart = computed(() => store.state.cart);
const total = computed(() => {
	let total: number = 0;
	store.state.cart.forEach((product: Product) => {
		total += product.quantity * product.price;
	});
	return total;
});
const removeItem = (id: string) => {
	store.commit('removeItem', id);
};
</script>
<template>
	<div class="container">
		<v-card variant="outlined" class="total">
			<h2>Total: {{ total }},00$</h2>
			<v-btn>payment</v-btn>
		</v-card>
		<div class="products">
			<v-card
				class="product-container"
				v-for="product in cart"
				variant="outlined"
			>
				<v-img max-width="25%" cover :src="product.img"></v-img>
				<div class="product-detail">
					<div class="title">
						<router-link :to="`/product/${product.id}`">
							<h3>
								{{ product.title }}
							</h3>
						</router-link>
					</div>
					<div>{{ product.maker }}</div>
					<div>
						<h3>
							{{ product.price * product.quantity }},00$ ({{
								product.quantity
							}})
						</h3>
					</div>
					<div class="btn-remove">
						<div class="quantity">
							<v-btn v-if="product.quantity != 1" @click="removeOne(product.id)"
								><h2>−</h2></v-btn
							>
							<h2>{{ product.quantity }}</h2>
							<v-btn @click="addOne(product.id)"><h2>+</h2></v-btn>
						</div>
						<v-btn @click="removeItem(product.id)" color="#E53935"
							>remove</v-btn
						>
					</div>
				</div>
			</v-card>
		</div>
	</div>
</template>
<style scoped>
.container {
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: flex-start;
}
.total {
	width: 20%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
}

.products {
	width: 70%;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.product-container {
	display: flex;
}
.product-detail {
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 20px;
	width: 80%;
	text-align: left;
}
.quantity {
	display: flex;
	gap: 20px;
}
.btn-remove {
	display: flex;

	justify-content: space-between;
	align-items: flex-end;
	flex-grow: 1;
}
@media (max-width: 1200px) {
	.container {
		flex-direction: column;
		gap: 20px;
	}

	.total,
	.products {
		width: 100%;
	}

	.v-img {
		display: none;
	}

	.btn-remove {
		flex-direction: column;
		gap: 30px;
		align-items: stretch;
	}
	.product-detail {
		width: 100%;
		gap: 30px;
	}
}
</style>
