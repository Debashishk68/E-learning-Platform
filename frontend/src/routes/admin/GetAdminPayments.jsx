import React from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import useGetAdminPayments from "../../hooks/useGetAdminPayments";

const AdminPayments = () => {
  const { data, isLoading, isError } = useGetAdminPayments();

  if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
  if (isError || !data?.success) return <div className="flex justify-center text-red-600 p-8">Failed to fetch payments</div>;

  const payments = data.payments;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6 md:ml-64"> {/* Pushes content when sidebar is fixed */}
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">💰 Payments Received</h2>

          {payments.length === 0 ? (
            <p className="text-gray-600 text-center">No payments found.</p>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-5">Student</th>
                    <th className="py-3 px-5">Email</th>
                    <th className="py-3 px-5">Course</th>
                    <th className="py-3 px-5 text-green-600">Amount</th>
                    <th className="py-3 px-5">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 border-t">
                      <td className="py-3 px-5">{p.studentName}</td>
                      <td className="py-3 px-5">{p.studentEmail}</td>
                      <td className="py-3 px-5">{p.courseTitle}</td>
                      <td className="py-3 px-5 text-green-700 font-medium">₹{p.amount}</td>
                      <td className="py-3 px-5 text-gray-600">
                        {new Date(p.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
