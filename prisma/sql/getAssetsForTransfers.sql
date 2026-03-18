select
  b."name" as brand,
  m."name" as model,
  at.asset_type as asset_type,
  a.barcode as barcode,
  a.serial_number as serial_number,
  s.meter_total as meter_total,
  wo.city_code as warehouse_city_code,
  wo.street as warehouse_street,
  wd.city_code as warehouse_city_code,
  wd.street as warehouse_street,
  tr.status as tracking_status,
  av.status as availability_status,
  te.status as technical_status
from "AssetTransfer" tt
  join "Transfer" t on t.id = tt.transfer_id
  join "Warehouse" wo on wo.id = t.origin_id
  join "Warehouse" wd on wd.id = t.destination_id
  join "Asset" a on a.id = tt.asset_id
  join "TechnicalSpecification" s on s.asset_id = a.id
  join "Model" m on m.id = a.model_id
  join "Brand" b on b.id = m.brand_id
  join "AssetType" at on at.id = m.asset_type_id
  join "TrackingStatus" tr on tr.id = a.tracking_status_id
  join "AvailabilityStatus" av on av.id = a.availability_status_id
  join "TechnicalStatus" te on te.id = a.technical_status_id
where t.transfer_number = $1
and ($2 = 0 or wo.id = $2)
and ($3 = 0 or wd.id = $3)