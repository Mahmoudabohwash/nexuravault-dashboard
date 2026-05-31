 export function rendercarcard(item , creator,cardsWrapper,
    makeImageEdit,showtoast,drawpage,dataArray){
        
   const el = creator("div", item.className);
      const img = creator("img", "car-card-image", null, item.image);
      const title = creator("h3", null, item.title);
      const price = creator("p", null, item.price);
      const Edit = creator("button", "btn","Edit",) 
      const Delet = creator("button", "btn","Delet",) 
      Edit.onclick = () => {
         const backdrop = creator("div" , "modal-backdrop");
         const showcar = creator("div" ,"showcar-style");
         const modalIMG = creator("img" , "modal-product-image");
         modalIMG.src = item.image;
         makeImageEdit(modalIMG,(newUrl) =>{
            item.image = newUrl;
         });
         const inputname = creator("input" , "inputname");
         inputname.value = item.title
         const inputvalue = creator("input" , "inputvalue");
          inputvalue.value = item.price
         const btnsave = creator("button" , "btnsave");
         btnsave.innerText ="save";
         showcar.append(modalIMG,inputname,inputvalue,btnsave);
         backdrop.appendChild(showcar);
         document.body.appendChild(backdrop)
         backdrop.onclick = (e) => {
          if(e.target === backdrop){
          backdrop.remove();}
         }
         btnsave.onclick = () =>{
            item.title = inputname.value;                                         
            cardsWrapper.replaceChildren();
            drawpage(dataArray);
            backdrop.remove()
            showtoast("تم تحديث البيانات بنجاح");
         }
      }
      Delet.onclick = () => {
         el.remove();
         showtoast("تم حذف المنتج بنجاح");
      }
      el.append(img, title, price,Edit,Delet);
      cardsWrapper.appendChild(el); //
 }



 