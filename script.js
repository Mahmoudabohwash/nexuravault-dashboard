 import { sidbarlinks,routes,headerdata , pages, orders} from "./data.js";
 import { renderOrderTable } from "./orders.js";
 import { rendercarcard } from "./Products.js";
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
function drawpage(dataArray , pageName) {
  content.replaceChildren();
  // اعمل wrapper للـ stats و wrapper للـ products
  const statsWrapper = creator("div", "stats-wrapper");
  const cardsWrapper = creator("div", "cards-wrapper");
  
  dataArray.forEach(item => {
    let el;
    if (item.type === "header-row") {
      el = creator("div", item.className);
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
        rendercarcard(newProduct,creator,cardsWrapper,makeImageEdit,showtoast,drawpage,dataArray,el);
      };
   }else {
         d = creator("p", null, item.sub);
      }
      el.append(t, d );
      content.appendChild(el); // العنوان في الأول
    
      
    }
    else if (item.type === "stat-card") {
      el = creator("div", item.className);
      const h2 = creator("h2", null, item.label);
      const p = creator("p", null, String(item.value));
      el.append(h2, p);
      statsWrapper.appendChild(el); // الكروت في الـ stats
    }
    else if (item.type === "car-card") {
      rendercarcard(item , 
         creator,cardsWrapper,makeImageEdit,
         showtoast,drawpage,dataArray)
    }
    else if (item.type === "Order-table") {
      const table = renderOrderTable(item, creator);
      content.appendChild(table);
    }
    if (statsWrapper.children.length) content.appendChild(statsWrapper);
    if (cardsWrapper.children.length) content.appendChild(cardsWrapper);
  



///Chart
    else if (item.type==="Chart"){
     const chartWrapper = creator("div" , "chart-Wrapper");
      const chartCanvas = creator("canvas");
       chartWrapper.appendChild(chartCanvas);      
    content.appendChild(chartWrapper);
      new Chart(chartCanvas,{
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
                   legend: { label: {"color":"#ffd500", font:{size:18} }}
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






//  upgrade 
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





// رفع الصور
function makeImageEdit(imgElement, onSaveCallback){
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

