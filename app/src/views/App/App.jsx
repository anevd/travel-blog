import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HelloPage from "../HelloPage/HelloPage";
import CollapseList from "../CollapseList/CollapseList";
import VideoAdding from "../VideoAdding/VideoAdding";
import Journey from "../Journey/Journey";
import TravelMap from "../TravelMap/TravelMap";
import CardInfo from "../CardInfo/CardInfo";
import { Provider } from "react-redux";
import store from "../../store/store";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Provider store={store}>
				<Header />
				<Routes>
					<Route path="/" element={<HelloPage />} />
					<Route path="/video" element={<CollapseList />} />
					<Route path="/add-video" element={<VideoAdding />} />
					<Route path="/journey" element={<Journey />} />
					<Route path="/map" element={<TravelMap />} />
					<Route path="/journey/:country/:type/:id" element={<CardInfo />} />
				</Routes>
				<Footer />
			</Provider>
		</>
	);
}

export default App;
