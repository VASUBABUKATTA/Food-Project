import { QRCodeCanvas } from "qrcode.react";
import pic13 from '../../assets/pic13.webp';
import axios from "axios";

const QrCode = () => {
    const appUrl = "https://theplace.proslogics.com/userPannel";
    const handlePhonePePayment = async () => {
        try {
            const response = await axios.post("https://backend.proslogics.com:9097/initiate-payment", {
                amount: 100, // Amount in rupees
            });

            if (response.data.success) {
                window.location.href = response.data.deepLink; // Redirect to PhonePe App
            } else {
                alert("Payment initiation failed!");
            }
        } catch (error) {
            console.error("Error initiating payment", error);
            alert("Something went wrong. Please try again.");
        }
    };




    return (
        <div className="text-center col-xs-12 col-sm">
            <div>The Place Drive In</div>

            {/* Wrap QR Code with an <a> tag to ensure it opens directly in the browser */}
            <a href={appUrl} target="_blank" rel="noopener noreferrer">
                <QRCodeCanvas
                    value={appUrl}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    imageSettings={{
                        src: pic13,
                        height: 30,
                        width: 30,
                        excavate: true
                    }}
                />
            </a>

            <div>Scan The QR Code</div>

            {/* <div>
                <h2>PhonePe Payment</h2>
                <button onClick={handlePhonePePayment}>Pay with PhonePe</button>
            </div> */}
        </div>
    )
}
export default QrCode;

