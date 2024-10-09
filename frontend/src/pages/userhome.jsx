import React, { useContext, useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormControl,
    FormLabel,
    useDisclosure,
    Checkbox,
    Select,
} from "@chakra-ui/react";  
import "./userHome.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AppContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
    const navigate=useNavigate();
    const { user, setUser } = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanReason, setLoanReason] = useState("");
    const [loanTenure, setLoanTenure] = useState("");
    const [empStatus, setEmpStatus] = useState("");
    const [empAddress, setEmpAddress] = useState("");
    const [consentClause1, setConsentClause1] = useState(false);
    const [consentClause2, setConsentClause2] = useState(false);
    const [loan, setLoan]=useState({});
    const [loans, setLoans]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 7; 
    const [searchTerm, setSearchTerm]=useState("");
    const [filteredLoans, setFilteredLoans] = useState([]);

    useEffect(()=>{
        if(user === null){
          navigate('/login');
        }
        const fetchLoans = async () => {
            try {
                const response = await axios.get("https://credit-app-backend.onrender.com/api/v1/getLoans", {
                  withCredentials: true, // Include credentials in the request
              });
                setLoans(response.data.loans);
            } catch (error) {
                Swal.fire({
                    icon:'error',
                    title:"Error fetching loans",
                    text:error?.response?.data?.message || "Unexpected error occured"
                })
            }
        };

        fetchLoans();
    }, [loan, user, navigate])

    useEffect(() => {
        const fetchFilteredLoans = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(`https://credit-app-backend.onrender.com/api/v1/searchLoans?query=${searchTerm}`);
                    setFilteredLoans(response.data.loans);
                } catch (error) {
                }
            } else {
                setFilteredLoans(loans);
            }
        };

        fetchFilteredLoans();
    }, [searchTerm, loans, navigate, user]);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentLoans = filteredLoans.slice(indexOfFirstEntry, indexOfLastEntry);
  
    const totalPages = Math.ceil(loans.length / entriesPerPage);
    
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
  
    const handleFormSubmit = async (e) => {
        
        e.preventDefault();

        try {
            const formData = {name, loanAmount, loanReason, loanTenure, empStatus, empAddress, consentClause1, consentClause2};
            const response = await axios.post("https://credit-app-backend.onrender.com/api/v1/applyLoan", formData);
            setLoan(response.data.loan);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Loan Application failed',
                text: error.response?.data?.message || 'An unexpected error occurred'
            })
        } finally{
        }
        onClose();
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
    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        try {
            await axios.post("https://credit-app-backend.onrender.com/api/v1/logout", {}, {withCredentials: true});
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error logging out',
            text: error.response?.data?.message || 'An unexpected error occurred'
        })
        }
        navigate("/login"); 
    };    
    return (
        <div>
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-xl font-bold text-green-700">CREDIT APP</div>
                <nav className="flex space-x-6 items-center">
                    <a href='/nothing' className="text-green-700 flex items-center"><i className="fas fa-home mr-2"></i>Home</a>
                    <a href='/nothing' className="text-gray-600 flex items-center"><i className="fas fa-money-check-alt mr-2"></i>Payments</a>
                    <a href='/nothing' className="text-gray-600 flex items-center"><i className="fas fa-wallet mr-2"></i>Budget</a>
                    <a href='/nothing' className="text-gray-600 flex items-center"><i className="fas fa-credit-card mr-2"></i>Card</a>
                    <a href='/nothing' className="text-gray-600 flex items-center"><i className="fas fa-bell mr-2"></i></a>
                    <a href="/login" className="text-gray-600 flex items-center"><i className="fas fa-user mr-2"></i>{user ? user.name: "User"}</a>
                    <Button onClick={logout} colorScheme="red" variant="outline">
                        Logout
                    </Button>
                </nav>
            </header>
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent
    bg="white"
    p={50} 
    borderRadius="md"
    boxShadow="xl"
    maxW="lg"
    mx="auto"
  >
    <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
      Apply for a Loan
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form onSubmit={handleFormSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel fontWeight="bold">Full Name (as it appears on Bank account)</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel fontWeight="bold">Loan Amount</FormLabel>
          <Input
            type="number"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel fontWeight="bold">Reason for Loan</FormLabel>
          <Input
            type="text"
            placeholder="Enter loan reason"
            value={loanReason}
            onChange={(e) => setLoanReason(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel fontWeight="bold">Loan Tenure</FormLabel>
          <Input
            type="number"
            placeholder="Enter loan tenure in months"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
        <FormLabel fontWeight="bold">Employment Status</FormLabel>
        <Select
            placeholder="Select your employment status"
            value={empStatus}
            onChange={(e) => setEmpStatus(e.target.value)}
        >
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
        </Select>
        </FormControl>


        <FormControl isRequired mb={4}>
          <FormLabel fontWeight="bold">Employer Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter your employer's address"
            value={empAddress}
            onChange={(e) => setEmpAddress(e.target.value)}
          />
        </FormControl>

        {/* Consent Clauses */}
        <FormControl display="flex" alignItems="center" mb={4}>
          <Checkbox
            isChecked={consentClause1}
            onChange={(e) => setConsentClause1(e.target.checked)}
          >
            I have read the important information and accept that by completing the application. I will be bound by the terms
          </Checkbox>
        </FormControl>

        <FormControl display="flex" alignItems="center" mb={4}>
          <Checkbox
            isChecked={consentClause2}
            onChange={(e) => setConsentClause2(e.target.checked)}
          >
            Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies
          </Checkbox>
        </FormControl>
      </form>
    </ModalBody>

    <ModalFooter justifyContent="space-between">
      <Button colorScheme="green" onClick={handleFormSubmit}>
        Submit
      </Button>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
            <main className="p-6">
                <div className="bg-white p-6 rounded shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-4 rounded mr-4">
                                <i className="fas fa-money-bill-wave text-green-700 text-2xl"></i>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">DEFICIT</div>
                                <div className="text-2xl text-green-700">₦ 0.0</div>
                            </div>
                        </div>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={onOpen}>
                            Get A Loan
                        </button>                    
                    </div>
                    <div className="flex space-x-4 mb-6">
                        <button className="bg-green-700 text-white px-4 py-2 rounded">Borrow Cash</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Transact</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Deposit Cash</button>
                    </div>
                    <div className="mb-6">
                        <input type="text" placeholder="Search for loans" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className="w-full p-3 border rounded"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4">Applied Loans</h2>
                        <div className="bg-white shadow rounded">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-4 text-left">Loan Officer</th>
                                        <th className="p-4 text-left">Amount</th>
                                        <th className="p-4 text-left">Date Applied</th>
                                        <th className="p-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLoans.map((loan, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-4 flex items-center">
                                                <img src="https://placehold.co/40x40" className="rounded-full mr-4" alt=""/>
                                                <div>
                                                    <div className="font-medium">{loan?.verifier?.user?.name ? loan.verifier.user.name : ""}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">{loan.loanAmount ? loan.loanAmount : ""}</td>
                                            <td className="p-4">{loan.updatedAt ? loan.updatedAt : ""}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-white ${getStatusColor(loan.verificationStatus)}`}>{loan.verificationStatus? loan.verificationStatus: ""}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
            <div className="p-4 flex justify-between items-center">
              <div>
                Rows per page: {entriesPerPage}
              </div>
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
                </div>
            </main>
        </div>
    );
};

export default UserHome;