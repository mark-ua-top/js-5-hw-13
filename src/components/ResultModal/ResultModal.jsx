import { Component } from "react";
import "../../App.css";

class ResultModal extends Component {
    state = { show: true, timer: 5 };
    interval = null;

    componentDidMount() {
        window.addEventListener("keydown", this.handleEscape);
        this.startTimer();
    }

    componentDidUpdate() {
        console.log("Оновленно");
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleEscape);
        clearInterval(this.interval);
    }

    handleEscape = (event) => {
        if (event.key === "Escape") {
            this.closeModal();
        }
    };

    startTimer = () => {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.setState((prev) => {
                if (prev.timer <= 1) {
                    clearInterval(this.interval);
                    this.closeModal();
                    return { timer: 0 };
                }
                return { timer: prev.timer - 1 };
            });
        }, 1000);
    };

    closeModal = () => {
        this.setState({ show: false });
        setTimeout(() => this.props.onClose(), 300);
    };

    render() {
        if (!this.state.show) return null;
        return (
            <div className={`modal-backdrop ${this.state.show ? "show" : ""}`}>
                <div className={`result-modal-window ${this.state.show ? "show" : ""}`}>
                    <button className="close-btn" onClick={this.closeModal}>❌</button>
                    <h2>{this.props.message}</h2>
                    <div className="timer">Закриття через {this.state.timer} секунд</div>
                </div>
            </div>
        );
    }
}

export default ResultModal;
