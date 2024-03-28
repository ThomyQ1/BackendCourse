import twilio from "twilio";

async function sendSms(phone) {
  try {
    const transport = twilio(env.TWILIO_SID, env.TWILIO_TOKEN);
    transport.messages.create({
      body: "mensaje creado desde el server",
      from: env.TWILIO_PHONE,
      to: phone,
    });
  } catch (error) {
    throw error;
  }
}

export default sendSms;
