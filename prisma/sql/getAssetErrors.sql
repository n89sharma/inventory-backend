SELECT
    e.code,
    e.category
from "AssetError" ae
join "Asset" a ON a.id = ae.asset_id
join "Error" e on e.id = ae.error_id 
where a.barcode = $1