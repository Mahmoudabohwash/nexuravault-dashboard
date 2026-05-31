 let myChartInstance = null;
export function renderMyChart(item, creator,content) {
    const chartWrapper = creator("div" , "chart-Wrapper");
      const chartCanvas = creator("canvas");
       chartWrapper.appendChild(chartCanvas);      
    content.appendChild(chartWrapper);
       if (myChartInstance !== null) {
         myChartInstance.destroy();
       }
      myChartInstance = new Chart(chartCanvas,{
         type: 'bar',
         data: {
            labels: ['M5', 'M3', 'M1', 'X6', 'X5', 'M4'],
            datasets: [{
               label: 'Performance%',
               data: [99, 85, 70,40,20,10],
               borderWidth: 5
            }]
         },options: {
                   responsive:true,
                   plugins: { 
                   legend: { label: {"color":"#ffd500", font:{size:18} }}
                   }
                   } 
                   });
                   };

  
   