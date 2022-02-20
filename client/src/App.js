import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
import { Container, Row, Col, Button } from "react-bootstrap";
const allVariants = ["primary", "secondary", "success", "info", "danger"];

const colors = {
	primary: "#b58900",
	secondary: "#839496",
	success: "#2aa198",
	info: "#268bd2",
	danger: "#d33682",
};
const App = (props) => {
	const [text, setText] = useState("Hello!");
	const [styles, setStyes] = useState({
		background: "primary",
		text: "secondary",
		textBorder: "info",
		shadow: "success",
	});
	const handleSetStyle = (styleType, value) => {
		const newStyle = styles;
		newStyle[styleType] = value;
		setStyes({ ...newStyle });
	};
	const setTextShadow = (color) => {
		return `1px 1px 1px ${color}, 1px 2px 1px ${color}, 1px 3px 1px ${color},
		1px 4px 1px ${color}, 1px 5px 1px ${color}, 1px 6px 1px ${color},
		1px 7px 1px ${color}, 1px 8px 1px ${color}, 1px 9px 1px ${color}
  `;
	};
	return (
		<Container className="main-container">
			<Row>
				<Col sm={3} className="left-Col">
					<label>Text</label>
					<br />
					<input
						type="text"
						value={text}
						maxLength="10"
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
					<br />
					<br />
					<br />
					<label>Background Style</label>
					<Row>
						{allVariants.map((variant, i) => {
							return (
								<Col key={i}>
									<Button
										variant={variant}
										size="sm"
										className="color-btn"
										onClick={() => {
											handleSetStyle(
												"background",
												variant
											);
										}}
									>
										{styles.background === variant
											? "O"
											: "X"}
									</Button>
								</Col>
							);
						})}
					</Row>
					<br />
					<br />
					<br />
					<label>Text Style</label>
					<Row>
						{allVariants.map((variant, i) => {
							return (
								<Col key={i}>
									<Button
										variant={variant}
										size="sm"
										className="color-btn"
										onClick={() => {
											handleSetStyle("text", variant);
										}}
									>
										{styles.text === variant ? "O" : "X"}
									</Button>
								</Col>
							);
						})}
					</Row>
					<br />
					<br />
					<br />
					<label>Text Border Style</label>
					<Row>
						{allVariants.map((variant, i) => {
							return (
								<Col key={i}>
									<Button
										variant={variant}
										size="sm"
										className="color-btn"
										onClick={() => {
											handleSetStyle(
												"textBorder",
												variant
											);
										}}
									>
										{styles.textBorder === variant
											? "O"
											: "X"}
									</Button>
								</Col>
							);
						})}
					</Row>
					<br />
					<br />
					<br />
					<label>Shadow Style</label>
					<Row>
						{allVariants.map((variant, i) => {
							return (
								<Col key={i}>
									<Button
										variant={variant}
										size="sm"
										className="color-btn"
										onClick={() => {
											handleSetStyle("shadow", variant);
										}}
									>
										{styles.textBorder === variant
											? "O"
											: "X"}
									</Button>
								</Col>
							);
						})}
					</Row>
				</Col>
				<Col sm={8}>
					<div
						className="output-image"
						id="output-image"
						style={{
							width: "fit-content",
							backgroundColor: colors[styles.background],
						}}
					>
						<span
							className="output-text"
							style={{
								color: colors[styles.text],

								// "-webkit-text-stroke"
								WebkitTextStroke: `3px ${
									colors[styles.textBorder]
								}`,

								// "text-shadow"
								textShadow: setTextShadow(
									colors[styles.shadow]
								),
							}}
						>
							{text}
						</span>
					</div>
					<hr />
					<Button
						onClick={() => {
							var node = document.getElementById("output-image");

							htmlToImage
								.toPng(node)
								.then(function (dataUrl) {
									download(dataUrl, "Cool-Image.png");
								})
								.catch(function (error) {
									console.error(
										"oops, something went wrong!",
										error
									);
								});
						}}
					>
						Download as PNG
					</Button>
					&nbsp;
					<Button
						onClick={() => {
							function filter(node) {
								return node.tagName !== "i";
							}

							htmlToImage
								.toSvg(
									document.getElementById("output-image"),
									{ filter: filter }
								)
								.then(function (dataUrl) {
									download(dataUrl, "Cool-Image.svg");
								})
								.catch(function (error) {
									console.error(
										"oops, something went wrong!",
										error
									);
								});
						}}
					>
						Download As SVG
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default App;
