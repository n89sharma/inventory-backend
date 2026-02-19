select
 	i.invoice_number,
 	o."name" as organization,
 	u."name" as created_by,
 	i.created_at as created_at,
 	i.is_cleared as is_cleared,
	i.invoice_type as invoice_type
from "Invoice" i
join "Organization" o on o.id = i.organization_id 
join "User" u on u.id = i.updated_by_id 
where i.created_at between $1 and $2