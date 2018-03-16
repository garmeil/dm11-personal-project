SELECT * FROM orders o JOIN order_items oi ON o.orderid = oi.orderid 
JOIN products p ON oi.productid = p.id;