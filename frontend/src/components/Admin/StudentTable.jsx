import React from "react";
import { FiTrash } from "react-icons/fi";
import useDeleteUser from "../../hooks/useDeleteUser"; // Update path if needed

const StudentTable = ({ students = [], filter }) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) =>
          student?.batch?.toString().includes(filter.split(" ")[0])
        );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">S. No.</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Batch</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id} className="border-t hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">{index + 1}</td>
                <td className="p-4 whitespace-nowrap">{student.name}</td>
                <td className="p-4 whitespace-nowrap">{student.email}</td>
                <td className="p-4 whitespace-nowrap">
                  {student.batch || "N/A"}
                </td>
                <td className="p-4 whitespace-nowrap flex justify-end">
                  <button
                    className={`text-red-600 hover:text-red-800 ${
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Delete"
                    onClick={() => {
                      if (
                        !isPending &&
                        window.confirm("Are you sure you want to delete this student?")
                      ) {
                        deleteUser(student.id);
                      }
                    }}
                    disabled={isPending}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
