import { QRCodeCanvas } from "qrcode.react";
import pic13 from '../../assets/pic13.webp';
import axios from "axios";

const QrCode=()=>{
    const appUrl = "http://183.82.106.55:9096/userPannel/";
    const handlePhonePePayment = async () => {
        try {
            const response = await axios.post("http://183.82.106.55:9095/initiate-payment", {
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

   


return(
    <div className="text-center col-xs-12 col-sm">
        <div>The Place Drive In</div>
        <QRCodeCanvas value={appUrl}  bgColor="#ffffff" fgColor="#000000" imageSettings={{src:{pic13},height:30,width:30,excavate:true}} />
        <div>Scan The Qr Code</div>

        <div>
            <h2>PhonePe Payment</h2>
            <button onClick={handlePhonePePayment}>Pay with PhonePe</button>
        </div>

       

    </div>
)
}
export default QrCode;

