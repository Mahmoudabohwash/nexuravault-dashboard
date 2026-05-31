export function renderOrderTable(item, creator) {
    const orders = item.data; 
    if (!orders.length) {
        return creator("p", "empty-message", "لا توجد طلبات للعرض");
    }
    const table = creator("table", "order-table-class");
    const tbody = creator("tbody"); 
    const thead = creator("thead");
    const headerRow = creator("tr");

    const keys = Object.keys(orders[0]);
    keys.forEach(key => {
        const th = creator("th", null, key.toUpperCase());
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    orders.forEach(order => {
        const tr = creator("tr");
        Object.values(order).forEach(value => {
            const td = creator("td", "tr-style", String(value));
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    
    return table; // بنرجع الجدول كامل ومتغلف عشان الملف الرئيسي يستلمه
}