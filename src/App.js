import { Component } from "react";
import Modal from "./components/Modal/Modal";
import ResultModal from "./components/ResultModal/ResultModal";
import "./App.css";

class App extends Component {
  state = {
    isFormModalOpen: false,
    isResultModalOpen: false,
    resultMessage: "",
  };

  openFormModal = (event) => {
    event.preventDefault();
    this.setState({ isFormModalOpen: true });
  };

  closeFormModal = (event) => {
    if (event) event.preventDefault();
    this.setState({ isFormModalOpen: false });
  };

  openResultModal = (message) => {
    this.setState({
      isFormModalOpen: false,
      isResultModalOpen: true,
      resultMessage: message,
    });
  };

  closeResultModal = (event) => {
    if (event) event.preventDefault();
    this.setState({ isResultModalOpen: false });
  };

  render() {
    return (
      <div className="app-container">
        <h2 className="portal-label">⬇️ Портал в Роблокс ⬇️</h2>
        <button className="open-btn" onClick={this.openFormModal}>
          Відкрити портал
        </button>

        {this.state.isFormModalOpen && (
          <Modal
            onClose={this.closeFormModal}
            onSubmit={this.openResultModal}
          />
        )}

        {this.state.isResultModalOpen && (
          <ResultModal
            message={this.state.resultMessage}
            onClose={this.closeResultModal}
          />
        )}
      </div>
    );
  }
}

export default App;
