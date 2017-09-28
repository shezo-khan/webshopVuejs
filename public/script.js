var PRICE = 9.99;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: 'simpson',
        lastSearch: '',
        loading: false,
        price: PRICE
    },
    methods: {
        onSubmit: function () {
            this.loading = true,
            this.items = [],
            this.$http
                .get('/search/'.concat(this.search))
                .then(function (res) {
                    this.lastSearch = this.search;
                    this.items = res.data;
                    this.loading=false;
                });
        },
        addItem: function (index) {
            var item = this.items[index];
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].quantity++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    quantity: 1
                });
            }
            this.total += PRICE;
        },
        increaseQty: function (item) {
            item.quantity++;
            this.total += item.price;
        },
        decreaseQty: function (item) {
            item.quantity--;
            this.total -= item.price;
            if (item.quantity <= 0) {
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }

                }
            }
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted:function () {
        this.onSubmit();
    }
});