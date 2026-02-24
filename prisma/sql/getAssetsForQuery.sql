-- @param {String} $1:brand
-- @param {String} $2:modelPattern
-- @param {String} $3:assetType
-- @param {String} $4:trackingStatus
-- @param {String} $5:cityCode
-- @param {BigInt} $6:meterMax
select
  b."name" as brand,
  m."name" as model,
  at.asset_type as asset_type,
  a.barcode as barcode,
  a.serial_number as serial_number,
  ts.status as tracking_status,
  t.meter_total as meter_total
from "Asset" a
  join "TechnicalSpecification" t on t.asset_id = a.id
  join "Model" m on m.id = a.model_id
  join "Brand" b on b.id = m.brand_id
  join "AssetType" at on at.id = a.asset_type_id
  join "TrackingStatus" ts on ts.id = a.tracking_status_id
  left join "Warehouse" w on w.id = a.warehouse_id
where ($1 = 'NOT_PROVIDED' or b."name" = $1)
  AND
  ($2 = 'NOT_PROVIDED' or m."name"
~* $2)
  AND
($3 = 'NOT_PROVIDED' or at.asset_type = $3)
  AND
($4 = 'NOT_PROVIDED' or ts.status = $4)
  AND
($5 = 'NOT_PROVIDED' or w.city_code = $5)
  AND
($6 = 999999999 or t.meter_total <= $6::bigint)