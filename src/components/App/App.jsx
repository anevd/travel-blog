import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HelloPage from "../HelloPage/HelloPage";
import CollapseList from "../CollapseList/CollapseList";
import Journey from "../Journey/Journey";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HelloPage />} />
				<Route path="/video" element={<CollapseList />} />
				<Route path="/journey" element={<Journey />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
