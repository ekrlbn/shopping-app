<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { key, Product } from '../store';
const route = useRoute();
const store = useStore(key);
const id = route.params.id;
const addCart = (product: Product) => {
	store.commit('addCart', product);
};
onMounted(async () => {
	await store.dispatch('fetch');
	store.commit('setProduct', id);
});
const product = computed(() => store.state.product);
</script>

<template>
	<v-card v-if="product != null" class="card" variant="outlined">
		<!-- <div class="img"> -->
		<img class="img" covered :src="product.img" />
		<div class="product-detail">
			<div class="title">
				<h2>{{ product.title }}</h2>
			</div>
			<div class="maker">
				<h3>{{ product.maker }}</h3>
			</div>
			<div class="description">
				{{ product.description }}
			</div>
			<div class="price">
				<h3>{{ product.price }},00$</h3>
			</div>
			<v-btn @click="addCart(product)" class="cart-btn">Add to cart</v-btn>
		</div>
	</v-card>
</template>
<style scoped>
.card {
	display: flex;
	text-align: left;
}
.product-detail {
	margin: 30px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 20px;
}
.description {
	flex-grow: 1;
}
.price {
	color: #2e7d32;
	align-self: flex-end;
}
.img {
	max-width: 400px;
	object-fit: cover;
}
.cart-btn {
	background-color: #f69f29;
	color: white;
	align-self: flex-end;
}
@media (max-width: 700px) {
	.img {
		width: 100%;
	}
	.card {
		flex-direction: column;
	}
	h2,
	h3 {
		font-size: large;
	}
	.cart-btn {
		align-self: auto;
		height: 60px;
	}
}
</style>
