function Sidebar({user}) {
    return (
        <div className="bg-green-900 text-white w-64 min-h-screen p-4">
            <div className="flex items-center mb-6">
                <img src="https://placehold.co/40x40" alt="User profile" className="rounded-full mr-3" />
                <div>
                    <h2 className="text-lg font-bold">{user.name}</h2>
                </div>
            </div>
            <nav>
                <ul>
                    <li className="mb-4"><i className="fas fa-tachometer-alt mr-2"></i> Dashboard</li>
                    <li className="mb-4"><i className="fas fa-users mr-2"></i> Borrowers</li>
                    <li className="mb-4"><i className="fas fa-money-check-alt mr-2"></i> Loans</li>
                    <li className="mb-4"><i className="fas fa-undo-alt mr-2"></i> Repayments</li>
                    <li className="mb-4"><i className="fas fa-cogs mr-2"></i> Loan Parameters</li>
                    <li className="mb-4"><i className="fas fa-book mr-2"></i> Accounting</li>
                    <li className="mb-4"><i className="fas fa-chart-line mr-2"></i> Reports</li>
                    <li className="mb-4"><i className="fas fa-shield-alt mr-2"></i> Collateral</li>
                    <li className="mb-4"><i className="fas fa-lock mr-2"></i> Access Configuration</li>
                    <li className="mb-4"><i className="fas fa-piggy-bank mr-2"></i> Savings</li>
                    <li className="mb-4"><i className="fas fa-file-invoice-dollar mr-2"></i> Expenses</li>
                    <li className="mb-4"><i className="fas fa-file-signature mr-2"></i> E-signature</li>
                    <li className="mb-4"><i className="fas fa-user-tie mr-2"></i> Investor Accounts</li>
                    <li className="mb-4"><i className="fas fa-calendar-alt mr-2"></i> Calendar</li>
                    <li className="mb-4"><i className="fas fa-cog mr-2"></i> Settings</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;