function DashboardCard({ icon, label, value }) {
    return (
        <div className="bg-white p-4 rounded shadow flex items-center">
            <i className={`${icon} text-3xl text-green-900 mr-4`}></i>
            <div>
                <h2 className="text-xl font-bold">{value}</h2>
                <p>{label}</p>
            </div>
        </div>
    );
}

export default DashboardCard;