import React, { Component } from "react";
import { connect } from "react-redux";

import { getAnimals } from "./redux/actions/data";
import {
	toggleModal,
	toggleSpinner,
	setModalData
} from "./redux/actions/modal";

import Gallery from "./components/Gallery/";
import Modal from "./components/Modal/";
import Navigation from "./components/Navigation/";

import "./App.scss";
class App extends Component {
	constructor() {
		super();

		this.openModal = this.openModal.bind(this);
	}

	componentWillMount() {
		this.props.getAnimals();
	}

	openModal(data) {
		const { setModalData, toggleModal } = this.props;

		setModalData(data);
		toggleModal();
	}

	render() {
		const {
			openModal,
			props: {
				list,
				tableType,
				modalData,
				modalIsOpen,
				toggleModal,
				showSpinner
			}
		} = this;

		return (
			<div className="app">
				<Navigation />

				<div className="header-wrapper">
					<h1>{tableType}</h1>
				</div>
				<Gallery
					list={list}
					type={tableType}
					imageOnClick={openModal}
				/>

				{modalData && (
					<Modal
						isOpen={modalIsOpen}
						closeOnClick={toggleModal}
						hasCloseButton={true}
					>
						<div className="modal-header">
							<h1>{modalData.Title}</h1>
						</div>
						<div className="modal-content">
							<div className="data-wrapper">
								<div>
									<h2>Description</h2>
									<p>{modalData.Description}</p>
								</div>
								<div>
									<h2>Family</h2>
									<span>{modalData.Family}</span>
								</div>
								{tableType === "Animals" ? (
									<div>
										<h2>Collective Noun</h2>
										<span>{modalData.CollectiveNoun}</span>
									</div>
								) : (
									<div>
										<h2>Genus</h2>
										<span>{modalData.Genus}</span>
									</div>
								)}
							</div>
							<div className="image-wrapper">
								<img
									alt={modalData.Title}
									src={
										modalData.ImageURLs &&
										modalData.ImageURLs.FullSize
									}
									title={modalData.Title}
								/>
							</div>
						</div>
					</Modal>
				)}

				<Modal isOpen={showSpinner} className="spinner-modal">
					<div className="modal-content">
						<i className="fas fa-spinner spinner" />
						<span className="loading-text">L O A D I N G</span>
					</div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = ({ data, modal }) => ({
	list: data.list,
	tableType: data.tableType,
	modalData: modal.modalData,
	modalIsOpen: modal.isOpen,
	showSpinner: modal.showSpinner
});

const mapDispatchToProps = {
	getAnimals,
	toggleModal,
	toggleSpinner,
	setModalData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
