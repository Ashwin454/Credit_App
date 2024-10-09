import AppliedLoans from "./AppliedLoans";
import DashboardCard from "./DashboardCard";

function Dashboard({user, loans}) {
    const uniqueApplicants = new Set();
    let sum = 0;
    let sum1 = 0;
    loans.forEach(loan => {
        sum1 += loan.loanAmount;
        if (loan.applicant.name) {
          uniqueApplicants.add(loan.applicant.name);
        }
        if(loan.verificationStatus === 'verified'){
            sum += loan.loanAmount;
        }
      });
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mb-6">
                <DashboardCard icon="fas fa-file-alt" label="LOANS" value={loans ? loans.length : ""} />
                <DashboardCard icon="fas fa-users" label="BORROWERS" value={uniqueApplicants? uniqueApplicants.size: ""} />
                <DashboardCard icon="fas fa-money-bill-wave" label="CASH DISTRIBUTED" value={sum} />
                <DashboardCard icon="fas fa-money-bill-wave" label="CASH DEMANDED" value={sum1} />
            </div>
            <AppliedLoans user={user}/>
        </div>
    );
}

export default Dashboard