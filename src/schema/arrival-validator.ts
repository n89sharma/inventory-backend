import { z } from "zod"

export const CoreFunctionsSchema = z.object({
  id: z.number(),
  accessory: z.string()
})

const AssetTypeScehma = z.object({
  id: z.number(),
  asset_type: z.string()
})

export const StatusSchema = z.object({
  id: z.number(),
  status: z.string()
})

const RoleSchema = z.object({
  id: z.number(),
  role: z.string()
})

const InvoiceTypeSchema = z.object({
  id: z.number(),
  type: z.string()
})

export const WarehouseSchema = z.object({
  id: z.number(),
  city_code: z.string(),
  street: z.string(),
  is_active: z.boolean()
})

const ConstantsSchema = z.object({
  coreFunctions: z.array(CoreFunctionsSchema),
  assetTypes: z.array(AssetTypeScehma),
  trackingStatuses: z.array(StatusSchema),
  availabilityStatuses: z.array(StatusSchema),
  technicalStatuses: z.array(StatusSchema),
  roles: z.array(RoleSchema),
  invoiceTypes: z.array(InvoiceTypeSchema),
  warehouses: z.array(WarehouseSchema)
})

export type Constants = z.infer<typeof ConstantsSchema>
export type CoreFunction = z.infer<typeof CoreFunctionsSchema>
export type AssetType = z.infer<typeof AssetTypeScehma>
export type Status = z.infer<typeof StatusSchema>
export type Role = z.infer<typeof RoleSchema>
export type InvoiceType = z.infer<typeof InvoiceTypeSchema>
export type Warehouse = z.infer<typeof WarehouseSchema>

export const ModelSchema = z.object({
  id: z.number(),
  brand_name: z.string(),
  model_name: z.string(),
  asset_type: z.string(),
  weight: z.number(),
  size: z.number()
})

export type Model = z.infer<typeof ModelSchema>

export const OrgSchema = z.object({
  id: z.number(),
  account_number: z.string(),
  name: z.string()
})

export type Organization = z.infer<typeof OrgSchema>

export const NewAssetSchema = z.object({
  tempId: z.uuid(),
  model: ModelSchema.refine(val => !!val, "Model is required"),
  serialNumber: z.string().refine(val => val.length > 0, "Serial number is required"),
  meterBlack: z.number().min(0, "Meter must be positive"),
  meterColour: z.number().min(0, "Meter must be positive"),
  cassettes: z.number().min(0, "Cassettes are required"),
  technicalStatus: StatusSchema.refine(val => !!val, "Technical status is required"),
  internalFinisher: z.string(),
  coreFunctions: z.array(CoreFunctionsSchema)
})

export type NewAsset = {
  tempId: string,
  model: Model,
  serialNumber: string,
  meterBlack: number,
  meterColour: number,
  cassettes: number,
  technicalStatus: Status,
  internalFinisher: string,
  coreFunctions: CoreFunction[]
}

export const NewArrivalSchema = z.object({
  vendor: OrgSchema.refine(val => !!val, "Vendor required"),
  transporter: OrgSchema.refine(val => !!val, "Transporter required"),
  warehouse: WarehouseSchema.refine(val => !!val, "Warehouse required"),
  comment: z.string(),
  assets: z.array(NewAssetSchema).nonempty("No assets in the arrival")
})

export type NewArrival = {
  vendor: Organization,
  transporter: Organization,
  warehouse: Warehouse,
  comment: string
  assets: NewAsset[]
}
