import Dashboard from "./Dashboard";
import Header from "./header";

function VerifierContent({user, setUser, loans}) {
    return (
        <div className="flex-1 p-6">
            <Header user={user} setUser={setUser}/>
            <Dashboard user={user} loans={loans}/>
        </div>
    );
}

export default VerifierContent;