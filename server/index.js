import express from 'express';
import cors from 'cors';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const EMAIL_TO = process.env.EMAIL_TO || 'fashionzore@gmail.com';

const app = express();
app.use(cors());
app.use(express.json());

const createTelegramMessage = ({ id, customer, phone, address, items, total }) => {
  const productList = Array.isArray(items)
    ? items.map((item, index) => `${index + 1}. ${item.title} x${item.quantity} (${item.price})`).join('\n')
    : '';

  return `🛒 New Order Received\nOrder ID: ${id}\nName: ${customer}\nPhone: ${phone}\nAddress: ${address}\nProducts:\n${productList}\nTotal: ${total}`;
};

const createEmailBody = ({ id, customer, phone, address, items, total }) => {
  const productList = Array.isArray(items)
    ? items.map((item, index) => `<li>${index + 1}. ${item.title} x${item.quantity} (${item.price})</li>`).join('')
    : '';

  return `
    <h2>🛒 New Order Received</h2>
    <p><strong>Order ID:</strong> ${id}</p>
    <p><strong>Name:</strong> ${customer}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Products:</strong></p>
    <ul>${productList}</ul>
    <p><strong>Total:</strong> ${total}</p>
  `;
};

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

app.post('/api/notify-order', async (req, res) => {
  const order = req.body;
  const requiredFields = ['id', 'customer', 'phone', 'address', 'items', 'total'];
  const missingFields = requiredFields.filter((field) => !order?.[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing order fields: ${missingFields.join(', ')}` });
  }

  const messageText = createTelegramMessage(order);
  const emailHtml = createEmailBody(order);
  const emailText = messageText.replace(/<[^>]+>/g, '');

  const results = { telegram: null, email: null };
  const errors = [];

  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error('Telegram configuration is incomplete.');
    }

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const telegramResponse = await axios.post(telegramUrl, {
      chat_id: CHAT_ID,
      text: messageText,
    });

    results.telegram = telegramResponse.data;
  } catch (error) {
    errors.push({ channel: 'telegram', error: error?.message || String(error) });
  }

  try {
    if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
      throw new Error('Email configuration is incomplete.');
    }

    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New Order Received - ${order.id}`,
      text: emailText,
      html: emailHtml,
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    results.email = {
      messageId: emailResponse.messageId,
      accepted: emailResponse.accepted,
      rejected: emailResponse.rejected,
    };
  } catch (error) {
    errors.push({ channel: 'email', error: error?.message || String(error) });
  }

  if (errors.length === 2) {
    return res.status(502).json({ message: 'Both notification channels failed.', errors, results });
  }

  return res.status(200).json({ message: 'Order notification completed.', errors, results });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Notification service listening on port ${PORT}`);
});
