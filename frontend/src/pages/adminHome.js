import { Button } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {
   
    const navigate=useNavigate()
    const [loading1, setLoading1] = useState(false);
    const [loans, setLoans]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const entriesPerPage = 7;
    const {user, setUser}= useContext(AppContext);
    const [users, setUsers]=useState([]);
    useEffect(() => {
        if(user === null){
            navigate('/login');
        }
        fetchLoans();
    }, [navigate, user]);
    useEffect(()=>{
        fetchUsers();
    }, [loading1, navigate, user])
    const getStatusColor = (status) => {
        if (status === "pending") {
            return "bg-yellow-500";
        } else if (status === "verified") {
            return "bg-green-500";
        } else if (status === "not_verified") {
            return "bg-red-500";
        }
        return "bg-gray-500"; // default/fallback color
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleNextPage1 = () => {
        if (currentPage1 < totalPages1) {
            setCurrentPage1(currentPage1 + 1);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePreviousPage1 = () => {
        if (currentPage1 > 1) {
            setCurrentPage1(currentPage1 - 1);
        }
    };
    const fetchLoans = async () => {
        try {
            const response = await axios.get("https://credit-app-backend.onrender.com/api/v1/admin/getAllLoans");
            setLoans(response.data.loans);
        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: "Error fetching loans",
                text: error?.response?.data?.message || "Unexpected error occurred"
            });
        }
    };
    const fetchUsers = async ()=>{
        try{
            const response=await axios.get("https://credit-app-backend.onrender.com/api/v1/admin/getAllUsers");
            const data=response.data.users;
            setUsers(data);
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: "Error fetching Users",
                text: error?.response?.data?.message || "Unexpected error occurred"
            });
        }
    }
    const logout = async () => {
        setUser(null); // Clear user from context
        localStorage.removeItem("user"); // Remove token from local storage
        try {
            await axios.post("https://credit-app-backend.onrender.com/api/v1/logout", {}, {withCredentials: true});
        } catch (error) {
        }
        navigate("/login"); // Redirect to login page
    };   
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfLastEntry1 = currentPage1 * entriesPerPage;

    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const indexOfFirstEntry1 = indexOfLastEntry1 - entriesPerPage;

    const currentLoans = loans.slice(indexOfFirstEntry, indexOfLastEntry);
    const currentUsers = users.slice(indexOfFirstEntry1, indexOfLastEntry1);

    const totalPages = Math.ceil(loans.length / entriesPerPage);
    const totalPages1 = Math.ceil(users.length / entriesPerPage)
    function getInitials(fullName) {
        const nameParts = fullName.trim().split(" ");
        
        const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        
        return initials;
    }    
    const StatCard = ({ title, value, icon }) => (
        <div className="bg-white shadow rounded p-4 flex items-center">
            <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mr-4">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <div className="text-xl font-bold">{value}</div>
                <div className="text-gray-600">{title}</div>
            </div>
        </div>
    );

    const LoanRow = ({ applicant, verifier, date, status }) => (
        <tr className="border-b">
            <td className="p-4">{applicant}</td>
            <td className="p-4">{verifier}</td>
            <td className="p-4">{date}</td>
            <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(status)}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
    const handleRoleChange = async (user) => {
        const userId = user._id;
        setLoading1(true);
        try {
            await axios.post("https://credit-app-backend.onrender.com/api/v1/admin/createVerifier", { userId });
            fetchUsers(); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Error updating role",
                text: error?.response?.data?.message || "Unexpected error occurred"
            });
        }finally{
            setLoading1(false);
        }
    };
    const UsersRow = ({ name, email, role, user }) => (
        <tr className="border-b">
            <td className="p-4">{name}</td>
            <td className="p-4">{email}</td>
            <td className="p-4">{getRole(user.role)}
            </td>
            <td className="p-4"><Button onClick={(e) => {handleRoleChange(user)}} colorScheme="green" variant="outline" className='ml-4'>
                        Make Verifier
                </Button></td>
        </tr>
    );
    const Sidebar = () => (
        <div className="bg-green-900 text-white w-64">
            <div className="flex items-center mb-8">
                <div className="text-2xl font-bold">CREDIT APP</div>
            </div>
            <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold">{getInitials(user.name)}</div>
                <div className="ml-4">
                    <div className="text-lg">{user ? user.name: "John Doe"}</div>
                </div>
            </div>
            <nav>
                <ul>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-tachometer-alt mr-2"></i> Dashboard</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-users mr-2"></i> Borrowers</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-money-check-alt mr-2"></i> Loans</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-undo-alt mr-2"></i> Repayments</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-cogs mr-2"></i> Loan Parameters</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-book mr-2"></i> Accounting</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-chart-line mr-2"></i> Reports</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-shield-alt mr-2"></i> Collateral</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-lock mr-2"></i> Access Configuration</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-piggy-bank mr-2"></i> Savings</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-coins mr-2"></i> Other Incomes</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-file-invoice-dollar mr-2"></i> Payroll</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-receipt mr-2"></i> Expenses</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-signature mr-2"></i> E-signature</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-user-tie mr-2"></i> Investor Accounts</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-calendar-alt mr-2"></i> Calendar</a></li>
                    <li className="mb-4"><a href="/nothing" className="flex items-center"><i className="fas fa-cog mr-2"></i> Settings</a></li>
                </ul>
            </nav>
        </div>
    );

    const Header = () => (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Dashboard</div>
            <div className="flex items-center">
                <i className="fas fa-bell text-gray-600 mr-4"></i>
                <i className="fas fa-cog text-gray-600 mr-4"></i>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold">A</div>
                    <div className="ml-2">Admin</div>
                </div>
                <Button onClick={logout} colorScheme="red" variant="outline" className='ml-4'>
                        Logout
                </Button>
            </div>
        </div>
    );
    let borrowerscount = 0;
    let moneyDem = 0;
    let moneyDis = 0;
    loans.forEach(loan => {
        moneyDem+=loan.loanAmount
        if(loan.verificationStatus === 'verified'){
            moneyDis+=loan.loanAmount
        }
    })
    users.forEach(user => {
        if (user.role === 0) {
            borrowerscount++;
        }
    });
    const getRole = (role) => {
        if(role === 0){
            return "customer"
        }else if(role === 1){
            return "verifier"
        }else{
            return "admin"
        }
    }
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <StatCard title="ACTIVE USERS" value={users ? users.length: ""} icon="fa-users" />
                        <StatCard title="BORROWERS" value={borrowerscount} icon="fa-user-friends" />
                        <StatCard title="CASH DEMANDED" value={moneyDem} icon="fa-money-bill-wave" />
                        <StatCard title="CASH DISTRIBUTED" value={moneyDis} icon="fa-piggy-bank" />
                        <StatCard title="OTHER ACCOUNTS" value={users.length - borrowerscount} icon="fa-user-circle" />
                        <StatCard title="LOANS" value={loans.length} icon="fa-file-invoice-dollar" />
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xl font-bold">Recent Loans</div>
                            <div className="flex items-center">
                                <i className="fas fa-sort text-gray-600 mr-4"></i>
                                <i className="fas fa-filter text-gray-600"></i>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4 text-left">Customer name</th>
                                    <th className="p-4 text-left">Verifier name</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentLoans.map((loan, index) => (
                                <LoanRow
                                    key={index} 
                                    applicant={loan?.applicant?.name ? loan.applicant.name : "John Doe"}
                                    verifier={loan?.verifier?.user?.name ? loan.verifier.user.name : "John Doe"}
                                    date={loan.updatedAt}
                                    status={loan.verificationStatus}
                                />
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
                    </div>

                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xl font-bold">Users</div>
                            <div className="flex items-center">
                                <i className="fas fa-sort text-gray-600 mr-4"></i>
                                <i className="fas fa-filter text-gray-600"></i>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Role</th>
                                    <th className="p-4 text-left">Make Verifier</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map((user, index) => (
                                <UsersRow
                                    key={index} 
                                    name={user?.name ? user.name : "John Doe"}
                                    email={user?.email ? user.email : "John Doe"}
                                    role={user.role}
                                    user={user}
                                />
                            ))}
                            </tbody>
                        </table>
                        <div className="p-4 flex justify-between items-center">
                        <div>Rows per page: {entriesPerPage}</div>
                        <div>
                            {indexOfFirstEntry1 + 1}-{Math.min(indexOfLastEntry1, users.length)} of {users.length}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="text-gray-500"
                                onClick={handlePreviousPage1}
                                disabled={currentPage1 === 1}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                className="text-gray-500"
                                onClick={handleNextPage1}
                                disabled={currentPage1 === totalPages1}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
