import { Student } from "./student.model";


export const generateStudentId = async (): Promise<string> => {
  const lastStudent = await Student.findOne({}, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  let currentId = 0;
  if (lastStudent?.id) {
    const idParts = lastStudent.id.split('-'); // ['STU, '0001']
    currentId = parseInt(idParts[1], 10); // Convert '0001' to 1
  }

  const newIdNumber = currentId + 1;
  const newFacultyId = `STU-${newIdNumber.toString().padStart(4, '0')}`; // Faculty-0002

  return newFacultyId;
};
