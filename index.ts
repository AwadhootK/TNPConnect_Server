import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty',
})

async function main() {
    
    // const user = await prisma.student.deleteMany();

    // console.log(user);
    
//   const user = await prisma.student.create({
//     data: {
//       enrollmentNo: 'A1234500',
//       password: 'mysecretpassword',
//       name: 'John Doe',
//       rollNo: '2023041',
//       email: 'johny.doe@example.com',
//       prnNo: '1234567898',
//       branch: 'CSE',
//       cgpa: 8.5,
//       year: 'TE',
//       countOfBacklogs: 1,
//       isInterned: false,
//       gender: 'Male',
//       companyName: 'NA',
//       StudentDocuments: {
//         create: {
//           resume: 'path/to/resume.pdf',
//           photo: 'path/to/photo.jpg',
//           tenthMarksheet: 'path/to/tenth_marksheet.pdf',
//           twelfthMarksheet: 'path/to/twelfth_marksheet.pdf',
//           transcript: 'path/to/transcript.pdf',
//           collegeID: 'path/to/college_id.pdf',
//           aadharCard: 'path/to/aadhar_card.pdf',
//           panCard: 'path/to/pan_card.pdf',
//           amcatPaymentReceipt: 'path/to/amcat_payment_receipt.pdf',
//           amcatResult: 'path/to/amcat_result.pdf'
//         }
//       }
//     }
//   })

//   console.log(user)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect
  })
