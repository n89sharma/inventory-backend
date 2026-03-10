import { prisma } from "../prisma.js"
import { format, startOfDay } from 'date-fns'
import { NewArrival, NewAsset } from "../schema/arrival-validator.js"

const sequenceArrivalEntity = 'ARRIVAL'
const sequenceAssetEntity = 'ASSET'

export async function createArrival(newArrival: NewArrival) {

  const unknownUserId = 289 //UNKNOWN
  const arrivalLocation = 'ARRIVAL'
  const arrivalTrackingStatus = 'RECEIVING'
  const arrivalAvailabilityStatus = 'AVAILABLE'
  const warehouseCode = newArrival.warehouse.city_code
  const date = new Date()
  const barcodes = await generateBarcodes(newArrival.assets, warehouseCode, startOfDay(date))

  const arrival = await prisma.arrival.create({
    data: {
      arrival_number: await getNewArrivalNumber(warehouseCode, startOfDay(date)),
      notes: newArrival.comment,
      created_at: date,
      created_by: { connect: { id: unknownUserId } },
      destination: { connect: { id: newArrival.warehouse.id } },
      origin: { connect: { id: newArrival.vendor.id } },
      transporter: { connect: { id: newArrival.transporter.id } },
      assets: {
        create: newArrival.assets.map(a => ({
          barcode: barcodes[a.serialNumber],
          serial_number: a.serialNumber,
          model: { connect: { id: a.model.id } },
          warehouse: { connect: { id: newArrival.warehouse.id } },
          asset_location: arrivalLocation,
          created_at: date,
          is_held: false,
          TrackingStatus: { connect: { status: arrivalTrackingStatus } },
          AvailabilityStatus: { connect: { status: arrivalAvailabilityStatus } },
          TechnicalStatus: { connect: { id: a.technicalStatus.id } }
        }))
      }
    }
  })

  return arrival.arrival_number
}


async function generateBarcodes(assets: NewAsset[], warehouseCode: string, date: Date) {
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
  const result = await prisma.$queryRaw<[{ get_next_sequence: number }]>`SELECT get_next_sequence(${entityType}, ${warehouseCode}, date)`
  return result[0].get_next_sequence
}