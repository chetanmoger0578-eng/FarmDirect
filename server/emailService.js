import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

export async function sendOrderNotificationToFarmer(farmerEmail, farmerName, orderDetails) {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@farmdirect.com',
        to: farmerEmail,
        subject: '🎉 New Order Received - FarmDirect',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New Order Received!</h2>
        <p>Hello ${farmerName},</p>
        <p>You have received a new order for your products:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Details:</h3>
          <p><strong>Customer:</strong> ${orderDetails.customerName}</p>
          <p><strong>Phone:</strong> ${orderDetails.customerPhone}</p>
          <p><strong>Email:</strong> ${orderDetails.customerEmail}</p>
          <p><strong>Delivery Address:</strong> ${orderDetails.deliveryAddress}</p>
          
          <h4>Products:</h4>
          <ul>
            ${orderDetails.items.map(item => `
              <li>${item.productName} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}</li>
            `).join('')}
          </ul>
          
          <p style="font-size: 18px; font-weight: bold; color: #16a34a;">
            Total Amount: ₹${orderDetails.totalAmount}
          </p>
        </div>
        
        <p>Please prepare the order for delivery.</p>
        <p>Thank you for being part of FarmDirect!</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This is an automated email from FarmDirect. Please do not reply to this email.
        </p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order notification sent to ${farmerEmail}`);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export async function sendOrderConfirmationToCustomer(customerEmail, customerName, orderDetails) {
    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@farmdirect.com',
        to: customerEmail,
        subject: '✅ Order Confirmed - FarmDirect',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Order Confirmed!</h2>
        <p>Hello ${customerName},</p>
        <p>Thank you for your order! Your order has been confirmed and will be delivered soon.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Summary:</h3>
          <p><strong>Delivery Address:</strong> ${orderDetails.deliveryAddress}</p>
          
          <h4>Products:</h4>
          <ul>
            ${orderDetails.items.map(item => `
              <li>${item.productName} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}</li>
            `).join('')}
          </ul>
          
          <p style="font-size: 18px; font-weight: bold; color: #16a34a;">
            Total Amount: ₹${orderDetails.totalAmount}
          </p>
        </div>
        
        <p>We'll notify you when your order is on its way!</p>
        <p>Thank you for supporting local farmers!</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This is an automated email from FarmDirect. Please do not reply to this email.
        </p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order confirmation sent to ${customerEmail}`);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
