import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart, Product } from 'src/app/dataType';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  products: Product[] | undefined;
  currentDate: Date = new Date();
  constructor(
    private prodservice: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authservice: AuthService
  ) {}
  prodQuantity: number = 1;
  removeCart = false;
  isLoggedIn: boolean = false;
  user: any;
  prod_id: any;

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    const id = this.route.snapshot.paramMap.get('Products_id');
    this.prod_id = id;

    id &&
      this.prodservice.getByID(id).subscribe((product) => {
        this.products = [product];
        // console.log(product);

        let cartData = localStorage.getItem('localCart');
        if (id && cartData) {
          let items: Product[] = JSON.parse(cartData);
          // items = items.filter((item: Product) => {
          //   item.id === id;
          // });
          // if (items.length) {
          //   this.removeCart = true;
          // } else {
          //   this.removeCart = false;
          // }

          //another way
          let isInCart = items.some((item: Product) => item.id === id); // Check if the current product is in the cart
          this.removeCart = isInCart; // some will return boolean whch we are storing in isinCart
        }
      });

    let auth = localStorage.getItem('auth');
    if (auth) {
      this.isLoggedIn = true;
      this.user = JSON.parse(auth);
    } else {
      this.isLoggedIn = false;
    }

    this.getUserCart();
  }

  userCartItem: any;

  getUserCart() {
    this.prodservice.getCartItems(this.user.userId).subscribe({
      next: (res: any) => {
        console.log(res, 'res---------');
        this.userCartItem = res;
        // this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.log('err');
        this.toastr.warning('Product already in Cart');
      },
    });
  }

  handleQuantity(val: string) {
    if (this.prodQuantity < 20 && val === 'plus') {
      this.prodQuantity += 1;
    } else if (this.prodQuantity > 1 && val === 'min') {
      this.prodQuantity -= 1;
    } else {
      this.prodQuantity = 1;
    }
  }

  AddToCart() {
    if (this.products && this.user) {
      // this.products.forEach((product) => {
      //   product.quantity = this.prodQuantity;
      // });
      // // console.log(this.products);
      // if (!sessionStorage.getItem('username')) {
      //   this.toastr.warning('You dont have access', 'Please Login ');
      // }
      // if (sessionStorage.getItem('username')) {
      //   let cartData = localStorage.getItem('localCart');
      //   let updatedCartData: Product[] = [];
      //   if (cartData) {
      //     updatedCartData = JSON.parse(cartData);
      //   }
      //   updatedCartData.push(...this.products);

      //   localStorage.setItem('localCart', JSON.stringify(updatedCartData));
      //   // // console.log(this.products);
      //   this.prodservice.localCart(this.products);
      //   this.removeCart = true;
      // }

      //
      let userId = this.user.userId;
      let productId = this.prod_id;
      // let quantity: number = 1;
      // this.products.forEach((product) => {
      //   product.quantity = quantity;
      // });

      let quantity = this.prodQuantity;

      this.prodservice.addToCart(userId, productId, quantity).subscribe({
        next: (res) => {
          this.userCartItem.push(res);
          console.log(res, 'res');
          this.removeCart = true;
          this.toastr.success('Product Added');

          // this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.log('err');
          this.toastr.warning('Product already in Cart');
        },
      });
    }
  }

  RemoveCart(prodId: any) {
    // this.prodservice.removeFromCart(prodId);
    let userId = this.user.userId;
    let productId = this.prod_id;
    this.prodservice.removeFromCart(userId, productId).subscribe(
      (res) => {
        this.userCartItem = [];
        this.removeCart = false;
        this.toastr.success('Removed from cart');
      },
      (err) => {
        console.log(err);
        this.toastr.warning('Error Occured');
      }
    );
  }

  buyCart() {
    if (!localStorage.getItem('auth')) {
      this.toastr.warning('You dont have access', 'Please Login ');
    } else {
      this.router.navigate(['/cart']);
    }
  }

  // by dotnet code

  addTocart() {
    if (this.authservice.isLoggedIn()) {
      // this.prodservice.addToCart()
    }
  }
}
