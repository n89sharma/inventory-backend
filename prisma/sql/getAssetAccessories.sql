SELECT
    accessory
from "AssetAccessory" aa
join "Asset" a ON a.id = aa.asset_id
where a.barcode = $1