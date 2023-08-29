import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HelloPage from "../HelloPage/HelloPage";
import CollapseList from "../CollapseList/CollapseList";
import Journey from "../Journey/Journey";
import TravelMap from "../TravelMap/TravelMap";
import CardInfo from "../CardInfo/CardInfo";
import Dog from "../../components/Dog/Dog";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HelloPage />} />
				<Route path="/video" element={<CollapseList />} />
				<Route path="/journey" element={<Journey />} />
				<Route path="/map" element={<TravelMap />} />
				<Route path="/journey/:country/:type/:id" element={<CardInfo />} />
				<Dog />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
