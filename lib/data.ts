export const menuItems=[
 {name:'Golden Caramel Latte',category:'Coffee',price:249,desc:'Double espresso, silky milk, handmade caramel.',image:'photo-1461023058943-07fcbe16d735'},
 {name:'Velvet Cappuccino',category:'Coffee',price:199,desc:'Rich espresso finished with cloud-soft foam.',image:'photo-1570968915860-54d5c301fa9f'},
 {name:'Iced Vanilla Cloud',category:'Coffee',price:229,desc:'Chilled coffee, vanilla cream and crushed ice.',image:'photo-1517701604599-bb29b565090c'},
 {name:'French Butter Croissant',category:'Bakery',price:179,desc:'Golden, flaky and freshly baked each morning.',image:'photo-1555507036-ab1f4038808a'},
 {name:'Avocado Garden Toast',category:'Brunch',price:329,desc:'Toasted sourdough, avocado and fresh herbs.',image:'photo-1525351484163-7529414344d8'},
 {name:'Midnight Chocolate Cake',category:'Desserts',price:279,desc:'Decadent dark chocolate and whipped cream.',image:'photo-1578985545062-69928b1d9587'},
 {name:'Berry Pancake Stack',category:'Brunch',price:349,desc:'Fluffy pancakes, berries and maple drizzle.',image:'photo-1528207776546-365bb710ee93'},
 {name:'Classic Cheesecake',category:'Desserts',price:299,desc:'Creamy vanilla cheesecake on a buttery crust.',image:'photo-1533134242443-d4fd215305ad'},
];
export const photo=(id:string,width=900)=>`https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=85`;
export const galleryImages=[
 ['photo-1442512595331-e89e73853f31','Coffee art'],['photo-1501339847302-ac426a4a7cbb','Café interior'],['photo-1495474472287-4d71bcdd2085','Fresh coffee'],['photo-1559339352-11d035aa65de','Dining area'],['photo-1517248135467-4c7edcad34c4','Warm café lights'],['photo-1554118811-1e0d58224f24','Cozy café']
];
