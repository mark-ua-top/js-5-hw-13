import { Component } from "react";
import "../../App.css";

class Modal extends Component {
    state = {
        firstName: "",
        lastName: "",
        birthDate: "",
        timer: 30,
        show: true,
    };

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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, timer: 30 });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const birthYear = Number(this.state.birthDate.split("-")[0]);
        const age = new Date().getFullYear() - birthYear;

        if (age > 18) {
            this.props.onSubmit("Ви старі для Роблокс");
        } else {
            this.props.onSubmit("Ви попали в портал Роблокс");
        }
    };

    startTimer = () => {
        clearInterval(this.interval);
        this.setState({ timer: 30 });
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
        return (
            <div className={`modal-backdrop ${this.state.show ? "show" : ""}`}>
                <div className={`modal-window ${this.state.show ? "show" : ""}`}>
                    <button className="close-btn" onClick={this.closeModal}>❌</button>
                    <h2>Введіть дані</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="Імʼя"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            name="lastName"
                            type="text"
                            placeholder="Прізвище"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            required
                        />
                        <label>Дата народження:</label>
                        <input
                            name="birthDate"
                            type="date"
                            value={this.state.birthDate}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="submit-btn">Увійти</button>
                    </form>
                    <div className="timer">Автоматичне закриття через {this.state.timer} секунд</div>
                </div>
            </div>
        );
    }
}

export default Modal;
