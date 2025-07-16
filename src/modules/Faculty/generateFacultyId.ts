import { Faculty } from './faculty.model';

export const generateFacultyId = async (): Promise<string> => {
  // Get the latest created faculty
  const lastFaculty = await Faculty.findOne({}, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  let currentId = 0;
  if (lastFaculty?.id) {
    const idParts = lastFaculty.id.split('-'); // ['Faculty', '0001']
    currentId = parseInt(idParts[1], 10); // Convert '0001' to 1
  }

  const newIdNumber = currentId + 1;
  const newFacultyId = `Faculty-${newIdNumber.toString().padStart(4, '0')}`; // Faculty-0002

  return newFacultyId;
};
