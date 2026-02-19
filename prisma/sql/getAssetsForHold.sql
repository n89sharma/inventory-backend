select
	b."name" as brand,
	m."name" as model,
	a.barcode as barcode,
	a.serial_number as serial_number,
	a.technical_status as technical_status,
	t.meter_total as meter_total
from "Hold" h 
join "Asset" a on h.id = a.hold_id 
join "TechnicalSpecification" t on t.asset_id = a.id 
join "Model" m on m.id = a.model_id 
join "Brand" b on b.id = m.brand_id 
where h.hold_number = $1