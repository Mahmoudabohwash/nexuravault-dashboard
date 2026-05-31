 import { sidbarlinks,routes,headerdata , pages, orders} from "./data.js";
 import { renderOrderTable } from "./orders.js";
 import { rendercarcard } from "./Products.js";
 import { renderMyChart } from "./Chart.js";
 import { renderStats } from "./stats.js";
const container =
   document.createElement("div");
const sidbar =
   document.createElement("div");
const content =
   document.createElement("div");
const header =
   document.createElement("div");
const bodywrappr =
   document.createElement("div");
container.id = "main-container";
sidbar.id = "sidbar";
content.id = "content-area";
header.id = "header";
bodywrappr.id = "body-wrappr"
container.appendChild(header);
bodywrappr.appendChild(sidbar);
bodywrappr.appendChild(content);
container.appendChild(bodywrappr);
document.body.appendChild(container);
// داله الرساله
function showtoast(message){
   const toast = creator("div" , "toast-notification");
   toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(() =>{
         toast.remove();
      },1000);
}
// //الهيدر
headerdata.forEach(data => {
   const el = document.createElement(data.tag);
   if (data.text) el.textContent = data.text;
   if (data.src) el.src = data.src;
   if (data.className) el.className = data.className;
   if (data.alt) el.alt = data.alt;

   if (data.tag === "img") {
      el.src = data.src 
      el.onclick = () => {
         makeImageEdit(el, (newImgSrc) => {
            data.src = newImgSrc; 
            showtoast("تم تحديث اللوجو بنجاح!");
         });
      };
   }
   header.appendChild(el); 
});
sidbarlinks.forEach(data => {
   const btn =
      document.createElement("button");
   btn.className = "action-btn";
   btn.textContent = `${data.icon} ${data.name}`;
  btn.onclick = () => {
    const allButtons = document.querySelectorAll(".action-btn");
    allButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const pageName = routes[data.id];
    render(pageName);
};
   sidbar.appendChild(btn);
})
//ماكينه صناعه العناصر html
function creator(tag, className, text, img , alttext = "Nexuravalut") {
   const el =
      document.createElement(tag); //اصنع عناصر h1 p div
   if (className) {
      el.className = className;
   }
   if (text) {
      el.textContent = text;
   }
   if (img) {
      el.src = img;
      el.alt = alttext;
   }
   return el;
}





function drawpage(dataArray) {
  content.replaceChildren();
  const statsWrapper = creator("div", "stats-wrapper");
  const cardsWrapper = creator("div", "cards-wrapper");
  dataArray.forEach(item => {
        if (item.type === "header-row") {
        const  el = creator("div", item.className);
          const t = creator("h1", null, item.title);
          let d;
          if (item.title === "Products") {
            d = creator("button", "btn-ADD", "Add New Product");
            d.onclick = () => {
              const newProduct = {
                type: "car-card",
                price: "0",
                title: "New Product",
                image: "",
                className: "car-card"  
              };
              rendercarcard(newProduct, creator, cardsWrapper, makeImageEdit, showtoast, drawpage, dataArray, el);
            };
          } else {
            d = creator("p", null, item.sub);
          }
          el.append(t, d);
          content.appendChild(el);
        }
        else if (item.type === "stat-card") {
          renderStats(item, creator, statsWrapper);
        }
        else if (item.type === "car-card") {
          rendercarcard(item, creator, cardsWrapper, makeImageEdit, showtoast, drawpage, dataArray);
        }
        else if (item.type === "Order-table") {
          const table = renderOrderTable(item, creator);
          content.appendChild(table);
        }       
        else if (item.type === "Chart"){
          renderMyChart(item, creator, content);         
         }
      });
      if (statsWrapper.children.length) content.appendChild(statsWrapper);
      if (cardsWrapper.children.length) content.appendChild(cardsWrapper);
   }
function render(pagesName) {
    window.history.pushState({},"",`#/${pagesName}`);
    if(pagesName ==="Products" ){
         loadDashboard();
    } else {
    drawpage(pages[pagesName])
    }
}
render("home");










const h1 = document.createElement("h1");
h1.textContent= "🔐";
h1.className = "hook";
 const UPG = 
   document.createElement("div");
   UPG.className = " UPGAPP";
   h1.onclick = () => {
      showtoast("This feature is locked! Upgrade to Nexura Pro unlock Ai tools")
   };
   UPG.appendChild(h1)
   sidbar.appendChild(UPG);

   function makeImageEdit(imgElement, onSaveCallback) {
    imgElement.style.cursor = "pointer";
    imgElement.onclick = () => {
      const hiddeninput = creator("input");
      hiddeninput.type = "file";
      hiddeninput.accept = "image/*"; // شيلنا المسافة هنا
      hiddeninput.style.display = "none";
      hiddeninput.style.width = 200;
      document.body.appendChild(hiddeninput);
      hiddeninput.click(); 
      hiddeninput.onchange = () => {
         if (hiddeninput.files && hiddeninput.files[0]){
            const reader = new FileReader();
            reader.onload = (e) =>{
               const base64Url = e.target.result;
               imgElement.src = base64Url;
               onSaveCallback(base64Url);
               hiddeninput.remove();
            };
            reader.readAsDataURL(hiddeninput.files[0]);
         } else {
            hiddeninput.remove();
         }
      };
    };  
   }





   











function mapApiToFrontend(apiItems) {
    const headerRow = {
        type: "header-row",
        title: "Products",
        sub: "Welcome to NexuraVault",
        className: "page-header"
    };
    const formattedProducts = apiItems.map(item => ({
        id: item.id,
        type: "car-card", 
        title: item.title,
        price: `${item.price} USD`,
        image: item.image,
        className: "car-card"
    }));
    return [headerRow, ...formattedProducts];
}
async function loadDashboard() {
    try {
        if (typeof state !== 'undefined') state.loading = true;
        const res = await fetch("https://fakestoreapi.com/products");
        const rawData = await res.json();
        const finalData = mapApiToFrontend(rawData);
        if (typeof state !== 'undefined') {
            state.Products = finalData;
        }
        drawpage(finalData); 
    } catch (error) {
        if (typeof state !== 'undefined') state.loading = false;
        console.error("عطل في جلب البيانات:", error);
    }
}