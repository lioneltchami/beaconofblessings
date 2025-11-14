import jsPDF from 'jspdf'

interface DonationData {
  donorName: string
  email: string
  amount: string
  frequency: 'one-time' | 'monthly'
  date: string
  transactionId: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  dedication?: {
    type: 'honor' | 'memory'
    name: string
  }
}

export const generateDonationReceipt = (donationData: DonationData) => {
  const doc = new jsPDF()
  
  // Set up colors (using green theme)
  const primaryGreen = [34, 197, 94] // #22c55e
  const darkGreen = [21, 128, 61] // #15803d
  const lightGray = [107, 114, 128] // #6b7280
  const darkGray = [31, 41, 55] // #1f2937
  
  // Header
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.rect(0, 0, 210, 40, 'F')
  
  // Organization Name
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('Beacon of Blessings', 20, 20)
  doc.setFontSize(14)
  doc.text('Charity Initiative', 20, 30)
  
  // Heart icon placeholder
  doc.setDrawColor(255, 255, 255)
  doc.setLineWidth(2)
  doc.circle(180, 20, 8)
  doc.setFontSize(16)
  doc.text('♥', 176, 24)
  
  // Receipt Title
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('DONATION RECEIPT', 20, 60)
  
  // Receipt ID and Date
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
  doc.text(`Receipt ID: ${donationData.transactionId}`, 20, 70)
  doc.text(`Date: ${donationData.date}`, 20, 77)
  
  // Donor Information Section
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('DONOR INFORMATION', 20, 95)
  
  // Draw line under section header
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.setLineWidth(1)
  doc.line(20, 98, 190, 98)
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  
  let yPos = 110
  doc.text(`Name: ${donationData.donorName}`, 20, yPos)
  yPos += 7
  doc.text(`Email: ${donationData.email}`, 20, yPos)
  yPos += 7
  
  if (donationData.address) {
    doc.text(`Address: ${donationData.address}`, 20, yPos)
    yPos += 7
  }
  
  if (donationData.city || donationData.state || donationData.zipCode) {
    const location = [donationData.city, donationData.state, donationData.zipCode]
      .filter(Boolean)
      .join(', ')
    if (location) {
      doc.text(`City/State/ZIP: ${location}`, 20, yPos)
      yPos += 7
    }
  }
  
  if (donationData.country) {
    doc.text(`Country: ${donationData.country}`, 20, yPos)
    yPos += 7
  }
  
  // Donation Information Section
  yPos += 10
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('DONATION INFORMATION', 20, yPos)
  
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.line(20, yPos + 3, 190, yPos + 3)
  
  yPos += 15
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  
  doc.text(`Donation Amount: $${donationData.amount} USD`, 20, yPos)
  yPos += 7
  doc.text(`Donation Type: ${donationData.frequency === 'monthly' ? 'Monthly Recurring' : 'One-time'}`, 20, yPos)
  yPos += 7
  doc.text(`Transaction ID: ${donationData.transactionId}`, 20, yPos)
  yPos += 7
  doc.text(`Date Received: ${donationData.date}`, 20, yPos)
  
  // Dedication if applicable
  if (donationData.dedication) {
    yPos += 7
    const dedicationText = donationData.dedication.type === 'honor' 
      ? `In Honor Of: ${donationData.dedication.name}`
      : `In Memory Of: ${donationData.dedication.name}`
    doc.text(dedicationText, 20, yPos)
  }
  
  // Tax Information Section
  yPos += 20
  doc.setFillColor(254, 243, 199) // amber-100
  doc.setDrawColor(251, 191, 36) // amber-400
  doc.setLineWidth(1)
  doc.rect(20, yPos - 5, 170, 25)
  
  doc.setTextColor(146, 64, 14) // amber-800
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('TAX DEDUCTIBILITY NOTICE', 25, yPos + 5)
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(120, 53, 15) // amber-900
  const taxNotice = 'Beacon of Blessings Charity Initiative is registered in Nigeria. This donation may not'
  const taxNotice2 = 'be tax-deductible in the United States, Canada, or other countries outside Nigeria.'
  const taxNotice3 = 'Please consult your tax advisor regarding international charitable donations.'
  
  doc.text(taxNotice, 25, yPos + 12)
  doc.text(taxNotice2, 25, yPos + 17)
  doc.text(taxNotice3, 25, yPos + 22)
  
  // Organization Information Section
  yPos += 40
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('ORGANIZATION INFORMATION', 20, yPos)
  
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.line(20, yPos + 3, 190, yPos + 3)
  
  yPos += 15
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  
  doc.text('Beacon of Blessings Charity Initiative', 20, yPos)
  yPos += 7
  doc.text('Lagos, Nigeria', 20, yPos)
  yPos += 7
  doc.text('Email: info@beaconofblessings.org', 20, yPos)
  yPos += 7
  doc.text('Website: www.beaconofblessings.org', 20, yPos)
  
  // Thank you message with Bible verse
  yPos += 20
  doc.setFillColor(240, 253, 244) // green-50
  doc.setDrawColor(34, 197, 94) // green-500
  doc.rect(20, yPos - 5, 170, 30)
  
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('THANK YOU FOR YOUR GENEROSITY', 25, yPos + 5)
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(21, 128, 61) // green-800
  doc.text('Your donation will directly support educational opportunities for vulnerable', 25, yPos + 12)
  doc.text('children in Nigeria. Together, we are making a lasting difference.', 25, yPos + 17)
  
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.text('"Give, and it will be given to you..." - Luke 6:38', 25, yPos + 24)
  
  // Footer
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const footerY = 280
  doc.text('This receipt was generated electronically and is valid without signature.', 20, footerY)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, footerY + 5)
  
  // Save the PDF
  const fileName = `Beacon_of_Blessings_Receipt_${donationData.transactionId}.pdf`
  doc.save(fileName)
}

export const generateReceiptPreview = (): string => {
  // This function could generate a base64 string for preview purposes
  // For now, it returns a placeholder
  return 'Receipt preview would be shown here'
}