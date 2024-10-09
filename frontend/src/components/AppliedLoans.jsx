import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "./loader";

function AppliedLoans({ user }) {
    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 7;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLoans();
    }, [loading]);

    const fetchLoans = async () => {
        try {
            const response = await axios.get("https://credit-app-backend.onrender.com/api/v1/verifier/getVerifierLoan");
            setLoans(response.data.pendingList);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Error fetching loans",
                text: error?.response?.data?.message || "Unexpected error occurred"
            });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleStatusChange = async (e, loan) => {
        const loanId = loan._id;
        const verificationStatus = e.target.value;
        setLoading(true);
        try {
            const response = await axios.post("https://credit-app-backend.onrender.com/api/v1/verifier/updateVerificationStatus", { loanId, verificationStatus });
            fetchLoans(); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Error updating status",
                text: error?.response?.data?.message || "Unexpected error occurred"
            });
        }finally{
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        if (status === "pending") {
            return "bg-yellow-500";
        } else if (status === "verified") {
            return "bg-green-500";
        } else if (status === "not_verified") {
            return "bg-red-500";
        }
        return "bg-gray-500";
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentLoans = loans.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(loans.length / entriesPerPage);

    return (
        <div className="bg-white p-6 rounded shadow">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">Applied Loans</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-600">
                                <th className="pb-2">Customer name</th>
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLoans.map((loan, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{loan?.applicant?.name || ""}</td>
                                    <td className="py-2">{loan.updatedAt}</td>
                                    <td className="py-2">
                                        <select
                                            className={`px-2 py-1 rounded ${getStatusColor(loan.verificationStatus)}`}
                                            value={loan.verificationStatus}
                                            onChange={(e) => handleStatusChange(e, loan)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="verified">Verified</option>
                                            <option value="not_verified">Not Verified</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 flex justify-between items-center">
                        <div>Rows per page: {entriesPerPage}</div>
                        <div>
                            {indexOfFirstEntry + 1}-{Math.min(indexOfLastEntry, loans.length)} of {loans.length}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="text-gray-500"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                className="text-gray-500"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default AppliedLoans;
