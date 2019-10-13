import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import sv from 'date-fns/locale/sv';
import moment from 'moment';
import 'moment/min/locales';
//import momentSwedish from 'moment/src/locale/sv';
registerLocale('sv', sv);
moment.locale('sv');

const vehiclesAvailable = [
    "Car",
    "Motorbike",
    "Tractor",
    "Emergency",
    "Diplomat",
    "Military",
    "Foreign"
];

export class FetchTollFeeData extends Component {
    static displayName = FetchTollFeeData.name;

    constructor(props) {
        super(props);
        this.state = {
            vehicleSelected: "Car",
            isVehicleDecided: false,
            tollPassDates: [],
            selectedTollPassDate: new Date(),
            selectedTollPassTime: new Date(),
            tollFeeCost: ""
        };
        this.formattedselectedTollPassDate = moment(new Date()).format("YYYY-MM-DD");

    }

    componentDidMount() {
    }

    handleDatePickerChange = (date) => {
        this.setState({
            selectedTollPassDate: date
        });
        this.formattedselectedTollPassDate = moment(date).format("YYYY-MM-DD");
    };
    handleTimePickerChange = (date) => {
        this.setState({
            selectedTollPassTime: date
        });
    };

    changeOfVehicle = (vehicle) => {
        this.setState({
            vehicleSelected: vehicle
        });
    }

    confirmVehicle = () => {
        this.setState({ isVehicleDecided: true });
    }

    showTollFee = (data) => {
        this.setState({ tollFeeCost: data })
    }

    clearTollDates = () => {
        this.setState({ tollPassDates: [], tollFeeCost: undefined })
    }

    goBack = () => {
        this.clearTollDates();
        this.setState({
            vehicleSelected: "Car",
            isVehicleDecided: false
        });
    }


    tollPassesTable = (tollPassDates) => {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Vehicle</th>
                    </tr>
                </thead>
                <tbody>
                    {tollPassDates.map((tollPass, index) =>
                        <tr key={tollPass + "_" + index}>
                            <td>{tollPass}</td>
                            <td>{this.state.vehicleSelected}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    addTollPass = () => {
        console.log(moment.locale());
        const formattedSelectedTollPassTime = moment(this.state.selectedTollPassTime).format('LT');
        const formattedTollPassDateAndTime = this.formattedselectedTollPassDate + " " + formattedSelectedTollPassTime;

        this.setState({
            tollPassDates: [...this.state.tollPassDates, formattedTollPassDateAndTime]
        })
    }

    tollPassForm = () => {
        return (
            <Form>
                <FormGroup>
                    <Label className="mt-3 d-block" for="timepicker">Pick a time</Label>
                    <DatePicker
                        id="timepicker"
                        className="form-control"
                        selected={this.state.selectedTollPassTime}
                        onChange={this.handleTimePickerChange}
                        showTimeSelect
                        showTimeSelectOnly
                        dateFormat="HH:mm"
                        timeIntervals={5}
                        timeCaption="Time"
                        locale='sv'
                    >

                    </DatePicker>
                </FormGroup>
            </Form>
        );
    }

    choiceOfVehicleAndDate = () => {

        return (
            <Form>
                <FormGroup className="form-group">
                    <Label for="exampleSelect">Choose your amazing vehicle</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={(evt) => { this.changeOfVehicle(evt.target.value); }}>
                        {vehiclesAvailable.map((vehicle) => {
                            return (<option key={vehicle}>{vehicle}</option>)
                        })}
                    </Input>
                    <Label className="mt-3 d-block" for="datepicker">Choose date</Label>
                    <DatePicker
                        id="datepicker"
                        className="form-control"
                        selected={this.state.selectedTollPassDate}
                        onChange={this.handleDatePickerChange}
                        dateFormat="dd-MM-yyyy"
                        locale='sv'
                    >
                    </DatePicker>
                    <div className="text-center mt-5">
                        <button className="btn btn-primary btn-block" onClick={() => this.confirmVehicle()}>Continue</button>
                    </div>
                </FormGroup>
            </Form>
        );
    }

    feeCosts = () => {
        
        const { tollFeeCost } = this.state;
        if (!tollFeeCost) {
            return undefined;
        }
        return tollFeeCost === 0 ? "No Charge! :D" :
            <div className="my-3">
                <strong>Your amazing fee: {this.state.tollFeeCost} kr</strong>
            </div>
    }

    tollPassCalculationContent = () => {

        return (
            <Row>
                <Col md="12 text-left">
                    <button className="btn btn-secondary" onClick={() => this.goBack()}>
                        Go back
                    </button>
                </Col>
                <Col md="12 text-center">
                    <p><strong>Selected Vehicle:</strong> {this.state.vehicleSelected}</p>
                    <p><strong>Selected date:</strong> {moment(this.state.selectedTollPassDate).format("DD-MM-YYYY")}</p>
                </Col>
                <Col md="12 text-center">
                    {this.tollPassForm()}
                    <button className="btn btn-primary" onClick={() => this.addTollPass()}>
                        Add
                    </button>
                </Col>
                <Col md="12" className="mt-3">
                    {this.tollPassesTable(this.state.tollPassDates)}
                    {this.feeCosts()}
                    {this.state.tollPassDates.length > 0 &&
                        <Row>
                            <Col xs="6" className="text-left">
                                <button className="btn btn-secondary" onClick={() => this.clearTollDates()}>
                                    Clear
                                    </button>
                            </Col>
                            <Col xs="6" className="text-right">
                                <button className="btn btn-primary" onClick={() => this.GetTollFeesData(this.state.tollPassDates)}>
                                    Calculate
                                    </button>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div>
                <h3 className="mt-5 p-2 text-white text-center ">Amazing salmon webapp for calculating your toll fee!</h3>
                <Container className="mt-5 mb-5 p-5 bg-white rounded shadow">
                    <Row>
                        <Col md={{ size: 8, offset: 2 }} className="text-center">
                            {this.state.isVehicleDecided ? this.tollPassCalculationContent() : this.choiceOfVehicleAndDate()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    async GetTollFeesData(tollPassDates) {
        await fetch('tollfee/' + this.state.vehicleSelected, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tollPassDates),
        }).then(response => response.json())
            .then(data => this.showTollFee(JSON.stringify(data)))
    }
}
