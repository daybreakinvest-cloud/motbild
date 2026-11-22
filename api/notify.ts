export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Endast POST är tillåtet' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Brevo API-nyckel saknas' });
  }

  const { typ, data } = req.body;

  try {
    // 1. ANMÄLAN OM MEDLEMSKAP
    if (typ === 'MEDLEM') {
      const { fornamn, efternamn, epost, telefon, ort, engagemang } = data;

      // Bekräftelse till medlemmen
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild', email: 'support@motbild.se' },
          to: [{ email: epost, name: `${fornamn} ${efternamn}` }],
          subject: 'Bekräftelse: Din medlemsansökan till Motbild',
          htmlContent: `
            <div style="font-family: serif; color: #090023; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #090023;">Tack för din medlemsansökan, ${fornamn}!</h2>
              <p>Vi bekräftar härmed att vi har tagit emot dina uppgifter och ditt godkännande av stadgarna för Motbild – Bibliskt Unitariskt Nätverk.</p>
              <p>Föreningens styrelse handlägger ansökan och vi återkommer till dig inom kort.</p>
              <br/>
              <p style="font-size: 13px; color: #555;">Med vänlig hälsning,<br/><strong>Föreningen Motbild</strong><br/>support@motbild.se</p>
            </div>
          `,
        }),
      });

      // Notis till Peter / Support
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild System', email: 'support@motbild.se' },
          to: [{ email: 'support@motbild.se', name: 'Motbild Admin' }],
          subject: `🔔 Ny medlemsansökan: ${fornamn} ${efternamn} (${ort})`,
          htmlContent: `
            <div style="font-family: sans-serif; color: #090023;">
              <h3>Ny medlemsansökan har inkommit</h3>
              <p><strong>Namn:</strong> ${fornamn} ${efternamn}</p>
              <p><strong>E-post:</strong> ${epost}</p>
              <p><strong>Telefon:</strong> ${telefon}</p>
              <p><strong>Ort:</strong> ${ort}</p>
              <p><strong>Önskat engagemang:</strong> ${engagemang?.join(', ') || 'Ej specificerat'}</p>
            </div>
          `,
        }),
      });

      return res.status(200).json({ success: true });
    }

    // 2. FÖRFRÅGAN FRÅN VÄRDFÖRSAMLING (MEDARRANGÖR)
    if (typ === 'MEDARRANGOR') {
      const { fornamn, efternamn, epost, telefon, forsamling, ort, roll, samfund } = data;

      // Bekräftelse till församlingen
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild Debatt', email: 'support@motbild.se' },
          to: [{ email: epost, name: `${fornamn} ${efternamn}` }],
          subject: 'Bekräftelse: Er förfrågan om debattarrangemang – Motbild',
          htmlContent: `
            <div style="font-family: serif; color: #090023; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #090023;">Hej ${fornamn}!</h2>
              <p>Tack för att <strong>${forsamling}</strong> har anmält intresse för att stå som värdförsamling för ett offentligt debattarrangemang.</p>
              <p>Vi har tagit emot era uppgifter och återkommer personligen inom kort för att diskutera tidsplan, datum och medverkande talare.</p>
              <br/>
              <p style="font-size: 13px; color: #555;">Med vänlig hälsning,<br/><strong>Peter Abramsgård</strong><br/>Motbild – Bibliskt Unitariskt Nätverk<br/>073-330 29 83 | support@motbild.se</p>
            </div>
          `,
        }),
      });

      // Notis till Peter / Support
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild System', email: 'support@motbild.se' },
          to: [{ email: 'support@motbild.se', name: 'Motbild Admin' }],
          subject: `🏛️ Ny förfrågan från värdförsamling: ${forsamling} (${ort})`,
          htmlContent: `
            <div style="font-family: sans-serif; color: #090023;">
              <h3>Ny församling vill bli medarrangör</h3>
              <p><strong>Församling:</strong> ${forsamling}</p>
              <p><strong>Ort:</strong> ${ort}</p>
              <p><strong>Samfund:</strong> ${samfund || 'Ej angett'}</p>
              <p><strong>Kontaktperson:</strong> ${fornamn} ${efternamn} (${roll})</p>
              <p><strong>E-post:</strong> ${epost}</p>
              <p><strong>Telefon:</strong> ${telefon}</p>
            </div>
          `,
        }),
      });

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Okänd typ' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
