import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PredictionsPage.css"; // אם תרצה להוסיף עיצוב משלך

export default function PredictionsPage() {
    const [predictions, setPredictions] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");


    useEffect(() => {
        axios
            .get("https://fp-backend-h03t.onrender.com/api/predictions")
            .then((response) => {
                setPredictions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching predictions:", error);
            });
    }, []);

    const filteredPredictions = selectedDate
        ? predictions.filter((item) => {
            const [day, month, year] = item.Date.split(".");
            const formatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            return formatted === selectedDate;
        })
        : predictions;

    return (
        <div className="container">

            <h2 className="title">Prediction History</h2>
            <label style={{ fontWeight: "bold" }}>Filter by Date (28/1/2025 - 06/05/2025):</label>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                    marginBottom: "20px",
                    padding: "6px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "180px",
                    display: "block",
                }}
            />
            {filteredPredictions.length === 0 ? (
                <p style={{ marginTop: "20px", fontWeight: "bold", color: "gray" }}>
                    {selectedDate ? "No predictions found for the selected date." : "Loading predictions..."}
                </p>
            ) : (

                    <table className="predictions-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Teams</th>
                                <th>Prediction</th>
                                <th>Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPredictions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Date}</td>
                                    <td>{item.Teams}</td>
                                    <td
                                        style={{
                                            color: item.Correct ? "green" : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.Predicted_Label}
                                    </td>
                                    <td>{item.Actual_Label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );
}
