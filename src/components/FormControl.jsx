import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "./../actions/action";
class FormControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            complete: false,
            search: "",
            timeadd: "",
            timedeadline: "",
            datedeadline: "",
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps.editTask.name);
        this.setState({
            id: nextProps.editTask.id,
            name: nextProps.editTask.name,
            timedeadline: nextProps.editTask.timedeadline,
            datedeadline: nextProps.editTask.datedeadline,
        });
    }

    onAddTask = async (event) => {
        let date = new Date();
        let fulldateString = `${date
            .getHours()
            .toString()}:${date
            .getMinutes()
            .toString()} - ${date.getDate().toString()}/ ${(
            date.getMonth() + 1
        ).toString()}/ ${date.getFullYear().toString()}`;
        // console.log(fulldateString);

        let target = event.target;
        let name = target.name;
        let value =
            target.type === "datedeadline"
                ? target.value.format("DD-MMM-YYYY")
                : target.value;
        await this.setState({
            [name]: value,
            timeadd: fulldateString,
        });
        // console.log(this.state);
    };

    onClear = () => {
        this.setState({
            name: "",
            complete: false,
            timedeadline: "",
            datedeadline: "",
        });
    };

    onSubmitHandle = async (event) => {
        event.preventDefault();
        await this.props.onSaveTask(this.state);
        this.setState({
            id: "",
            name: "",
            complete: false,
            search: "",
            timeadd: "",
            timedeadline: "",
            datedeadline: "",
        });
        this.onClear();
    };

    render() {
        let date = new Date();
        let dateNow;
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();

        // validate date
        if(day < 10 && month > 10){
            dateNow = `${year}-${month}-${"0"+day}`;
        }else if(day > 10 && month < 10 ){
            dateNow = `${year}-${"0"+month}-${day}`;
        }else if(day < 10 && month < 10){
            dateNow = `${year}-${0+month}-${"0"+day}`;
        }
        else{
            dateNow = `${year}-${day}-${month}`;
        }
        // console.log(dateNow);

        let {id} = this.state;
        return (
            <form className="form-group" onSubmit={this.onSubmitHandle}>
                {/* content */}
                <label htmlFor="name" className="badge badge-primary">
                    Add Todo
                </label>
                <textarea
                    className="form-control add-todo rounded mb-10"
                    name="name"
                    value={this.state.name}
                    placeholder="📝 Add todo"
                    onChange={this.onAddTask}
                    rows="3"
                />
                {/* deadline */}
                <label htmlFor="date" className="badge badge-warning">
                    Deadline
                </label>
                <input
                    type="date"
                    name="datedeadline"
                    min={dateNow}
                    value={this.state.datedeadline}
                    className="form-control add-todo rounded mb-10"
                    onChange={this.onAddTask}
                />
                <input
                    type="time"
                    name="timedeadline"
                    value={this.state.timedeadline}
                    className="form-control add-todo rounded mb-10"
                    onChange={this.onAddTask}
                />

                {/* button */}
                <button
                    type="submit"
                    className="btn btn-primary mt-10 ml-10"
                    onClick={this.onAddTask}
                >
                    {id ? "Update" : "Add"}
                </button>
            </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        editTask: state.editTask,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(Action.addTodoItems(task));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormControl);
