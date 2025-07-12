import UserTrendChart from "../components/AdminStats/UserTrendChart.jsx";
import StatsOverview from "../components/AdminStats/StatsOverview.jsx";
import TopEmployeesByBussines from "../components/AdminStats/TopEmployeesByBussines.jsx";
import TopRatedBusiness from "../components/AdminStats/TopRatedBusiness.jsx";
import ButtonBack from "../../../components/buttons/ButtonBack.jsx";
import { Link } from "react-router-dom";


const StatsAdmin = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Estadísticas</h1>
                <Link to="/admin" className="text-blue-500 hover:text-blue-700 font-bold">
                    <ButtonBack/>
                </Link>
            </div>
            <StatsOverview />
            <UserTrendChart/>
            <TopEmployeesByBussines/>
            <TopRatedBusiness/>
        </div>
    )
}

export default StatsAdmin;