select
	a.arrival_number as arrival_number,
	a.created_at as created_at,
	w.city_code as destination_code,
	w.street as destination_street,
	o."name" as vendor,
	t."name" as transporter,
	u."name"  as created_by
from "Arrival" a
join "User" u on u.id = a.created_by_id 
join "Warehouse" w on w.id = a.destination_id 
join "Organization" o on o.id = a.origin_id 
join "Organization" t on t.id = a.transporter_id 
where a.created_at between $1 and $2
order by a.created_at desc