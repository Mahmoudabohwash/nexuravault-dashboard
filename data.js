export const headerdata = [
  { tag: "div", className: "div-style", text: "wallet 5000 USD" },
  { tag: "h1", className: "h1-style", text: "NexuraVault " },
  { tag: "img", className: "img-style", src: "imag.jpg", alt: "NexuraVault-logo" },
];

export const sidbarlinks = [
  { name: "home", icon: "🏠", id: 1 },
  { name: "orders", icon: "🛑", id: 2 },
  { name: "Products", icon: "📦", id: 3 },
  { name: "Analytics", icon: "📊", id: 4 },
];

export const routes = {
  1: "home",
  2: "orders",
  3: "Products",
  4: "Analytics",
};
export const orderes = [
  { id : "ORD-001",custimer:"Mahmoud" , Products:"BMW M5", status:"Completed", total:"150,000$" },
  { id : "ORD-002",custimer:"ALi" , Products:"BMW M3", status:"Pending", total:"135,000$"},
 
];

export const pages = {
  home: [
    { type: "header-row", title: "Dashboard", sub: "Welcome-to-NexuraVault", className: "page-header",},
    {type: "stat-card",label: "Revenue",value: 5000,className: "stat-card",},
    { type: "stat-card", label: "ActiveUsers", value: 2.341, className: "stat-card",},
    { type: "stat-card",label: "Orders",value: 550,className: "stat-card",},
    {type: "stat-card", label: "Conversion ", value: 150, className: "stat-card", },
    {type: "Chart" },
  ],
  orders: [
    { type: "header-row", title: "Orders", sub: "Welcome-to-NexuraVault", className: "page-header", },
    { type: "Order-table", data:orderes},
  ],
  Products: [
    { type: "header-row", title: "Products", sub: "Welcome-to-NexuraVault", className: "page-header", },
 {
  id: "bmw1",
  type: "car-card",
  title: "BMW M5 - Black Hawk",
  className: "car-card",  
  price: "150,000 USD",
  image: "BMW/BMW.jpg", // المسار لصورتك اللي في الصورة
  description: "The definition of luxury and performance."
 },
    {
        id: "bmw2",
        type: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        className: "car-card",
        image: "BMW/BMW2.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw3",
        type: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        className: "car-card",
        image: "BMW/BMW3.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw4",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW4.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw5",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW5.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw6",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW6.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw7",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW7.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw8",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW8.jpg",
        description: "Unleash the wild side of driving."
    },
  
    {
        id: "bmw9",
        type: "car-card",
        className: "car-card",
        title: "BMW M3 - Tiger Edition",
        price: "135,000 USD",
        image: "BMW/BMW9.jpg",
        description: "Unleash the wild side of driving."
    },
  

  ],
  Analytics: [
    { type: "header-row", title: "Analytics", sub: "Welcome-to-NexuraVault", className: "page-header", },
    { type: "Chart" }
  ],
};
