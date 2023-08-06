const countries = [
	{
		id: 1,
		country: "Spain",
		capital: "Madrid",
		attractions: [
			{
				name: "Temple Expiatori de la Sagrada Familia",
				location: "Barcelona",
				photo: "https://avatars.mds.yandex.net/get-altay/1871297/2a0000016fda8c005c30753a27f0b819536d/XXL",
			},
			{
				name: "Barrio Gotico",
				location: "Barcelona",
				photo: "https://cdn.vedomosti.ru/image/2018/4y/zarjj/mobile_high-19qx.jpg",
			},
			{
				name: "Palacio Real de Madrid",
				location: "Madrid",
				photo: "https://avatars.dzeninfra.ru/get-zen_doc/8866523/pub_6474e5bcef0e395ba3069714_6474e720ef0e395ba3098015/scale_1200",
			},
		],
		hotels: [
			{
				name: "Ilunion Pio XII",
				location: "Avenida de Pio XII, 77, Chamartin, 28016 Madrid, Spain",
				photo: "https://i.travelapi.com/hotels/1000000/800000/796700/796680/dd4b04fd_z.jpg",
				rating: 5,
				website: "https://en.ilunionpioxii.com",
			},
			{
				name: "Vértice Roomspace",
				location: "Laguna Dalga, 4, Villaverde, 28021 Madrid, Spain",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/90099752.jpg?k=49958a8136f4d9b0606ea0da8eeaa633bc3d1c36d52cdfc5ec811350a086b09d&o=&hp=1",
				rating: 4,
				website: "https://www.verticehoteles.com/en/vertice-roomspace-madrid/",
			},
			{
				name: "Archie Living",
				location: "3 Avinguda de Vilanova, Eixample, 08018 Barcelona, Spain",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/409393990.jpg?k=51b5577d7a60fb68bd774e6a3fb5a36274948b2f2ca70235f7a5c13e202933d0&o=&hp=1",
				rating: 4.5,
				website: "https://archieliving.com",
			},
		],
		restaurants: [
			{
				name: "JUNGLEKING - Food Monarchy",
				location: "C. del Marqués Viudo de Pontejos, 15, 28012 Madrid Spain",
				photo: "https://media-cdn.tripadvisor.com/media/photo-w/29/99/9c/d2/vista-de-afuera.jpg",
				priceRange: "RUB 1,023 - RUB 3,070",
				cuisines: "American, International, Cafe, European, Portuguese",
			},
			{
				name: "Los Montes de Galicia",
				location: "Calle Azcona 46, 28028 Madrid Spain",
				photo: "https://foodyt.com/media/uploads/montes-galicia-home-final-banner.jpg",
				priceRange: "RUB 5,117 - RUB 8,187",
				cuisines: "Spanish, International, Mediterranean, Healthy",
			},
			{
				name: "La Gastronomica Burgers",
				location: "Carrer Vilamari 9-15, 08015 Barcelona Spain",
				photo: "https://www.mundodeportivo.com/files/gallery_slide/uploads/2022/05/23/628b6e3eca994.jpeg",
				priceRange: "RUB 1,228 - RUB 1,535",
				cuisines: "Street Food",
			},
		],
	},
	{
		id: 2,
		country: "The Netherlands",
		capital: "Amsterdam",
		attractions: [
			{
				name: "Jordaan and Amsterdam's Canals",
				location: "Amsterdam",
				photo: "https://www.planetware.com/wpimages/2021/12/netherlands-top-rated-attractions-jordaan-amsterdams-canals.jpg",
			},
			{
				name: "Keukenhof",
				location: "Lisse",
				photo: "https://flowwill.ru/wp-content/uploads/b/c/a/bcac2980ef6a7a11424699d0288ff66e.jpeg",
			},
			{
				name: "Rijksmuseum",
				location: "Amsterdam",
				photo: "https://traveltimes.ru/wp-content/uploads/2021/07/o.83861.jpg",
			},
		],
		hotels: [
			{
				name: "Ruby Emma Hotel Amsterdam",
				location: "Amstelvlietstraat 4, Oost, 1096 GG Amsterdam, Netherlands",
				photo: "https://avatars.mds.yandex.net/i?id=1295fd339e012696c3e159c58f1dc34451d4e63e-5227334-images-thumbs&n=13",
				rating: 4.5,
				website: "https://www.ruby-hotels.com/en/hotels-destinations/amsterdam/ruby-emma",
			},
			{
				name: "Motel One Amsterdam",
				location: "Europaboulevard 23, Zuideramstel, 1079 PC Amsterdam, Netherlands",
				photo: "https://www.motel-one.com/fileadmin/dam/Hotels/Amsterdam/Amsterdam-Waterloo/Innenbereich/020-double-room-king-size-bed.jpg",
				rating: 4,
				website: "https://www.motel-one.com/en/hotels/amsterdam/",
			},
			{
				name: "Hotel Estheréa",
				location: "Singel 303 - 309, Amsterdam City Centre, 1012 WJ Amsterdam, Netherlands",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/192222259.jpg?k=4d3ed9efeb66a9bdc5c4b691058f5230d9716094150407484ce1ec76d96c4b7b&o=&hp=1",
				rating: 5,
				website: "https://www.estherea.nl",
			},
		],
		restaurants: [
			{
				name: "Restaurant Bougainville",
				location: "Dam 27 In Hotel TwentySeven, 1012 JS Amsterdam The Netherlands",
				photo: "https://www.thestaffcanteen.com/public/js/tinymce/plugins/moxiemanager/data/files/Bougainville%20Amsterdam.jpg",
				priceRange: "RUB 10,131 - RUB 12,178",
				cuisines: "International, European",
			},
			{
				name: "Graham's Kitchen",
				location: "Hemonystraat 38, 1074 BS Amsterdam The Netherlands",
				photo: "https://media-cdn.tripadvisor.com/media/photo-w/14/55/93/ec/chefs-table.jpg",
				priceRange: "RUB 4,196 - RUB 7,675",
				cuisines: "European, Contemporary",
			},
			{
				name: "Guru Restaurant",
				location: "Rijnstraat 157, 1079 HD Amsterdam The Netherlands",
				photo: "https://media-cdn.tripadvisor.com/media/photo-s/24/ca/8d/6d/a-look-inside-our-restaurant.jpg",
				priceRange: "RUB 1,493 - RUB 2,986",
				cuisines: "Indian, Asian, Grill, Diner, Street Food",
			},
		],
	},
	{
		id: 3,
		country: "France",
		capital: "Paris",
		attractions: [
			{
				name: "Eiffel Tower",
				location: "Paris",
				photo: "https://pxwall.com/wp-content/uploads/2022/05/Eiffel-Tower.jpg",
			},
			{
				name: "Musée du Louvre",
				location: "Paris",
				photo: "https://i.pinimg.com/originals/97/84/82/9784827b4b4d3d8f4793fc0329f52b43.jpg",
			},
			{
				name: "Château de Versailles",
				location: "Versailles",
				photo: "https://www.remontez.ru/web/upload/images/5140/200415500865_61088.jpg",
			},
		],
		hotels: [
			{
				name: "Hôtel de Roubaix",
				location: "6, rue Greneta, 3rd arr., 75003 Paris, France",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232883336.jpg?k=518bb4347913f15e7b8a4a0ac0691f49b178952710434a5cde999738c4ad4873&o=&hp=1",
				rating: 5,
				website: "https://hdroubaix.fr",
			},
			{
				name: "Victoria Palace Hotel",
				location: "6 Rue Blaise Desgoffe, 6th arr., 75006 Paris, France",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/296167631.jpg?k=9fe31f2d23bccdad9eda6838cf4a2c1e9ceb467b68e8281402cebac453e8b168&o=&hp=1",
				rating: 4.5,
				website: "https://www.victoriapalace.com",
			},
			{
				name: "Select Hotel",
				location: "1 Place De La Sorbonne, 5th arr., 75005 Paris, France",
				photo: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/78264832.jpg?k=d962fa20d69bca5d6348ae42a004b2e6b8e46361b4a172efb2407405ea1b5542&o=&hp=1",
				rating: 5,
				website: "https://www.selecthotel.fr",
			},
		],
		restaurants: [
			{
				name: "Bistrot Instinct",
				location: "19 rue de Picardie, 75003 Paris France",
				photo: "https://media-cdn.tripadvisor.com/media/photo-s/19/1b/97/46/bistrot-instinct.jpg",
				priceRange: "RUB 3,582 - RUB 6,447",
				cuisines: "French, European, Healthy",
			},
			{
				name: "Perlimpinpin",
				location: "121 rue de Rome, 75017 Paris France",
				photo: "https://media-cdn.tripadvisor.com/media/photo-w/27/7e/d1/ea/caption.jpg",
				priceRange: "RUB 1,535 - RUB 2,763",
				cuisines: "French, Contemporary, Wine Bar",
			},
			{
				name: "Les Apotres de Pigalle",
				location: "2 rue Germain Pilon, 75018 Paris France",
				photo: "https://secretparisien.com/wp-content/uploads/2017/08/Les-Apotres-de-Pigalle.jpg",
				priceRange: "RUB 512 - RUB 2,558",
				cuisines: "South American, Brew Pub, European",
			},
		],
	},
];

export default countries;
