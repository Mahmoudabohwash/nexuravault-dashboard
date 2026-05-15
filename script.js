 import { sidbarlinks,routes,headerdata , pages, orderes} from "./data.js";
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
bodywrappr.style.display = "flex";
bodywrappr.style.flexGrow = "1";
container.appendChild(header);
bodywrappr.appendChild(sidbar);
bodywrappr.appendChild(content);
container.appendChild(bodywrappr);
document.body.appendChild(container);
//الهيدر
headerdata.forEach(data => {
   const el =
      document.createElement(data.tag);
   if (data.text) el.textContent = data.text;
   if (data.src) el.src = data.src;
   if (data.className) el.className = data.className;
   if (data.alt)el.alt = data.alt;
   header.appendChild(el);
})
//اعمل لوب علي الداتا السيدبار
sidbarlinks.forEach(data => {
   const btn =
      document.createElement("button");
   btn.className = "action-btn";
   btn.textContent = `${data.icon} ${data.name}`;
   //  روح شوف المستخدم ضغط علي ايه واعرضو المحتوي عن طريق id بتاعو
   btn.onclick = () => {
      render(routes[data.id]);
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
//وظيفتها انها تلف ع العناصر وتشوف المتحوي اللي موجود جواهم
function drawpage(dataArray) {
  content.replaceChildren();
  // اعمل wrapper للـ stats و wrapper للـ products
  const statsWrapper = creator("div", "stats-wrapper");
  const cardsWrapper = creator("div", "cards-wrapper");
  
  dataArray.forEach(item => {
    let el;
    if (item.type === "header-row") {
      el = creator("div", item.className);
      const t = creator("h1", null, item.title);
      const d = creator("p", null, item.sub);
      el.append(t, d);
      content.appendChild(el); // الهيدر يتحط دايركت
    }
    else if (item.type === "stat-card") {
      el = creator("div", item.className);
      const h2 = creator("h2", null, item.label);
      const p = creator("p", null, String(item.value));
      el.append(h2, p);
      statsWrapper.appendChild(el); // الكروت في الـ stats
    }
    else if (item.type === "car-card") {
      el = creator("div", item.className);
      const img = creator("img", "car-card-image", null, item.image);
      const title = creator("h3", null, item.title);
      const price = creator("p", null, item.price);
      const Edit = creator("button", "btn","Edit",) 
      const Delet = creator("button", "btn","Delet",) 
      el.append(img, title, price,Edit,Delet);
      cardsWrapper.appendChild(el); // العربيات في الـ cards
    }
    else if (item.type === "Order-table"){
     const table = creator("table", "order-table-class");
     const tbody = creator("tbody"); 
     const thead = creator("thead");
     const headerRow  = creator("tr");
      const keys = 
      Object.keys(item.data[0]);
      keys.forEach(kay => {
         const th = creator("th" , null , kay.toUpperCase());
         headerRow.appendChild(th);
      })
        thead.appendChild(headerRow);
   table.appendChild(thead);
     orderes.forEach(orderes => {
       const tr =creator("tr");
        Object.values(orderes).forEach(value =>{
         const td = creator("td", "tr-style" , String(value));
         tr.appendChild(td);
        });
        tbody.appendChild(tr);
      })
    table.appendChild(tbody);
    content.appendChild(table);
    
    }
      // حط الـ wrappers لو فيهم حاجة
  if (statsWrapper.children.length) content.appendChild(statsWrapper);
  if (cardsWrapper.children.length) content.appendChild(cardsWrapper);
  
    else if (item.type==="Chart"){
     const chartWrapper = creator("div" , "chart-Wrapper");
      const chartCanvas = creator("canvas");
       chartWrapper.appendChild(chartCanvas);      
    content.appendChild(chartWrapper);
      new Chart(chartCanvas, {
         type: 'bar',
         data: {
            labels: ['M5', 'M3', 'M1', 'X6', 'X5', 'M4'],
            datasets: [{
               label: 'Performance%',
               data: [99, 85, 70,40,],
               borderWidth: 5
            }]
         },options: {
                   responsive:true,
                   plugins: { 
                   legend: { label: {"color":"#fff", font:{size:18} }}
                   }
                   } 
                   });//new chart
                   }
});


}
function render(pageName) {
   //تغير URL
   window.history.pushState({},
      "", `#${pageName}`);
   drawpage(pages[pageName]);
}
render(routes[1]);

















const h1 = document.createElement("h1");
h1.textContent= "🔐";
h1.className = "hook";
 const UPG = 
   document.createElement("div");
   UPG.className = " UPGAPP";
   h1.onclick = () => {
      alert("This feature is locked! Upgrade to Nexura Pro unlock Ai tools")
   };
   UPG.appendChild(h1)
   sidbar.appendChild(UPG);