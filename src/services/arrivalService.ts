import { format } from 'date-fns'
import { prisma } from "../prisma.js"
import { Arrival, Asset } from "../types/arrivalTypes.js"

const sequenceArrivalEntity = 'ARRIVAL'
const sequenceAssetEntity = 'ASSET'

export async function createArrival(newArrival: Arrival) {

  const arrivalLocation = 'ARRIVAL'
  const arrivalTrackingStatus = 'RECEIVING'
  const arrivalAvailabilityStatus = 'AVAILABLE'
  const warehouseCode = newArrival.warehouse.city_code
  const currentDateTime = new Date()
  const barcodes = await generateBarcodes(newArrival.assets, warehouseCode, currentDateTime)

  const arrival = await prisma.arrival.create({
    data: {
      arrival_number: await getNewArrivalNumber(warehouseCode, currentDateTime),
      notes: newArrival.comment,
      created_at: currentDateTime,
      destination: { connect: { id: newArrival.warehouse.id } },
      origin: { connect: { id: newArrival.vendor.id } },
      transporter: { connect: { id: newArrival.transporter.id } },
      assets: {
        create: newArrival.assets.map(a => ({
          barcode: barcodes[a.serialNumber],
          serial_number: a.serialNumber,
          model: { connect: { id: a.model.id } },
          Location: { connect: { warehouse_id_location: { warehouse_id: newArrival.warehouse.id, location: arrivalLocation } } },
          created_at: currentDateTime,
          is_held: false,
          TrackingStatus: { connect: { status: arrivalTrackingStatus } },
          AvailabilityStatus: { connect: { status: arrivalAvailabilityStatus } },
          TechnicalStatus: { connect: { id: a.technicalStatus.id } },
          asset_accessories: {
            create: a.coreFunctions.map(c => ({ accessory_id: c.id }))
          },
          technical_specification: {
            create: {
              meter_black: a.meterBlack,
              meter_colour: a.meterColour,
              meter_total: a.meterBlack + a.meterColour,
              internal_finisher: a.internalFinisher,
              cassettes: a.cassettes
            }
          },
          cost: {
            create: {

            }
          }
        }))
      }
    }
  })

  return arrival.arrival_number
}


async function generateBarcodes(assets: Asset[], warehouseCode: string, date: Date) {
  const barcodes: Record<string, string> = {}
  for (const asset of assets) {
    barcodes[asset.serialNumber] = await getNewAssetBarcode(warehouseCode, date)
  }
  return barcodes
}

async function getNewArrivalNumber(warehouseCode: string, date: Date): Promise<string> {
  const formattedDate = format(date, 'yyMMdd')
  const sequence = await getNextSequence(sequenceArrivalEntity, warehouseCode, date)
  return `A${warehouseCode}-${formattedDate}-${String(sequence).padStart(3, '0')}`
}

async function getNewAssetBarcode(warehouseCode: string, date: Date): Promise<string> {
  const formattedDate = format(date, 'yyMMdd')
  const sequence = await getNextSequence(sequenceAssetEntity, warehouseCode, date)
  return `${warehouseCode}-${formattedDate}-${String(sequence).padStart(4, '0')}`
}

async function getNextSequence(entityType: string, warehouseCode: string, date: Date): Promise<number> {
  const formattedDate = format(date, 'yyyy-MM-dd')
  const result = await prisma.$queryRaw<[{ get_next_sequence: number }]>`SELECT get_next_sequence(${entityType}, ${warehouseCode}, ${formattedDate})`
  return result[0].get_next_sequence
}
export async function updateArrival(data: Arrival) {
  const assetUpdates = data.assets.flatMap(asset => [
    prisma.asset.update({
      where: { id: asset.id },
      data: {
        model_id: asset.model.id,
        serial_number: asset.serialNumber,
        technical_status_id: asset.technicalStatus.id,
        technical_specification: {
          update: {
            meter_black: BigInt(asset.meterBlack),
            meter_colour: BigInt(asset.meterColour),
            meter_total: BigInt(asset.meterBlack + asset.meterColour),
            cassettes: asset.cassettes,
            internal_finisher: asset.internalFinisher
          }
        }
      }
    }),
    prisma.assetAccessory.deleteMany({
      where: { asset_id: asset.id }
    })
  ])

  const accessoryCreates = data.assets.flatMap(asset => asset.coreFunctions.map(cf => prisma.assetAccessory.create({
    data: {
      asset_id: asset.id!,
      accessory_id: cf.id
    }
  })
  )
  )

  await prisma.$transaction([
    prisma.arrival.update({
      where: { id: data.id },
      data: {
        origin_id: data.vendor.id,
        transporter_id: data.transporter.id,
        destination_id: data.warehouse.id,
        notes: data.comment
      }
    }),
    ...assetUpdates,
    ...accessoryCreates
  ])
}
