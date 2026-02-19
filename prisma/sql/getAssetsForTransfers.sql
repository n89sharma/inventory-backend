select
	b."name" as brand,
	m."name" as model,
	a.barcode as barcode,
	a.serial_number as serial_number,
	a.technical_status as technical_status,
	ts.meter_total as meter_total
from "AssetTransfer" at
join "Transfer" t on t.id = at.transfer_id 
join "Asset" a on a.id = at.asset_id 
join "TechnicalSpecification" ts on ts.asset_id  = a.id
join "Model" m on m.id = a.model_id 
join "Brand" b on b.id = m.brand_id 
where t.transfer_number = $1
