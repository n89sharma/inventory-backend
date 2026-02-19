select
	b."name" as brand,
	m."name" as model,
	a.barcode as barcode,
	a.serial_number as serial_number,
	a.technical_status as technical_status,
	t.meter_total as meter_total
from "Invoice" i 
join "Asset" a on i.id = a.purchase_invoice_id 
join "TechnicalSpecification" t on t.asset_id = a.id 
join "Model" m on m.id = a.model_id 
join "Brand" b on b.id = m.brand_id 
where i.invoice_number  = $1