<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { Product } from '../store.ts';

const store = useStore();
const addCart = (product: Product) => {
	store.commit('addCart', product);
};
const fetchProducts = async () => {
	await store.dispatch('fetch');
};

onMounted(fetchProducts);
const search = ref('');
const input = ($event) => {
	search.value = $event.target.value.toLowerCase();
};

const filtered = computed(() => {
	if (search.value === '') return store.state.all;
	else
		return store.state.all.filter((item: Product) => {
			if (item.title.toLowerCase().indexOf(search.value) > -1) return true;
			else if (item.maker.toLowerCase().indexOf(search.value) > -1) return true;
			return false;
		});
});
</script>
<template>
	<div class="container">
		<v-text-field
			density="compact"
			variant="solo"
			label="Search "
			single-line
			class="input"
			@input="input"
		></v-text-field>
		<v-card class="card" v-for="product in filtered" :key="product.id">
			<router-link class="link" :to="`/product/${product.id}`">
				<v-img
					cover
					class="img-container"
					:src="product.img"
					height="200px"
				></v-img>

				<div class="title">
					<h4>
						{{ product.title }}
					</h4>
				</div>

				<div class="maker">
					<h5>
						{{ product.maker }}
					</h5>
				</div>
				<div class="price">
					<h5>{{ product.price }},00$</h5>
				</div>
			</router-link>
			<div class="card-button-container">
				<v-btn class="card-button" @click="addCart(product)">add to cart</v-btn>
			</div>
		</v-card>
	</div>
</template>

<style scoped>
.img-container {
	width: 100%;
}

.cards {
	display: flex;
	justify-content: center;
	margin-top: 15px;
}

.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-content: flex-start;
	gap: 20px;
	flex-wrap: wrap;
}

.card {
	background-color: white;
	border-radius: 12px;
	height: 400px;
	width: 300px;
	display: flex;
	flex-direction: column;
}

.card:hover {
	cursor: pointer;
	border: none;
	transition: 1s;
	background-color: rgba(199, 199, 199, 0.377);
	border: 1px solid #8f8f8f;
}

.card-button-container {
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-content: flex-end;
	padding-bottom: 10px;
}
.link {
	display: flex;
	color: #242424;
	flex-direction: column;
	gap: 10px;
	align-items: flex-start;
	height: 85%;
}
.title,
.maker,
.price {
	margin-left: 10px;
}
.title {
	height: 2rem;
	margin-bottom: 20px;
}
.card-button {
	width: 95%;
	align-self: flex-end;
	background-color: #f69f29;
	color: white;
}

.input {
	width: 80%;
}
@media (prefers-color-scheme: dark) {
	.card {
		background-color: #333333;
	}
	.card:hover {
		border: 1px solid rgb(156, 156, 156);
		background-color: #3d3d3d;
	}
	.link {
		color: aliceblue;
	}
}
@media (max-width: 700px) {
	.container {
		margin-top: 60px;
	}
	.card {
		width: 100%;
	}
}
</style>
