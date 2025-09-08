import React from "react";

const EnrolledStudents = () => {
  //create mock enrolled students
  const enrolledStudents = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      course: "React.js",
      date: "2023-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@example.com",
      course: "Node.js",
      date: "2023-01-02",
    },
  ];

  return (
    <div>
      Recent Enrollement
      {enrolledStudents.map((student) => (
        <div key={student.id} className="bg-white p-4 rounded shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-lg font-bold">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="text-lg font-bold">Enrolled In: {student.course}</p>
              <p className="text-sm text-gray-500">
                Enrolled on: {student.date}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrolledStudents;
