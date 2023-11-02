//подключение (импорты) библиотек
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");

//импорты роутов
const dogRouter = require("./routes/dog");
const aboutRouter = require("./routes/about");
const carouselRouter = require("./routes/carousel");
const collapseRouter = require("./routes/collapseItems");
const countriesRouter = require("./routes/countries");
const pointsRouter = require("./routes/points");
const cuisinesRouter = require("./routes/cuisines");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "4000";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//urls
app.use("/dog", dogRouter);
app.use("/about", aboutRouter);
app.use("/carousel", carouselRouter);
app.use("/collapseItems", collapseRouter);
app.use("/countries", countriesRouter);
app.use("/points", pointsRouter);
app.use("/cuisines", cuisinesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

server.listen(port, () => {
	console.log("Server has been started on port", port);
});
