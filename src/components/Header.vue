<script setup lang="ts"></script>
<template>
	<header>
		<div class="header">
			<router-link class="nav-item" to="/"> <h2>Home</h2> </router-link>
			<router-link class="nav-item" to="/products">
				<h2>Products</h2>
			</router-link>
			<div class="cart-container">
				<router-link class="cart nav-item" to="/cart">
					<h2>&#128722</h2>
				</router-link>
			</div>
		</div>
	</header>
</template>
<style scoped>
.header {
	position: fixed;
	padding: 0 20px 0 20px;
	left: 0;
	top: 0;
	z-index: 1;
	display: flex;
	gap: 10px;
	width: 100%;
	height: 7%;
	align-items: center;
	background-color: rgb(245, 245, 245);
	border-bottom: 2px solid rgb(173, 173, 173);
}
@media (prefers-color-scheme: dark) {
	.header {
		background-color: #333333;
	}
}
.cart-container {
	flex-grow: 1;
	display: flex;
	justify-content: end;
}
.nav-item {
	border: 1px solid rgb(75, 75, 75);
	padding: 6px;
	border-radius: 7px;
}
.nav-item:hover {
	background-color: rgb(231, 231, 231);
}
</style>
