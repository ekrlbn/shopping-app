import { Store } from 'vuex';

declare module '@vue/runtime-core' {
	// declare your own store states
	interface State {
		all: Product[];
		product: Product;
		cart: Product[];
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
