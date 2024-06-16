const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');

// Configurar el puerto serial
const port = new SerialPort({
    path: 'COM3', // Asegúrate de usar el puerto correcto
    baudRate: 9600
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  
// Tus credenciales de Twilio
const accountSid = '';
const authToken = '';
const twilioNumber = 'whatsapp:+'; // Número de Twilio para WhatsApp
const toNumbers = ['whatsapp:+','whatsapp:+']; // Número de destino

async function sendWhatsAppMessage(body, toNumber) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const data = new URLSearchParams({
        From: twilioNumber,
        To: toNumber,
        Body: body
      });
      const auth = {
        username: accountSid,
        password: authToken
      };
      const response = await axios.post(url, data, { auth });
      console.log(`Mensaje enviado a ${toNumber}: ${response.status}`);
    } catch (error) {
      console.error(`Error al enviar el mensaje a ${toNumber}:`, error);
    }
  }
  
  // Leer datos del Arduino y enviar mensaje a todos los números
  parser.on('data', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    
    //console.log(message)

      if(message > 0) 
        {
            toNumbers.forEach(toNumber => {
             sendWhatsAppMessage("Alerta!!! Objeto detectado a " + message + " CM 😱😱😱", toNumber.trim());            
            });

        }

  });